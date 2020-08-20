import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish :Dish;
  promotion :Promotion;
  leader :Leader;

  constructor( private DishService : DishService,
    private PromotionService : PromotionService,
    private LeaderService :LeaderService) {}   //injecting the services

  ngOnInit(): void {
    this.DishService.getFeaturedDish()
    .subscribe(dish => this.dish =dish);
    this.PromotionService.getFeaturedPromotion() //stores the data into local variable dishes
    .subscribe(promotion => this.promotion =promotion);
    this.LeaderService.getFeaturedLeader()
    .subscribe(leader => this.leader =leader);
  }

}
