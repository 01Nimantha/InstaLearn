package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.ParentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ParentService {
    String updateParent(String parentId, ParentUpdateRequestDTO parentUpdateRequestDTO);

    Page<Parent> getAllParents(Pageable pageable);

    Parent getParentById(String parentId);
}
