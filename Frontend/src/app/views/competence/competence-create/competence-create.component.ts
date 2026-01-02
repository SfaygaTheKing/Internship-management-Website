import { Component, OnInit } from '@angular/core';
import { CompetenceService } from '../../../controllers/competence/competence.service';
import { Competence } from '../../../models/competence/competence';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-competence-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputTextareaModule,
  ],
  templateUrl: './competence-create.component.html',
  styleUrl: './competence-create.component.css',
})
export class CompetenceCreateComponent implements OnInit {
  public validateCode!: boolean;
  public validateLibelle!: boolean;
  public validateDescription!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private competenceService: CompetenceService
  ) {}

  ngOnInit() {
    this.selectedCompetence = new Competence();
    this.validateCode = true;
    this.validateLibelle = true;
    this.validateDescription = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.competenceService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Compétence enseignée enregistrée',
              life: 3000,
            });
            this.returnToList();
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

  returnToList(): void {
    this.selectedCompetence = new Competence();
    this.router.navigate(['competence/list']);
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedCompetence.code === undefined ||
      this.selectedCompetence.code === ''
    ) {
      this.validateCode = false;
      counter++;
    } else this.validateCode = true;
    if (
      this.selectedCompetence.libelle === undefined ||
      this.selectedCompetence.libelle === ''
    ) {
      this.validateLibelle = false;
      counter++;
    } else this.validateLibelle = true;
    if (
      this.selectedCompetence.description === undefined ||
      this.selectedCompetence.description === ''
    ) {
      this.validateDescription = false;
      counter++;
    } else this.validateDescription = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedCompetence(): Competence {
    return this.competenceService.selectedCompetence;
  }
  public set selectedCompetence(value: Competence) {
    this.competenceService.selectedCompetence = value;
  }
}
