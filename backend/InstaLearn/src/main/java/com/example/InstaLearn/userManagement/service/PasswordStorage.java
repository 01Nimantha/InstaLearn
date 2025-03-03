package com.example.InstaLearn.userManagement.service;

import java.util.concurrent.ConcurrentHashMap;

public class PasswordStorage {
    private static final ConcurrentHashMap<Integer, String> passwordMap = new ConcurrentHashMap<>();

    public static void storePassword(int userId, String password) {
        passwordMap.put(userId, password);
    }

    public static String getPassword(int userId) {
        return passwordMap.remove(userId); // Remove after retrieval for security
    }

    public static void storePassword1(int userId, String password1) {
        passwordMap.put(userId, password1);
    }

    public static String getPassword1(int userId) {
        return passwordMap.remove(userId); // Remove after retrieval for security
    }
}

