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

import com.ecm.ecmis.models.Etudiant;
import com.ecm.ecmis.services.EtudiantService;

@RestController
@RequestMapping("api/etudiant")
public class EtudiantController {
    @Autowired
    private EtudiantService etudiantService;

    @GetMapping("/{numero}")
    public Etudiant findByNumero(@PathVariable String numero) {
        return etudiantService.findByNumero(numero);
    }

    @GetMapping("/")
    public List<Etudiant> findAll() {
        return etudiantService.findAll();
    }

    @DeleteMapping("/{numero}")
    public int deleteByNumero(@PathVariable String numero) {
        return etudiantService.deleteByNumero(numero);
    }

    @PostMapping("/")
    public Etudiant save(@RequestBody Etudiant etudiant) {
        return etudiantService.save(etudiant);
    }

    @PutMapping("/")
    public Etudiant update(@RequestBody Etudiant etudiant) {
        return etudiantService.update(etudiant);
    }

}
