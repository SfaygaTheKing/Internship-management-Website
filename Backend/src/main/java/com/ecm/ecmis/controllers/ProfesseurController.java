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

import com.ecm.ecmis.models.Professeur;
import com.ecm.ecmis.services.ProfesseurService;

@RestController
@RequestMapping("api/professeur")
public class ProfesseurController {
    @Autowired
    private ProfesseurService professeurService;

    @GetMapping("/{numero}")
    public Professeur findByNumero(@PathVariable String numero) {
        return professeurService.findByNumero(numero);
    }

    @GetMapping("/")
    public List<Professeur> findAll() {
        return professeurService.findAll();
    }

    @DeleteMapping("/{numero}")
    public int deleteByNumero(@PathVariable String numero) {
        return professeurService.deleteByNumero(numero);
    }

    @PostMapping("/")
    public Professeur save(@RequestBody Professeur professeur) {
        return professeurService.save(professeur);
    }

    @PutMapping("/{passwordChanged}")
    public int update(@RequestBody Professeur professeur, @PathVariable boolean passwordChanged) {
        return professeurService.update(professeur, passwordChanged);
    }

}
