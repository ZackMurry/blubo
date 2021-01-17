package com.zackmurry.blubo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BluboApplication {

	public static void main(String[] args) {
		SpringApplication.run(BluboApplication.class, args);
	}

}
