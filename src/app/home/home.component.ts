import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish :Dish;
  promotion :Promotion;

  constructor( private DishService : DishService,
    private PromotionService : PromotionService) {}   //injecting the services

  ngOnInit(): void {
    this.dish=this.DishService.getFeaturedDish();
    this.promotion=this.PromotionService.getFeaturedPromotion(); //stores the data into local variable dishes
  }

}
