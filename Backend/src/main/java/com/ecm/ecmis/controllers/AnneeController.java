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

import com.ecm.ecmis.models.Annee;
import com.ecm.ecmis.services.AnneeService;

@RestController
@RequestMapping("api/annee")
public class AnneeController {
    @Autowired
    private AnneeService anneeService;

    @GetMapping("/{annee}")
    public Annee findByAnnee(@PathVariable String annee) {
        return anneeService.findByAnnee(annee);
    }

    @GetMapping("/")
    public List<Annee> findAll() {
        return anneeService.findAll();
    }

    @DeleteMapping("/{annee}")
    public int deleteByAnnee(@PathVariable String annee) {
        return anneeService.deleteByAnnee(annee);
    }

    @PostMapping("/")
    public Annee save(@RequestBody Annee annee) {
        return anneeService.save(annee);
    }

    @PutMapping("/")
    public int update(@RequestBody Annee annee) {
        return anneeService.update(annee);
    }

}
