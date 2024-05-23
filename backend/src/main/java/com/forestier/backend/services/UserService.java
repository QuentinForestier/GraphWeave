package com.forestier.backend.services;

import com.forestier.backend.dto.models.UserDto;
import com.forestier.backend.models.User;
import com.forestier.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;


    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void deleteUser(UserDto user) {
        //userRepository.deleteById(user.getId());
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow();
    }

    public UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
