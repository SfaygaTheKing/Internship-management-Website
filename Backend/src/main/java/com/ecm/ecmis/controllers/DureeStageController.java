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

import com.ecm.ecmis.models.DureeStage;
import com.ecm.ecmis.services.DureeStageService;

@RestController
@RequestMapping("api/dureeStage")
public class DureeStageController {
    @Autowired
    private DureeStageService dureeStageService;

    @GetMapping("/{annee}/{type}")
    public DureeStage findByAnneeAnneeAndTypeStageType(@PathVariable String annee, @PathVariable String type) {
        return dureeStageService.findByAnneeAnneeAndTypeStageType(annee, type);
    }

    @GetMapping("/")
    public List<DureeStage> findAll() {
        return dureeStageService.findAll();
    }

    @DeleteMapping("/{annee}/{type}")
    public void deleteByAnneeAnneeAndTypeStageType(@PathVariable String annee, @PathVariable String type) {
        dureeStageService.deleteByAnneeAnneeAndTypeStageType(annee, type);
    }

    @PostMapping("/")
    public DureeStage save(@RequestBody DureeStage dureeStage) {
        return dureeStageService.save(dureeStage);
    }

    @PutMapping("/")
    public DureeStage update(@RequestBody DureeStage dureeStage) {
        return dureeStageService.update(dureeStage);

    }

}
