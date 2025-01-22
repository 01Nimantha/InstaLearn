//package com.example.InstaLearn.userManagement.controller;
//
//import com.example.InstaLearn.userManagement.dto.UserSaveRequestDTO;
//import com.example.InstaLearn.userManagement.dto.UserUpdateRequestDTO;
//import com.example.InstaLearn.userManagement.dto.UserSaveRequestDTO;
//import com.example.InstaLearn.userManagement.dto.UserUpdateRequestDTO;
//import com.example.InstaLearn.userManagement.service.UserService;
//import com.example.InstaLearn.userManagement.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("api/v1/user")
//@CrossOrigin
//
//public class UserController {
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/save")
//    public String saveUser(@RequestBody UserSaveRequestDTO userSaveRequestDTO) {
//        userService.saveUser(userSaveRequestDTO);
//        return "saved";
//
//    }
//
//    @PutMapping("/update")
//    public String updateUser(@RequestBody UserUpdateRequestDTO userUpdateRequestDTO) {
//        String  msg=userService.updateUser(userUpdateRequestDTO);
//        return msg;
//    }
//
//    @DeleteMapping(
//            path = "delete-user",
//            params = "id"
//    )
//    public String deleteUser(@RequestParam(value = "id") int userId) {
//        String deleted=userService.deleteUser(userId);
//        return deleted;
//    }
//
//    @GetMapping(
//            path="/get-by-id",
//            params = "id"
//
//    )
//    public UserSaveRequestDTO getUserById(@RequestParam(value = "id") int userId) {
//        UserSaveRequestDTO userSaveRequestDTO=userService.getUserById(userId);
//        return userSaveRequestDTO ;
//    }
//}
