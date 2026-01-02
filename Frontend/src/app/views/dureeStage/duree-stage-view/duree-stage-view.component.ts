import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { DureeStageService } from '../../../controllers/dureeStage/duree-stage.service';
import { DureeStage } from '../../../models/dureeStage/duree-stage';

@Component({
  selector: 'app-duree-stage-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
  ],
  templateUrl: './duree-stage-view.component.html',
  styleUrl: './duree-stage-view.component.css',
})
export class DureeStageViewComponent {
  constructor(
    private router: Router,
    private dureeStageService: DureeStageService
  ) {}

  getDate(date: Date) {
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  returnToList(): void {
    this.selectedDureeStage = new DureeStage();
    this.router.navigate(['dureeStage/list']);
  }

  public get selectedDureeStage(): DureeStage {
    return this.dureeStageService.selectedDureeStage;
  }
  public set selectedDureeStage(value: DureeStage) {
    this.dureeStageService.selectedDureeStage = value;
  }
}
