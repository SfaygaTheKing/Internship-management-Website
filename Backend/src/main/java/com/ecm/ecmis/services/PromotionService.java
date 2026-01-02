package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Professeur;
import com.ecm.ecmis.models.Promotion;
import com.ecm.ecmis.repositories.PromotionDao;

@Service
public class PromotionService {
    @Autowired
    private PromotionDao promotionDao;
    @Autowired
    private ProfesseurService professeurService;
    @Autowired
    private EtudiantService etudiantService;

    public Promotion findByAnnee(String annee) {
        return promotionDao.findByAnnee(annee);
    }

    List<Promotion> findByProfesseurNumero(String numero) {
        return promotionDao.findByProfesseurNumero(numero);
    }

    private Promotion findById(Long id) {
        return promotionDao.findById(id).orElse(null);
    }

    public List<Promotion> findAll() {
        return promotionDao.findAll();
    }

    @Transactional
    public int deleteByAnnee(String annee) {
        if (checkDeleteable(annee)) {
            promotionDao.deleteByAnnee(annee);
            return 1;
        }
        return -1;
    }

    @Transactional
    public Promotion save(Promotion promotion) {
        if (findByAnnee(promotion.getAnnee()) != null)
            return null;
        promotion.setIdEtudiant(1);
        checkComponents(promotion);
        return promotionDao.save(promotion);
    }

    Promotion saveWith(Promotion promotion) {
        promotion.setIdEtudiant(1);
        return promotionDao.save(promotion);
    }

    @Transactional
    public Promotion update(Promotion promotion) {
        if (!findById(promotion.getId()).getAnnee().equals(promotion.getAnnee())
                && findByAnnee(promotion.getAnnee()) != null)
            return null;
        checkComponents(promotion);
        return promotionDao.save(promotion);
    }

    private boolean checkDeleteable(String annee) {
        if (etudiantService.findByPromotionAnnee(annee).isEmpty())
            return true;
        return false;
    }

    private void checkComponents(Promotion promotion) {
        Professeur professeur = professeurService.findByNumero(promotion.getProfesseur().getNumero());
        if (professeur == null) {
            professeur = professeurService.saveWith(promotion.getProfesseur());
            promotion.setProfesseur(professeur);
        }
    }
}
