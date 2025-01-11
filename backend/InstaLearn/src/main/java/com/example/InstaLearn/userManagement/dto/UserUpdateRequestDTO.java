package com.example.InstaLearn.userManagement.dto;

import com.example.InstaLearn.userManagement.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserUpdateRequestDTO {
    private int userId;
    private String userName;
    private Role role;
    private String userPassword;
}
