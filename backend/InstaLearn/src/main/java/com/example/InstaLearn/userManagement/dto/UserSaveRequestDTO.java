package com.example.InstaLearn.userManagement.dto;

import com.example.InstaLearn.userManagement.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserSaveRequestDTO {

    private String userName;
    private Role role;

}
