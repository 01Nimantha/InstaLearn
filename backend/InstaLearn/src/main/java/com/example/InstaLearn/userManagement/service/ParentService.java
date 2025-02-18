package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.ParentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;

import java.util.List;

public interface ParentService {
    String updateParent(String parentId, ParentUpdateRequestDTO parentUpdateRequestDTO);

    List<Parent> getAllParents();

    Parent getParentById(String parentId);
}
