package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.UserSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.UserUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public String saveUser(UserSaveRequestDTO userSaveRequestDTO) {
        User user = new User(
                userSaveRequestDTO.getUserId(),
                userSaveRequestDTO.getUserName(),
                userSaveRequestDTO.getRole(),
                userSaveRequestDTO.getUserPassword()
        );

        userRepo.save(user);

        return userSaveRequestDTO.getUserName();
    }

    @Override
    public String updateUser(UserUpdateRequestDTO userUpdateRequestDTO) {
        if(userRepo.existsById(userUpdateRequestDTO.getUserId())) {
            User user = userRepo.getReferenceById(userUpdateRequestDTO.getUserId());
            user.setUserName(userUpdateRequestDTO.getUserName());
            user.setRole(userUpdateRequestDTO.getRole());
            user.setUserPassword(userUpdateRequestDTO.getUserPassword());

            userRepo.save(user);
            return userUpdateRequestDTO.getUserName() + " Updated Successfully";
        }
        else{
            throw new RuntimeException("No data found for that id");
        }
    }

    @Override
    public String deleteUser(int userId) {
        if (userRepo.existsById(userId)) {
            userRepo.deleteById(userId);
            return "Deleted Successfully "+userId;
        }
        else{
            throw new RuntimeException("No customer found for that id");
        }
    }
}
