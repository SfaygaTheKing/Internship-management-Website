import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TypeStageService } from '../../../controllers/typeStage/type-stage.service';
import { TypeStage } from '../../../models/typeStage/type-stage';

@Component({
  selector: 'app-type-stage-view',
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
  templateUrl: './type-stage-view.component.html',
  styleUrl: './type-stage-view.component.css',
})
export class TypeStageViewComponent {
  constructor(
    private router: Router,
    private typeStageService: TypeStageService
  ) {}

  returnToList(): void {
    this.selectedTypeStage = new TypeStage();
    this.router.navigate(['typeStage/list']);
  }

  public get selectedTypeStage(): TypeStage {
    return this.typeStageService.selectedTypeStage;
  }
  public set selectedTypeStage(value: TypeStage) {
    this.typeStageService.selectedTypeStage = value;
  }
}
