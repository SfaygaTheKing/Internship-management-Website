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

import com.ecm.ecmis.models.Entreprise;
import com.ecm.ecmis.services.EntrepriseService;

@RestController
@RequestMapping("api/entreprise")
public class EntrepriseController {
    @Autowired
    private EntrepriseService entrepriseService;

    @GetMapping("/{numero}")
    public Entreprise findByNumero(@PathVariable String numero) {
        return entrepriseService.findByNumero(numero);
    }

    @GetMapping("/")
    public List<Entreprise> findAll() {
        return entrepriseService.findAll();
    }

    @DeleteMapping("/{numero}")
    public int deleteByNumero(@PathVariable String numero) {
        return entrepriseService.deleteByNumero(numero);
    }

    @PostMapping("/")
    public Entreprise save(@RequestBody Entreprise entreprise) {
        return entrepriseService.save(entreprise);
    }

    @PutMapping("/")
    public int update(@RequestBody Entreprise entreprise) {
        return entrepriseService.update(entreprise);
    }

}
