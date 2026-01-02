package com.ecm.ecmis.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "competencesRequises")
public class CompetenceRequise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int niveau;
    @ManyToOne
    @JoinColumn(name = "competence_id")
    private Competence competence;
    @ManyToOne
    @JoinColumn(name = "typeStage_id")
    private TypeStage typeStage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNiveau() {
        return niveau;
    }

    public void setNiveau(int niveau) {
        this.niveau = niveau;
    }

    public Competence getCompetence() {
        return competence;
    }

    public void setCompetence(Competence competence) {
        this.competence = competence;
    }

    public TypeStage getTypeStage() {
        return typeStage;
    }

    public void setTypeStage(TypeStage typeStage) {
        this.typeStage = typeStage;
    }

}
