package com.example.InstaLearn.classFeesManagement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClassFeesSaveRequestDTO {

    private String className;
    private double amount;
}
