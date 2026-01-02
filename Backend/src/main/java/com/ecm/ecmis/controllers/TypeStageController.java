package com.ecm.ecmis.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecm.ecmis.models.TypeStage;
import com.ecm.ecmis.services.TypeStageService;

@RestController
@RequestMapping("api/typeStage")
public class TypeStageController {
    @Autowired
    private TypeStageService typeStageService;

    @GetMapping("/{type}")
    public TypeStage findByType(@PathVariable String type) {
        return typeStageService.findByType(type);
    }

    @GetMapping("/")
    public List<TypeStage> findAll() {
        return typeStageService.findAll();
    }

    @DeleteMapping("/{type}")
    public int deleteByType(@PathVariable String type) {
        return typeStageService.deleteByType(type);
    }

    @PostMapping("/")
    public TypeStage save(@RequestBody TypeStage typeStage) {
        return typeStageService.save(typeStage);
    }

    @PutMapping("/")
    public int update(@RequestBody TypeStage typeStage) {
        return typeStageService.update(typeStage);
    }

}
