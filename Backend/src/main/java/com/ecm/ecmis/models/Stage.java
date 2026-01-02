package com.ecm.ecmis.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "stages")
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String numero;
    private String compteRendu;
    private static String idStage = "1";

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
    @ManyToOne
    @JoinColumn(name = "professeur_id")
    private Professeur professeur;
    @ManyToOne
    @JoinColumn(name = "tuteur_id")
    private Tuteur tuteur;
    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    private Entreprise entreprise;
    @ManyToOne
    @JoinColumn(name = "typeStage_id")
    private TypeStage typeStage;
    @ManyToOne
    @JoinColumn(name = "annee_id")
    private Annee annee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCompteRendu() {
        return compteRendu;
    }

    public void setCompteRendu(String compteRendu) {
        this.compteRendu = compteRendu;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Professeur getProfesseur() {
        return professeur;
    }

    public void setProfesseur(Professeur professeur) {
        this.professeur = professeur;
    }

    public Tuteur getTuteur() {
        return tuteur;
    }

    public void setTuteur(Tuteur tuteur) {
        this.tuteur = tuteur;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public TypeStage getTypeStage() {
        return typeStage;
    }

    public void setTypeStage(TypeStage typeStage) {
        this.typeStage = typeStage;
    }

    public Annee getAnnee() {
        return annee;
    }

    public void setAnnee(Annee annee) {
        this.annee = annee;
    }

    public static String getIdStage() {
        return idStage;
    }

    public static void setIdStage(String idStage) {
        Stage.idStage = idStage;
    }
}
