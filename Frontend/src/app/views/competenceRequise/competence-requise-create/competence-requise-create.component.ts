import { Component, OnInit } from '@angular/core';
import { CompetenceRequiseService } from '../../../controllers/competenceRequise/competence-requise.service';
import { CompetenceService } from '../../../controllers/competence/competence.service';
import { CommonModule } from '@angular/common';
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
import { TypeStageService } from '../../../controllers/typeStage/type-stage.service';
import { Competence } from '../../../models/competence/competence';
import { CompetenceRequise } from '../../../models/competenceRequise/competence-requise';
import { TypeStage } from '../../../models/typeStage/type-stage';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-competence-requise-create',
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
  templateUrl: './competence-requise-create.component.html',
  styleUrl: './competence-requise-create.component.css',
})
export class CompetenceRequiseCreateComponent implements OnInit {
  competenceDialog!: boolean;
  typeStageDialog!: boolean;

  validateNiveau!: boolean;
  validateCompetence!: boolean;
  validateTypeStage!: boolean;

  validateCompetenceCode!: boolean;
  validateCompetenceLibelle!: boolean;
  validateCompetenceDescription!: boolean;

  validateTypeStageType!: boolean;
  validateTypeStageNbSemaines!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private competenceRequiseService: CompetenceRequiseService,
    private competenceService: CompetenceService,
    private typeStageService: TypeStageService
  ) {}

  ngOnInit() {
    this.competenceService.findAll().subscribe({
      next: (data) => (this.competences = data),
      error: (e) => console.error(e),
    });
    this.typeStageService.findAll().subscribe({
      next: (data) => (this.typesStage = data),
      error: (e) => console.error(e),
    });

    this.selectedCompetenceRequise = new CompetenceRequise();

    this.competenceDialog = false;
    this.typeStageDialog = false;

    this.validateNiveau = true;
    this.validateCompetence = true;
    this.validateTypeStage = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.competenceRequiseService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Compétence à acquérir enregistrée',
              life: 3000,
            });
            this.returnToList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail:
                "Compétence à acquérir existe déjà ou niveau d'exigence existe dans un autre type de stage",
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
    this.selectedCompetenceRequise = new CompetenceRequise();
    this.router.navigate(['competenceRequise/list']);
  }

  saveCompetence(): void {
    if (this.validateCompetenceForm()) {
      this.competenceService
        .findByCode(this.selectedCompetence.code)
        .subscribe({
          next: (data) => {
            if (data === null) {
              this.competences.push(this.selectedCompetence);
              this.selectedCompetenceRequise.competence =
                this.selectedCompetence;
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Compétence enseignée enregistrée',
                life: 3000,
              });
              this.showTypeStageDialog();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Échec',
                detail: 'Compétence enseignée existe déjà',
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

  saveTypeStage(): void {
    if (this.validateTypeStageForm()) {
      this.typeStageService.findByType(this.selectedTypeStage.type).subscribe({
        next: (data) => {
          if (data === null) {
            this.typesStage.push(this.selectedTypeStage);
            this.selectedCompetenceRequise.typeStage = this.selectedTypeStage;
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

  showCompetenceDialog(): void {
    this.selectedCompetence = new Competence();
    this.validateCompetenceCode = true;
    this.validateCompetenceLibelle = true;
    this.validateCompetenceDescription = true;
    this.competenceDialog = !this.competenceDialog;
  }

  showTypeStageDialog(): void {
    this.selectedTypeStage = new TypeStage();
    this.validateTypeStageType = true;
    this.validateTypeStageNbSemaines = true;
    this.typeStageDialog = !this.typeStageDialog;
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedCompetenceRequise.niveau === undefined ||
      this.selectedCompetenceRequise.niveau === null ||
      this.selectedCompetenceRequise.niveau.toString() === undefined
    ) {
      this.validateNiveau = false;
      counter++;
    } else this.validateNiveau = true;
    if (this.selectedCompetenceRequise.competence === undefined) {
      this.validateCompetence = false;
      counter++;
    } else this.validateCompetence = true;
    if (this.selectedCompetenceRequise.typeStage === undefined) {
      this.validateTypeStage = false;
      counter++;
    } else this.validateTypeStage = true;
    if (counter === 0) return true;
    else return false;
  }

  private validateCompetenceForm(): boolean {
    let counter = 0;
    if (
      this.selectedCompetence.code === undefined ||
      this.selectedCompetence.code === ''
    ) {
      this.validateCompetenceCode = false;
      counter++;
    } else this.validateCompetenceCode = true;
    if (
      this.selectedCompetence.libelle === undefined ||
      this.selectedCompetence.libelle === ''
    ) {
      this.validateCompetenceLibelle = false;
      counter++;
    } else this.validateCompetenceLibelle = true;
    if (
      this.selectedCompetence.description === undefined ||
      this.selectedCompetence.description === ''
    ) {
      this.validateCompetenceDescription = false;
      counter++;
    } else this.validateCompetenceDescription = true;
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

  public get selectedCompetenceRequise(): CompetenceRequise {
    return this.competenceRequiseService.selectedCompetenceRequise;
  }
  public set selectedCompetenceRequise(value: CompetenceRequise) {
    this.competenceRequiseService.selectedCompetenceRequise = value;
  }

  public get selectedCompetence(): Competence {
    return this.competenceService.selectedCompetence;
  }
  public set selectedCompetence(value: Competence) {
    this.competenceService.selectedCompetence = value;
  }

  public get competences(): Array<Competence> {
    return this.competenceService.competences;
  }
  public set competences(value: Array<Competence>) {
    this.competenceService.competences = value;
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
}
