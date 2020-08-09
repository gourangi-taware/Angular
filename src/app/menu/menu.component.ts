import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Dish[] ;   //local variable
  selectedDish : Dish; //variable

  constructor( private DishService : DishService) { }  //does the work of getting data from server or file to the required component

  ngOnInit(): void {
    this.dishes=this.DishService.getDishes(); //stores the data into local variable dishes
  }

  onSelect(dish :Dish) {
    this.selectedDish = dish;
  }

  
}
