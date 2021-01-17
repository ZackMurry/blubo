package com.zackmurry.blubo.tasks;

import com.zackmurry.blubo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LeaderboardResetter {

    private static final Logger logger = LoggerFactory.getLogger(LeaderboardResetter.class);

    @Autowired
    private UserService userService;

    // @Scheduled(cron = "0 * * * * *") // use this for testing
    @Scheduled(cron = "0 0 0 * * SUN") // run every Sunday at midnight
    public void resetLeaderboard() {
        logger.info("Resetting weekly leaderboards...");
        userService.resetWeeklyLeaderboard();
    }

}
