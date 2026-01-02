package com.ecm.ecmis.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.ecmis.security.repositories.UserDao;

@RestController
@RequestMapping("api/test")
public class Test {

    @Autowired
    UserDao userRepository;

    @GetMapping("/")
    public String hello() {
        return "hello world";
    }

    // @GetMapping("/create")
    // public void create() {
    // User user = new User("soufiane", "alo123");
    // userRepository.save(user);
    // }
}
