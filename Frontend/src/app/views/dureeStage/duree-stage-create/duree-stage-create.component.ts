import { TypeStageService } from './../../../controllers/typeStage/type-stage.service';
import { AnneeService } from './../../../controllers/annee/annee.service';
import { DureeStageService } from './../../../controllers/dureeStage/duree-stage.service';
import { Component, OnInit } from '@angular/core';
import { DureeStage } from '../../../models/dureeStage/duree-stage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { Annee } from '../../../models/annee/annee';
import { TypeStage } from '../../../models/typeStage/type-stage';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-duree-stage-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
  ],
  templateUrl: './duree-stage-create.component.html',
  styleUrl: './duree-stage-create.component.css',
})
export class DureeStageCreateComponent implements OnInit {
  anneeDialog!: boolean;
  typeStageDialog!: boolean;

  validateDebut!: boolean;
  validateFin!: boolean;
  validateAnnee!: boolean;
  validateTypeStage!: boolean;

  validateAnneeAnnee!: boolean;

  validateTypeStageType!: boolean;
  validateTypeStageNbSemaines!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private dureeStageService: DureeStageService,
    private anneeService: AnneeService,
    private typeStageService: TypeStageService
  ) {}

  ngOnInit() {
    this.anneeService.findAll().subscribe({
      next: (data) => (this.annees = data),
      error: (e) => console.error(e),
    });
    this.typeStageService.findAll().subscribe({
      next: (data) => (this.typesStage = data),
      error: (e) => console.error(e),
    });
    this.selectedDureeStage = new DureeStage();

    this.anneeDialog = false;
    this.typeStageDialog = false;

    this.validateDebut = true;
    this.validateFin = true;
    this.validateAnnee = true;
    this.validateTypeStage = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.dureeStageService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Durée de stage enregistrée',
              life: 3000,
            });
            this.returnToList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: 'Durée de stage existe déjà',
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
    this.selectedDureeStage = new DureeStage();
    this.router.navigate(['dureeStage/list']);
  }

  saveAnnee(): void {
    if (this.validateAnneeForm()) {
      this.anneeService.findByAnnee(this.selectedAnnee.annee).subscribe({
        next: (data) => {
          if (data === null) {
            this.annees.push(this.selectedAnnee);
            this.selectedDureeStage.annee = this.selectedAnnee;
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

  saveTypeStage(): void {
    if (this.validateTypeStageForm()) {
      this.typeStageService.findByType(this.selectedTypeStage.type).subscribe({
        next: (data) => {
          if (data === null) {
            this.typesStage.push(this.selectedTypeStage);
            this.selectedDureeStage.typeStage = this.selectedTypeStage;
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

  showAnneeDialog(): void {
    this.selectedAnnee = new Annee();
    this.validateAnneeAnnee = true;
    this.anneeDialog = !this.anneeDialog;
  }

  showTypeStageDialog(): void {
    this.selectedTypeStage = new TypeStage();
    this.validateTypeStageType = true;
    this.validateTypeStageNbSemaines = true;
    this.typeStageDialog = !this.typeStageDialog;
  }

  private validateForm(): boolean {
    let counter = 0;
    if (this.selectedDureeStage.typeStage === undefined) {
      this.validateTypeStage = false;
      counter++;
    } else this.validateTypeStage = true;
    if (this.selectedDureeStage.annee === undefined) {
      this.validateAnnee = false;
      counter++;
    } else this.validateAnnee = true;
    if (this.selectedDureeStage.debut === undefined) {
      this.validateDebut = false;
      counter++;
    } else this.validateDebut = true;
    if (this.selectedDureeStage.fin === undefined) {
      this.validateFin = false;
      counter++;
    } else this.validateFin = true;
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

  public get selectedDureeStage(): DureeStage {
    return this.dureeStageService.selectedDureeStage;
  }
  public set selectedDureeStage(value: DureeStage) {
    this.dureeStageService.selectedDureeStage = value;
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
