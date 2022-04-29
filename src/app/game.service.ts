import { Injectable } from '@angular/core';
import { Player } from './entities';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  players: Array<Player> = [];

  constructor() { }

  init() {
    this.players = [];
  }

  addPlayer(name: string) {
    var player: Player = { Name: name };
    this.players.push(player);
  }

  calculate(player: Player) {
    player.Summe = this.getValue(player.Einer) 
                 + this.getValue(player.Zweier)
                 + this.getValue(player.Dreier)
                 + this.getValue(player.Vierer)
                 + this.getValue(player.Fuenfer)
                 + this.getValue(player.Sechser);
  }

  private getValue(value?: number) : number {
    return value ?? 0;
  }
  
}
