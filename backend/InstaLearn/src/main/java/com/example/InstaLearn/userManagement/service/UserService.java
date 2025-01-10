package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.UserSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.UserUpdateRequestDTO;

public interface UserService {
    String saveUser(UserSaveRequestDTO userSaveRequestDTO);

    String updateUser(UserUpdateRequestDTO userUpdateRequestDTO);

    String deleteUser(int userId);
}
