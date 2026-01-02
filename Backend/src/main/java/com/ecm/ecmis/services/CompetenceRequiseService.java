package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Competence;
import com.ecm.ecmis.models.CompetenceRequise;
import com.ecm.ecmis.models.TypeStage;
import com.ecm.ecmis.repositories.CompetenceRequiseDao;

@Service
public class CompetenceRequiseService {
    @Autowired
    private CompetenceRequiseDao competenceRequiseDao;
    @Autowired
    private CompetenceService competenceService;
    @Autowired
    private TypeStageService typeStageService;

    public CompetenceRequise findByCompetenceCodeAndTypeStageType(String code, String type) {
        return competenceRequiseDao.findByCompetenceCodeAndTypeStageType(code, type);
    }

    List<CompetenceRequise> findByCompetenceCode(String code) {
        return competenceRequiseDao.findByCompetenceCode(code);
    }

    List<CompetenceRequise> findByTypeStageType(String type) {
        return competenceRequiseDao.findByTypeStageType(type);
    }

    private CompetenceRequise findById(Long id) {
        return competenceRequiseDao.findById(id).orElse(null);
    }

    public List<CompetenceRequise> findAll() {
        return competenceRequiseDao.findAll();
    }

    @Transactional
    public void deleteByCompetenceCodeAndTypeStageType(String code, String type) {
        competenceRequiseDao.deleteByCompetenceCodeAndTypeStageType(code, type);
    }

    @Transactional
    public CompetenceRequise save(CompetenceRequise competenceRequise) {
        if (findByCompetenceCodeAndTypeStageType(competenceRequise.getCompetence().getCode(),
                competenceRequise.getTypeStage().getType()) != null
                || checkLevelExistence(competenceRequise.getCompetence().getCode(), null, competenceRequise.getNiveau(),
                        's'))
            return null;
        checkComponents(competenceRequise);
        return competenceRequiseDao.save(competenceRequise);
    }

    @Transactional
    public CompetenceRequise update(CompetenceRequise competenceRequise) {

        CompetenceRequise found = findById(competenceRequise.getId());
        boolean a = !found.getCompetence().getCode().equals(competenceRequise.getCompetence().getCode());
        boolean b = !found.getTypeStage().getType().equals(competenceRequise.getTypeStage().getType());
        boolean c = findByCompetenceCodeAndTypeStageType(competenceRequise.getCompetence().getCode(),
                competenceRequise.getTypeStage().getType()) != null;
        if ((a && b && c) || (a && c) || (b && c)
                || checkLevelExistence(competenceRequise.getCompetence().getCode(), found.getId(),
                        competenceRequise.getNiveau(), 'u'))
            return null;
        checkComponents(competenceRequise);
        return competenceRequiseDao.save(competenceRequise);
    }

    private void checkComponents(CompetenceRequise competenceRequise) {
        Competence competence = competenceService.findByCode(competenceRequise.getCompetence().getCode());
        if (competence == null) {
            competence = competenceService.saveWith(competenceRequise.getCompetence());
            competenceRequise.setCompetence(competence);
        }
        TypeStage typeStage = typeStageService.findByType(competenceRequise.getTypeStage().getType());
        if (typeStage == null) {
            typeStage = typeStageService.saveWith(competenceRequise.getTypeStage());
            competenceRequise.setTypeStage(typeStage);
        }
    }

    private boolean checkLevelExistence(String code, Long id, int niveau, char o) {
        if (o == 's') {
            for (CompetenceRequise competenceRequise : findByCompetenceCode(code)) {
                if (competenceRequise.getNiveau() == niveau)
                    return true;
            }
        } else if (o == 'u') {
            for (CompetenceRequise competenceRequise : findByCompetenceCode(code)) {
                if (competenceRequise.getNiveau() == niveau && !competenceRequise.getId().equals(id))
                    return true;
            }
        }
        return false;
    }
}
