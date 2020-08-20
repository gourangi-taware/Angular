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

  ngOnInit(){
   this.DishService.getDishes() //calling the service
    //.then(dishes => this.dishes = dishes);       //use .this for promises
    .subscribe(dishes => this.dishes = dishes);     //use .subscribe for observables
  }


  onSelect(dish :Dish) {
    this.selectedDish = dish;
  }

  
}
