package com.ecm.ecmis.security.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.ecm.ecmis.security.models.ErrorResponse;
import com.ecm.ecmis.security.models.LoginRequest;
import com.ecm.ecmis.security.models.LoginResponse;
import com.ecm.ecmis.security.models.User;
import com.ecm.ecmis.security.repositories.UserDao;
import com.ecm.ecmis.security.services.JwtUtil;

@Controller
@RequestMapping("api/rest/auth")
public class AuthController {
    @Autowired
    private UserDao userRepository;

    private final AuthenticationManager authenticationManager;

    private JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

    }

    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                                    loginRequest.getPassword()));
            String email = authentication.getName();
            User user = userRepository.findByEmail(email);
            String token = jwtUtil.createToken(user);
            LoginResponse loginResponse = new LoginResponse(token, user);

            return ResponseEntity.ok(loginResponse);

        } catch (BadCredentialsException e) {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,
                    "Invalid username or password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

    }

    @PutMapping("/{passwordChanged}")
    public ResponseEntity<String> update(@RequestBody User user, @PathVariable boolean passwordChanged) {
        if (passwordChanged) {
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        userRepository.save(user);
        return ResponseEntity.ok("Updated");
    }
}
