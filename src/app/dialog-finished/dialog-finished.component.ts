import { Component, Input, OnInit } from '@angular/core';
import { Targets } from '../entities';
import { ServiceScoreboardService } from '../service-scoreboard.service';

interface winnerentry{
  rank?: number;
  player: string;
  points: number;
}

@Component({
  selector: 'app-dialog-finished',
  templateUrl: './dialog-finished.component.html',
  styleUrls: ['./dialog-finished.component.css']
})
export class DialogFinishedComponent implements OnInit {

  public winners: winnerentry[];

  constructor(private service: ServiceScoreboardService) {
    this.winners = [];
    var temp: winnerentry[] = [];
    
    service.scoreboard.player.forEach(p => {
      let points = service.scoreboard.targets[Targets.t_Summe].fields[p.id].score;
      if (points === null) points = 0;
      var entry: winnerentry = {player: p.name, points: points};
      temp.push(entry);
    });

    temp.sort((a,b) => { return b.points - a.points});

    var rank = 0;
    var last = 1E6;
    temp.forEach(w => {
      if (w.points < last) rank++;
      w.rank = rank;
      this.winners.push(w);
      last = w.points;
    });
    
  }

  ngOnInit(): void {
  }


}
