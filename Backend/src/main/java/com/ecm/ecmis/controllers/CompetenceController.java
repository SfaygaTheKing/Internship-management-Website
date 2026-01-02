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

import com.ecm.ecmis.models.Competence;
import com.ecm.ecmis.services.CompetenceService;

@RestController
@RequestMapping("api/competence")
public class CompetenceController {
    @Autowired
    private CompetenceService competenceService;

    @GetMapping("/code/{code}")
    public Competence findByCode(@PathVariable String code) {
        return competenceService.findByCode(code);
    }

    @GetMapping("/libelle/{libelle}")
    public Competence findByLibelle(@PathVariable String libelle) {
        return competenceService.findByLibelle(libelle);
    }

    @GetMapping("/")
    public List<Competence> findAll() {
        return competenceService.findAll();
    }

    @DeleteMapping("/{code}")
    public int deleteByCode(@PathVariable String code) {
        return competenceService.deleteByCode(code);
    }

    @PostMapping("/")
    public Competence save(@RequestBody Competence competence) {
        return competenceService.save(competence);
    }

    @PutMapping("/")
    public int update(@RequestBody Competence competence) {
        return competenceService.update(competence);
    }

}
