package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.ParentUpdateRequestDTO;

public interface ParentService {
    String updateParent(String parentId, ParentUpdateRequestDTO parentUpdateRequestDTO);
}
