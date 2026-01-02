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

import com.ecm.ecmis.models.Tuteur;
import com.ecm.ecmis.services.TuteurService;

@RestController
@RequestMapping("api/tuteur")
public class TuteurController {
    @Autowired
    private TuteurService tuteurService;

    @GetMapping("/{numero}")
    public Tuteur findByNumero(@PathVariable String numero) {
        return tuteurService.findByNumero(numero);
    }

    @GetMapping("/")
    public List<Tuteur> findAll() {
        return tuteurService.findAll();
    }

    @DeleteMapping("/{numero}")
    public int deleteByNumero(@PathVariable String numero) {
        return tuteurService.deleteByNumero(numero);
    }

    @PostMapping("/")
    public Tuteur save(@RequestBody Tuteur tuteur) {
        return tuteurService.save(tuteur);
    }

    @PutMapping("/")
    public Tuteur update(@RequestBody Tuteur tuteur) {
        return tuteurService.update(tuteur);
    }

}
