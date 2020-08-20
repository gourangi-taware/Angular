import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';
import { Observable ,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Observable<Leader[]> {
    
    return of (LEADER).pipe(delay(1000)); 
    
  }

  getLeader(id: string): Observable<Leader> {
    
    return of (LEADER.filter((leader) => (leader.id === id))[0]).pipe(delay(1000)); 
    
  }

  getFeaturedLeader(): Observable<Leader> {
   
    return of(LEADER.filter((dish) => dish.featured)[0]).pipe(delay(1000)); 
    
  
  }
}
