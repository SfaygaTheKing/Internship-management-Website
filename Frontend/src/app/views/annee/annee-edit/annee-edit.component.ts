import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AnneeService } from '../../../controllers/annee/annee.service';
import { Annee } from '../../../models/annee/annee';

@Component({
  selector: 'app-annee-edit',
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
  templateUrl: './annee-edit.component.html',
  styleUrl: './annee-edit.component.css',
})
export class AnneeEditComponent implements OnInit {
  public validateAnnee!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private anneeService: AnneeService
  ) {}

  ngOnInit() {
    this.validateAnnee = true;
  }

  update(): void {
    if (this.validateForm()) {
      this.anneeService.update().subscribe({
        next: (data) => {
          if (data === 1) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Année de stage mis à jour',
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
