import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player, Scoreboard, ScoreboardHistory, Targets } from '../entities';
import { ServiceScoreboardService } from '../service-scoreboard.service';

interface historyentry{
  date: Date;
  player: number;
  winner: string;
  points: number;
  scoreboard: Scoreboard;
}

@Component({
  selector: 'app-historie',
  templateUrl: './historie.component.html',
  styleUrls: ['./historie.component.css']
})
export class HistorieComponent implements OnInit {

  public history: historyentry[];

    constructor(private router: Router, private service: ServiceScoreboardService) {
      this.history = [];
      var item = localStorage.getItem("ScoreboardHistory")
      if (item !== null){
        var scoreboards: ScoreboardHistory = JSON.parse(item);
        scoreboards.entries.forEach(s => {

          var points = 0;
          var playerId = 0;
          s.targets[Targets.t_Summe].fields.forEach(f => {
            if (f.score! > points) {
              points = f.score!;
              playerId = f.playerId;
            }
          })

          var entry: historyentry = {
            date: s.finished!,
            player: s.player.length,
            winner: s.player[playerId].name,
            points: points,
            scoreboard: s
          }
          this.history.push(entry);
        })

      }  
   }

  
  

  ngOnInit(): void {
  }

  close(){
    this.router.navigate(['/'])
  }

  showScoreboard(scoreboard: Scoreboard) {
    this.service.scoreboard = scoreboard;
    this.router.navigate(['/historyboard'])
  }

}
