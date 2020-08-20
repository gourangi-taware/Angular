import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  

  getDishes(): Observable<Dish[]>{  
  /*getDishes(): Promise<Dish[]> {      //Promises syntax
    return Promise.resolve(DISHES);   //without delay*/

   /* return new Promise(resolve=> {                    //with simple promise and delay
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES), 1000);
    });*/

    return of(DISHES).pipe(delay(1000));    //using obeservables
  }

  getDish(id: string): Observable<Dish> {
   // return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    return of (DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(1000)); 
   
  }

  getFeaturedDish(): Observable<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);

    return of (DISHES.filter((dish) => dish.featured)[0]).pipe(delay(1000)); 
    
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }
}
