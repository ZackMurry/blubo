package com.zackmurry.blubo.service;

import com.zackmurry.blubo.dao.user.UserDao;
import com.zackmurry.blubo.exception.BadRequestException;
import com.zackmurry.blubo.model.auth.AuthenticationRequest;
import com.zackmurry.blubo.model.auth.AuthenticationResponse;
import com.zackmurry.blubo.model.user.AccountCreateRequest;
import com.zackmurry.blubo.model.user.PublicUserInfo;
import com.zackmurry.blubo.model.user.UserEntity;
import com.zackmurry.blubo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        final UserEntity userEntity = userDao.findByEmail(s).orElse(null);
        if (userEntity == null) {
            throw new UsernameNotFoundException(s);
        }
        return userEntity;
    }

    public AuthenticationResponse createAccount(@NonNull AccountCreateRequest accountCreateRequest) {
        if (accountCreateRequest.getEmail() == null ||
            accountCreateRequest.getEmail().length() > 320 ||
            accountCreateRequest.getFirstName() == null ||
            accountCreateRequest.getFirstName().length() > 64 ||
            accountCreateRequest.getLastName() == null ||
            accountCreateRequest.getLastName().length() > 64 ||
            accountCreateRequest.getPassword() == null ||
            accountCreateRequest.getPassword().length() < 8 ||
            accountCreateRequest.getPassword().length() > 55
        ) {
            throw new BadRequestException();
        }
        if (userDao.findByEmail(accountCreateRequest.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE);
        }
        accountCreateRequest.setPassword(passwordEncoder.encode(accountCreateRequest.getPassword()));
        final UserEntity userEntity = accountCreateRequest.toUserEntity();
        userDao.create(userEntity);
        final String jwt = jwtUtil.generateToken(userEntity);
        return new AuthenticationResponse(jwt);
    }

    public String createAuthenticationToken(@NonNull AuthenticationRequest authenticationRequest) {
        if (authenticationRequest.getEmail() == null || authenticationRequest.getPassword() == null) {
            throw new BadRequestException();
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );
        return jwtUtil.createToken(new HashMap<>(), authenticationRequest.getEmail());
    }

    public List<UserEntity> getUsersByIds(@NonNull List<UUID> ids) {
        return userDao.findByIds(ids);
    }

    public void updatePagesRead(UUID userId, int pagesRead) {
        userDao.updatePagesRead(userId, pagesRead);
    }

    public List<PublicUserInfo> getTopUsers(int limit) {
        if (limit < 1) {
            throw new BadRequestException();
        }
        List<UserEntity> userEntities = userDao.getUsersSortedByPages(limit);
        return userEntities.stream().map(PublicUserInfo::of).collect(Collectors.toList());
    }

    public Optional<UUID> getIdByEmail(@NonNull String email) {
        final UserEntity userEntity = userDao.findByEmail(email).orElse(null);
        if (userEntity == null) {
            return Optional.empty();
        }
        return Optional.of(userEntity.getId());
    }

}
