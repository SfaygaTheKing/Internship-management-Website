import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StageService } from '../../../controllers/stage/stage.service';
import { Stage } from '../../../models/stage/stage';

@Component({
  selector: 'app-stage-view',
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
  templateUrl: './stage-view.component.html',
  styleUrl: './stage-view.component.css',
})
export class StageViewComponent {
  constructor(private router: Router, private stageService: StageService) {}

  returnToList(): void {
    this.selectedStage = new Stage();
    this.router.navigate(['stage/list']);
  }

  public get selectedStage(): Stage {
    return this.stageService.selectedStage;
  }
  public set selectedStage(value: Stage) {
    this.stageService.selectedStage = value;
  }
}
