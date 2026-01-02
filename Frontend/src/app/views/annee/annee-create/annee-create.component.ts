import { AnneeService } from './../../../controllers/annee/annee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Annee } from '../../../models/annee/annee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-annee-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputNumberModule,
  ],
  templateUrl: './annee-create.component.html',
  styleUrl: './annee-create.component.css',
})
export class AnneeCreateComponent implements OnInit {
  public validateAnnee!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private anneeService: AnneeService
  ) {}

  ngOnInit() {
    this.selectedAnnee = new Annee();
    this.validateAnnee = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.anneeService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Année de stage enregistrée',
              life: 3000,
            });
            this.returnToList();
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

  returnToList(): void {
    this.selectedAnnee = new Annee();
    this.router.navigate(['annee/list']);
  }

  private validateForm(): boolean {
    if (
      this.selectedAnnee.annee === undefined ||
      this.selectedAnnee.annee === null ||
      this.selectedAnnee.annee === ''
    ) {
      this.validateAnnee = false;
      return false;
    } else this.validateAnnee = true;
    return true;
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
