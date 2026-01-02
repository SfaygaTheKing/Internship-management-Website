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

import com.ecm.ecmis.models.Promotion;
import com.ecm.ecmis.services.PromotionService;

@RestController
@RequestMapping("api/promotion")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping("/{annee}")
    public Promotion findByAnnee(@PathVariable String annee) {
        return promotionService.findByAnnee(annee);
    }

    @GetMapping("/")
    public List<Promotion> findAll() {
        return promotionService.findAll();
    }

    @DeleteMapping("/{annee}")
    public int deleteByAnnee(@PathVariable String annee) {
        return promotionService.deleteByAnnee(annee);
    }

    @PostMapping("/")
    public Promotion save(@RequestBody Promotion promotion) {
        return promotionService.save(promotion);
    }

    @PutMapping("/")
    public Promotion update(@RequestBody Promotion promotion) {
        return promotionService.update(promotion);
    }

}
