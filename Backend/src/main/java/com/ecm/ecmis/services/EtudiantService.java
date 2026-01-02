package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Etudiant;
import com.ecm.ecmis.models.Promotion;
import com.ecm.ecmis.repositories.EtudiantDao;

@Service
public class EtudiantService {
    @Autowired
    private EtudiantDao etudiantDao;
    @Autowired
    private PromotionService promotionService;
    @Autowired
    private StageService stageService;

    public Etudiant findByNumero(String numero) {
        return etudiantDao.findByNumero(numero);
    }

    List<Etudiant> findByPromotionAnnee(String annee) {
        return etudiantDao.findByPromotionAnnee(annee);
    }

    public List<Etudiant> findAll() {
        return etudiantDao.findAll();
    }

    @Transactional
    public int deleteByNumero(String numero) {
        if (checkDeleteable(numero)) {
            etudiantDao.deleteByNumero(numero);
            return 1;
        }
        return -1;
    }

    @Transactional
    public Etudiant save(Etudiant etudiant) {
        checkComponents(etudiant);
        Promotion promotion = etudiant.getPromotion();
        String numero = promotion.getAnnee().substring(2) + promotion.getIdEtudiant();
        if (findByNumero(numero) != null)
            numero = promotion.getAnnee() + promotion.getIdEtudiant();// in case this app survives to 3xxx
        promotion.setIdEtudiant(promotion.getIdEtudiant() + 1);
        promotionService.update(promotion);
        etudiant.setNumero(numero);
        return etudiantDao.save(etudiant);
    }

    @Transactional
    public Etudiant update(Etudiant etudiant) {
        return etudiantDao.save(etudiant);
    }

    private boolean checkDeleteable(String numero) {
        if (stageService.findByEtudiantNumero(numero).isEmpty())
            return true;
        return false;
    }

    private void checkComponents(Etudiant etudiant) {
        Promotion promotion = promotionService.findByAnnee(etudiant.getPromotion().getAnnee());
        if (promotion == null) {
            promotion = promotionService.saveWith(etudiant.getPromotion());
            etudiant.setPromotion(promotion);
        }
    }

}
