package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/image")
@CrossOrigin
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/save/{id}")
    public ResponseEntity<String> uplaodImage(@PathVariable("id") int userId, @RequestParam("file") MultipartFile file) {
        try {
            String downloadUrl = imageService.uploadImage(userId, file);
            return ResponseEntity.ok(downloadUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("get-image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable(value = "id" ) Long imageId) {
        byte[] imageData = imageService.getImage(imageId);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Change based on type
                .body(imageData);
    }



}
