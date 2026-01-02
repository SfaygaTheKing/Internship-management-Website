package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Annee;
import com.ecm.ecmis.models.DureeStage;
import com.ecm.ecmis.models.TypeStage;
import com.ecm.ecmis.repositories.DureeStageDao;

@Service
public class DureeStageService {
    @Autowired
    private DureeStageDao dureeStageDao;
    @Autowired
    private AnneeService anneeService;
    @Autowired
    private TypeStageService typeStageService;

    public DureeStage findByAnneeAnneeAndTypeStageType(String annee, String type) {
        return dureeStageDao.findByAnneeAnneeAndTypeStageType(annee, type);
    }

    List<DureeStage> findByAnneeAnnee(String annee) {
        return dureeStageDao.findByAnneeAnnee(annee);
    }

    List<DureeStage> findByTypeStageType(String type) {
        return dureeStageDao.findByTypeStageType(type);
    }

    private DureeStage findById(Long id) {
        return dureeStageDao.findById(id).orElse(null);
    }

    public List<DureeStage> findAll() {
        return dureeStageDao.findAll();
    }

    @Transactional
    public void deleteByAnneeAnneeAndTypeStageType(String annee, String type) {
        dureeStageDao.deleteByAnneeAnneeAndTypeStageType(annee, type);
    }

    @Transactional
    public DureeStage save(DureeStage dureeStage) {
        if (findByAnneeAnneeAndTypeStageType(dureeStage.getAnnee().getAnnee(),
                dureeStage.getTypeStage().getType()) != null)
            return null;
        checkComponents(dureeStage);
        return dureeStageDao.save(dureeStage);
    }

    @Transactional
    public DureeStage update(DureeStage dureeStage) {
        DureeStage found = findById(dureeStage.getId());
        boolean a = !found.getAnnee().getAnnee().equals(dureeStage.getAnnee().getAnnee());
        boolean b = !found.getTypeStage().getType().equals(dureeStage.getTypeStage().getType());
        boolean c = findByAnneeAnneeAndTypeStageType(dureeStage.getAnnee().getAnnee(),
                dureeStage.getTypeStage().getType()) != null;
        if ((a && b && c) || (a && c) || (b && c))
            return null;
        checkComponents(dureeStage);
        return dureeStageDao.save(dureeStage);
    }

    private void checkComponents(DureeStage dureeStage) {
        Annee annee = anneeService.findByAnnee(dureeStage.getAnnee().getAnnee());
        if (annee == null) {
            annee = anneeService.saveWith(dureeStage.getAnnee());
            dureeStage.setAnnee(annee);
        }
        TypeStage typeStage = typeStageService.findByType(dureeStage.getTypeStage().getType());
        if (typeStage == null) {
            typeStage = typeStageService.saveWith(dureeStage.getTypeStage());
            dureeStage.setTypeStage(typeStage);
        }
    }

}
