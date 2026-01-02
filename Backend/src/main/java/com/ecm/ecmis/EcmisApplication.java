package com.ecm.ecmis;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ecm.ecmis.security.models.User;
import com.ecm.ecmis.security.repositories.UserDao;

@SpringBootApplication
public class EcmisApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcmisApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(UserDao userDao) {
		return args -> {
			User user = new User("admin", "admin", "ADMIN");
			user.setId(Long.valueOf(1));
			userDao.save(user);
		};
	}
}
