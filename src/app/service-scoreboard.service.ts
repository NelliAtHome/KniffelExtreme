import { Injectable } from '@angular/core';
import { Scoreboard } from './entities';

@Injectable({
  providedIn: 'root'
})
export class ServiceScoreboardService {

  scoreboard: Scoreboard;

  constructor() {
    this.scoreboard = { targets: [], player: []}
   }
}
