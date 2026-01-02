import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CompetenceService } from '../../../controllers/competence/competence.service';
import { Competence } from '../../../models/competence/competence';

@Component({
  selector: 'app-competence-view',
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
  templateUrl: './competence-view.component.html',
  styleUrl: './competence-view.component.css',
})
export class CompetenceViewComponent {
  constructor(
    private router: Router,
    private competenceService: CompetenceService
  ) {}

  returnToList(): void {
    this.selectedCompetence = new Competence();
    this.router.navigate(['competence/list']);
  }

  public get selectedCompetence(): Competence {
    return this.competenceService.selectedCompetence;
  }
  public set selectedCompetence(value: Competence) {
    this.competenceService.selectedCompetence = value;
  }
}
