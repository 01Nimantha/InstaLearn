package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    String uploadImage(int userId, MultipartFile file) throws IOException;

    byte[] getImage(Long imageId);
}
