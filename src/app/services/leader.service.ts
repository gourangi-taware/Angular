import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeader(): Leader[] {
    return LEADER;
  }

  getDish(id: string): Leader {
    return LEADER.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedDish(): Leader {
    return LEADER.filter((dish) => dish.featured)[0];
  }
}
