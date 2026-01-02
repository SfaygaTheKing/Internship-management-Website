import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AnneeService } from '../../../controllers/annee/annee.service';
import { EntrepriseService } from '../../../controllers/entreprise/entreprise.service';
import { EtudiantService } from '../../../controllers/etudiant/etudiant.service';
import { ProfesseurService } from '../../../controllers/professeur/professeur.service';
import { StageService } from '../../../controllers/stage/stage.service';
import { TuteurService } from '../../../controllers/tuteur/tuteur.service';
import { TypeStageService } from '../../../controllers/typeStage/type-stage.service';
import { Annee } from '../../../models/annee/annee';
import { Entreprise } from '../../../models/entreprise/entreprise';
import { Etudiant } from '../../../models/etudiant/etudiant';
import { Professeur } from '../../../models/professeur/professeur';
import { Stage } from '../../../models/stage/stage';
import { Tuteur } from '../../../models/tuteur/tuteur';
import { TypeStage } from '../../../models/typeStage/type-stage';

@Component({
  selector: 'app-stage-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    DialogModule,
  ],
  templateUrl: './stage-edit.component.html',
  styleUrl: './stage-edit.component.css',
})
export class StageEditComponent implements OnInit {
  typeStageDialog!: boolean;
  anneeDialog!: boolean;

  validateCompteRendu!: boolean;
  validateEtudiant!: boolean;
  validateProfesseur!: boolean;
  validateTuteur!: boolean;
  validateEntreprise!: boolean;
  validateTypeStage!: boolean;
  validateAnnee!: boolean;

  validateTypeStageType!: boolean;
  validateTypeStageNbSemaines!: boolean;

  validateAnneeAnnee!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private stageService: StageService,
    private etudiantService: EtudiantService,
    private professeurService: ProfesseurService,
    private tuteurService: TuteurService,
    private entrepriseService: EntrepriseService,
    private typeStageService: TypeStageService,
    private anneeService: AnneeService
  ) {}

  ngOnInit() {
    this.etudiantService.findAll().subscribe({
      next: (data) => (this.etudiants = data),
      error: (e) => console.error(e),
    });
    this.professeurService.findAll().subscribe({
      next: (data) => (this.professeurs = data),
      error: (e) => console.error(e),
    });
    this.tuteurService.findAll().subscribe({
      next: (data) => (this.tuteurs = data),
      error: (e) => console.error(e),
    });
    this.entrepriseService.findAll().subscribe({
      next: (data) => (this.entreprises = data),
      error: (e) => console.error(e),
    });
    this.typeStageService.findAll().subscribe({
      next: (data) => (this.typesStage = data),
      error: (e) => console.error(e),
    });
    this.anneeService.findAll().subscribe({
      next: (data) => (this.annees = data),
      error: (e) => console.error(e),
    });

    this.typeStageDialog = false;
    this.anneeDialog = false;

    this.validateCompteRendu = true;
    this.validateEtudiant = true;
    this.validateProfesseur = true;
    this.validateTuteur = true;
    this.validateEntreprise = true;
    this.validateTypeStage = true;
    this.validateAnnee = true;
  }

  update(): void {
    if (this.validateForm()) {
      this.stageService.update().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Stage mis à jour',
              life: 3000,
            });
            this.returnToList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: 'Stage de ce type existe déjà pour cet étudiant ',
              life: 3000,
            });
          }
        },
        error: (e) => console.error(e),
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Échec',
        detail: 'Veuillez remplir tous les champs obligatoires',
        life: 3000,
      });
    }
  }

  returnToList(): void {
    this.selectedStage = new Stage();
    this.router.navigate(['stage/list']);
  }

  saveTypeStage(): void {
    if (this.validateTypeStageForm()) {
      this.typeStageService.findByType(this.selectedTypeStage.type).subscribe({
        next: (data) => {
          if (data === null) {
            this.typesStage.push(this.selectedTypeStage);
            this.selectedStage.typeStage = this.selectedTypeStage;
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Type de stage enregistrée',
              life: 3000,
            });
            this.showTypeStageDialog();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: 'Type de stage existe déjà',
              life: 3000,
            });
          }
        },
        error: (e) => console.error(e),
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Échec',
        detail: 'Veuillez remplir tous les champs obligatoires',
        life: 3000,
      });
    }
  }

  saveAnnee(): void {
    if (this.validateAnneeForm()) {
      this.anneeService.findByAnnee(this.selectedAnnee.annee).subscribe({
        next: (data) => {
          if (data === null) {
            this.annees.push(this.selectedAnnee);
            this.selectedStage.annee = this.selectedAnnee;
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Année de stage enregistrée',
              life: 3000,
            });
            this.showAnneeDialog();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: 'Année de stage existe déjà',
              life: 3000,
            });
          }
        },
        error: (e) => console.error(e),
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Échec',
        detail: 'Veuillez remplir tous les champs obligatoires',
        life: 3000,
      });
    }
  }
  showTypeStageDialog(): void {
    this.selectedTypeStage = new TypeStage();
    this.validateTypeStageType = true;
    this.validateTypeStageNbSemaines = true;
    this.typeStageDialog = !this.typeStageDialog;
  }

  showAnneeDialog(): void {
    this.selectedAnnee = new Annee();
    this.validateAnneeAnnee = true;
    this.anneeDialog = !this.anneeDialog;
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedStage.compteRendu === undefined ||
      this.selectedStage.compteRendu === ''
    ) {
      this.validateCompteRendu = false;
      counter++;
    } else this.validateCompteRendu = true;
    if (this.selectedStage.etudiant === undefined) {
      this.validateEtudiant = false;
      counter++;
    } else this.validateEtudiant = true;
    if (this.selectedStage.professeur === undefined) {
      this.validateProfesseur = false;
      counter++;
    } else this.validateProfesseur = true;
    if (this.selectedStage.tuteur === undefined) {
      this.validateTuteur = false;
      counter++;
    } else this.validateTuteur = true;
    if (this.selectedStage.entreprise === undefined) {
      this.validateEntreprise = false;
      counter++;
    } else this.validateEntreprise = true;
    if (this.selectedStage.typeStage === undefined) {
      this.validateTypeStage = false;
      counter++;
    } else this.validateTypeStage = true;
    if (this.selectedStage.annee === undefined) {
      this.validateAnnee = false;
      counter++;
    } else this.validateAnnee = true;
    if (counter === 0) return true;
    else return false;
  }

  private validateTypeStageForm(): boolean {
    let counter = 0;
    if (
      this.selectedTypeStage.type === undefined ||
      this.selectedTypeStage.type === ''
    ) {
      this.validateTypeStageType = false;
      counter++;
    } else this.validateTypeStageType = true;
    if (
      this.selectedTypeStage.nbSemaines === undefined ||
      this.selectedTypeStage.nbSemaines === null ||
      this.selectedTypeStage.nbSemaines.toString() === ''
    ) {
      this.validateTypeStageNbSemaines = false;
      counter++;
    } else this.validateTypeStageNbSemaines = true;
    if (counter === 0) return true;
    else return false;
  }

  private validateAnneeForm(): boolean {
    if (
      this.selectedAnnee.annee === undefined ||
      this.selectedAnnee.annee === null ||
      this.selectedAnnee.annee === ''
    ) {
      this.validateAnneeAnnee = false;
      return false;
    } else this.validateAnneeAnnee = true;
    return true;
  }

  public get selectedStage(): Stage {
    return this.stageService.selectedStage;
  }
  public set selectedStage(value: Stage) {
    this.stageService.selectedStage = value;
  }

  public get selectedEtudiant(): Etudiant {
    return this.etudiantService.selectedEtudiant;
  }
  public set selectedEtudiant(value: Etudiant) {
    this.etudiantService.selectedEtudiant = value;
  }
  public get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
  }
  public set etudiants(value: Array<Etudiant>) {
    this.etudiantService.etudiants = value;
  }

  public get selectedProfesseur(): Professeur {
    return this.professeurService.selectedProfesseur;
  }
  public set selectedProfesseur(value: Professeur) {
    this.professeurService.selectedProfesseur = value;
  }
  public get professeurs(): Array<Professeur> {
    return this.professeurService.professeurs;
  }
  public set professeurs(value: Array<Professeur>) {
    this.professeurService.professeurs = value;
  }

  public get selectedTuteur(): Tuteur {
    return this.tuteurService.selectedTuteur;
  }
  public set selectedTuteur(value: Tuteur) {
    this.tuteurService.selectedTuteur = value;
  }
  public get tuteurs(): Array<Tuteur> {
    return this.tuteurService.tuteurs;
  }
  public set tuteurs(value: Array<Tuteur>) {
    this.tuteurService.tuteurs = value;
  }

  public get selectedEntreprise(): Entreprise {
    return this.entrepriseService.selectedEntreprise;
  }
  public set selectedEntreprise(value: Entreprise) {
    this.entrepriseService.selectedEntreprise = value;
  }
  public get entreprises(): Array<Entreprise> {
    return this.entrepriseService.entreprises;
  }
  public set entreprises(value: Array<Entreprise>) {
    this.entrepriseService.entreprises = value;
  }
  public get selectedTypeStage(): TypeStage {
    return this.typeStageService.selectedTypeStage;
  }
  public set selectedTypeStage(value: TypeStage) {
    this.typeStageService.selectedTypeStage = value;
  }
  public get typesStage(): Array<TypeStage> {
    return this.typeStageService.typesStage;
  }
  public set typesStage(value: Array<TypeStage>) {
    this.typeStageService.typesStage = value;
  }

  public get selectedAnnee(): Annee {
    return this.anneeService.selectedAnnee;
  }
  public set selectedAnnee(value: Annee) {
    this.anneeService.selectedAnnee = value;
  }
  public get annees(): Array<Annee> {
    return this.anneeService.annees;
  }
  public set annees(value: Array<Annee>) {
    this.anneeService.annees = value;
  }
}
