import { Component, OnInit } from '@angular/core';
import { TypeStageService } from '../../../controllers/typeStage/type-stage.service';
import { TypeStage } from '../../../models/typeStage/type-stage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-type-stage-create',
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
  templateUrl: './type-stage-create.component.html',
  styleUrl: './type-stage-create.component.css',
})
export class TypeStageCreateComponent implements OnInit {
  public validateType!: boolean;
  public validateNbSemaines!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private typeStageService: TypeStageService
  ) {}

  ngOnInit() {
    this.selectedTypeStage = new TypeStage();
    this.validateType = true;
    this.validateNbSemaines = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.typeStageService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Type de stage enregistrée',
              life: 3000,
            });
            this.returnToList();
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

  returnToList(): void {
    this.selectedTypeStage = new TypeStage();
    this.router.navigate(['typeStage/list']);
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedTypeStage.type === undefined ||
      this.selectedTypeStage.type === ''
    ) {
      this.validateType = false;
      counter++;
    } else this.validateType = true;
    if (
      this.selectedTypeStage.nbSemaines === undefined ||
      this.selectedTypeStage.nbSemaines === null ||
      this.selectedTypeStage.nbSemaines.toString() === ''
    ) {
      this.validateNbSemaines = false;
      counter++;
    } else this.validateNbSemaines = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedTypeStage(): TypeStage {
    return this.typeStageService.selectedTypeStage;
  }
  public set selectedTypeStage(value: TypeStage) {
    this.typeStageService.selectedTypeStage = value;
  }
}
