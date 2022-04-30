import { Injectable } from '@angular/core';
import { Player } from './entities';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  players: Array<Player> = [];
  bonus: String = "";

  constructor() { }

  init() {
    this.players = [];
  }

  addPlayer(name: string) {
    var player: Player = { Name: name, Bonus: "" };
    this.players.push(player);
  }

  calculate(player: Player) {
    var summeoben = this.getValue(player.Einer) 
                 + this.getValue(player.Zweier)
                 + this.getValue(player.Dreier)
                 + this.getValue(player.Vierer)
                 + this.getValue(player.Fuenfer)
                 + this.getValue(player.Sechser);

    player.Summe = summeoben;

    if (summeoben < 73) {
      player.Bonus = "Noch " + String(73 - summeoben) + " Punkte";
    }
    else {
      player.Bonus = "45";
      player.Summe += 45;
    }
                
  }

  private getValue(value?: number) : number {
    return value ?? 0;
  }
  
}
