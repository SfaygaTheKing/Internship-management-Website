import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { PromotionService } from '../../../controllers/promotion/promotion.service';
import { Promotion } from '../../../models/promotion/promotion';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-promotion-view',
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
  templateUrl: './promotion-view.component.html',
  styleUrl: './promotion-view.component.css',
})
export class PromotionViewComponent {
  constructor(
    private router: Router,
    private promotionService: PromotionService
  ) {}

  returnToList(): void {
    this.selectedPromotion = new Promotion();
    this.router.navigate(['promotion/list']);
  }

  public get selectedPromotion(): Promotion {
    return this.promotionService.selectedPromotion;
  }
  public set selectedPromotion(value: Promotion) {
    this.promotionService.selectedPromotion = value;
  }
}
