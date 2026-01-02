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

import com.ecm.ecmis.models.CompetenceRequise;
import com.ecm.ecmis.services.CompetenceRequiseService;

@RestController
@RequestMapping("api/competenceRequise")
public class CompetenceRequiseController {
    @Autowired
    private CompetenceRequiseService competenceRequiseService;

    @GetMapping("/{code}/{type}")
    public CompetenceRequise findByCompetenceCodeAndTypeStageType(@PathVariable String code,
            @PathVariable String type) {
        return competenceRequiseService.findByCompetenceCodeAndTypeStageType(code, type);
    }

    @GetMapping("/")
    public List<CompetenceRequise> findAll() {
        return competenceRequiseService.findAll();
    }

    @DeleteMapping("/{code}/{type}")
    public void deleteByCompetenceCodeAndTypeStageType(@PathVariable String code, @PathVariable String type) {
        competenceRequiseService.deleteByCompetenceCodeAndTypeStageType(code, type);
    }

    @PostMapping("/")
    public CompetenceRequise save(@RequestBody CompetenceRequise competenceRequise) {
        return competenceRequiseService.save(competenceRequise);
    }

    @PutMapping("/")
    public CompetenceRequise update(@RequestBody CompetenceRequise competenceRequise) {
        return competenceRequiseService.update(competenceRequise);
    }

}
