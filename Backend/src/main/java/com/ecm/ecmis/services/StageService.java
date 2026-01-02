package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Annee;
import com.ecm.ecmis.models.Entreprise;
import com.ecm.ecmis.models.Etudiant;
import com.ecm.ecmis.models.Professeur;
import com.ecm.ecmis.models.Stage;
import com.ecm.ecmis.models.Tuteur;
import com.ecm.ecmis.models.TypeStage;
import com.ecm.ecmis.repositories.StageDao;

@Service
public class StageService {
    @Autowired
    private StageDao stageDao;
    @Autowired
    private EtudiantService etudiantService;
    @Autowired
    private ProfesseurService professeurService;
    @Autowired
    private TuteurService tuteurService;
    @Autowired
    private EntrepriseService entrepriseService;
    @Autowired
    private TypeStageService typeStageService;
    @Autowired
    private AnneeService anneeService;

    public Stage findByNumero(String numero) {
        return stageDao.findByNumero(numero);
    }

    List<Stage> findByEtudiantNumero(String numero) {
        return stageDao.findByEtudiantNumero(numero);
    }

    List<Stage> findByProfesseurNumero(String numero) {
        return stageDao.findByProfesseurNumero(numero);
    }

    List<Stage> findByAnneeAnnee(String annee) {
        return stageDao.findByAnneeAnnee(annee);
    }

    List<Stage> findByTuteurNumero(String numero) {
        return stageDao.findByTuteurNumero(numero);
    }

    List<Stage> findByEntrepriseNumero(String numero) {
        return stageDao.findByEntrepriseNumero(numero);
    }

    List<Stage> findByTypeStageType(String type) {
        return stageDao.findByTypeStageType(type);
    }

    public List<Stage> findAll() {
        return stageDao.findAll();
    }

    @Transactional
    public void deleteByNumero(String numero) {
        stageDao.deleteByNumero(numero);
    }

    @Transactional
    public Stage save(Stage stage) {
        if (checkTypeExistence(stage.getEtudiant().getNumero(), null, stage.getTypeStage().getType(), 's'))
            return null;
        String numero = Stage.getIdStage();
        int a = Integer.parseInt(Stage.getIdStage()) + 1;
        Stage.setIdStage(String.valueOf(a));
        stage.setNumero(numero);
        checkComponents(stage);
        return stageDao.save(stage);
    }

    @Transactional
    public Stage update(Stage stage) {
        if (checkTypeExistence(stage.getEtudiant().getNumero(), stage.getId(), stage.getTypeStage().getType(),
                'u'))
            return null;
        checkComponents(stage);
        return stageDao.save(stage);
    }

    private void checkComponents(Stage stage) {
        Etudiant etudiant = etudiantService.findByNumero(stage.getEtudiant().getNumero());
        if (etudiant == null) {
            etudiant = etudiantService.save(stage.getEtudiant());
            stage.setEtudiant(etudiant);
        }
        Professeur professeur = professeurService.findByNumero(stage.getProfesseur().getNumero());
        if (professeur == null) {
            professeur = professeurService.save(stage.getProfesseur());
            stage.setProfesseur(professeur);
        }
        Tuteur tuteur = tuteurService.findByNumero(stage.getTuteur().getNumero());
        if (tuteur == null) {
            tuteur = tuteurService.save(stage.getTuteur());
            stage.setTuteur(tuteur);
        }
        Entreprise entreprise = entrepriseService.findByNumero(stage.getEntreprise().getNumero());
        if (entreprise == null) {
            entreprise = entrepriseService.save(stage.getEntreprise());
            stage.setEntreprise(entreprise);
        }
        TypeStage typeStage = typeStageService.findByType(stage.getTypeStage().getType());
        if (typeStage == null) {
            typeStage = typeStageService.save(stage.getTypeStage());
            stage.setTypeStage(typeStage);
        }
        Annee annee = anneeService.findByAnnee(stage.getAnnee().getAnnee());
        if (annee == null) {
            annee = anneeService.save(stage.getAnnee());
            stage.setAnnee(annee);
        }
    }

    private boolean checkTypeExistence(String numero, Long id, String type, char o) {
        if (o == 's') {
            for (Stage stage : findByEtudiantNumero(numero)) {
                if (stage.getTypeStage().getType().equals(type))
                    return true;
            }
        } else if (o == 'u') {
            for (Stage stage : findByEtudiantNumero(numero)) {
                if (stage.getTypeStage().getType().equals(type) && !stage.getId().equals(id))
                    return true;
            }
        }
        return false;
    }
}
