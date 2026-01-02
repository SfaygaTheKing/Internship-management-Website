import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CompetenceRequiseService } from '../../../controllers/competenceRequise/competence-requise.service';
import { CompetenceRequise } from '../../../models/competenceRequise/competence-requise';

@Component({
  selector: 'app-competence-requise-view',
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
  templateUrl: './competence-requise-view.component.html',
  styleUrl: './competence-requise-view.component.css',
})
export class CompetenceRequiseViewComponent {
  constructor(
    private router: Router,
    private competenceRequiseService: CompetenceRequiseService
  ) {}

  returnToList(): void {
    this.selectedCompetenceRequise = new CompetenceRequise();
    this.router.navigate(['competenceRequise/list']);
  }

  public get selectedCompetenceRequise(): CompetenceRequise {
    return this.competenceRequiseService.selectedCompetenceRequise;
  }
  public set selectedCompetenceRequise(value: CompetenceRequise) {
    this.competenceRequiseService.selectedCompetenceRequise = value;
  }
}
