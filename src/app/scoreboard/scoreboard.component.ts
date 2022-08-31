import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Scoreboard, Target, Player, Field, Nullable, Targets, ScoreboardHistory } from '../entities';
import { DialogScoreComponent } from '../dialog-score/dialog-score.component'
import { DialogNewgameComponent } from '../dialog-newgame/dialog-newgame.component';
import { DialogPlayerComponent } from '../dialog-player/dialog-player.component';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';
import { DialogFinishedComponent } from '../dialog-finished/dialog-finished.component';
import { Router } from '@angular/router';
import { ServiceScoreboardService } from '../service-scoreboard.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public scoreboard: Scoreboard = { player: [], targets: [] };

  constructor(private modalService: NgbModal, private router: Router, private service: ServiceScoreboardService) {
    this.addTarget(Targets.t_Einser, '', 'Einser', '', [1, 2, 3, 4, 5, 6]);
    this.addTarget(Targets.t_Zweier, '', 'Zweier', '', [2, 4, 6, 8, 10, 12]);
    this.addTarget(Targets.t_Dreier, '', 'Dreier', '', [3, 6, 9, 12, 15, 18]);
    this.addTarget(Targets.t_Vierer, '', 'Vierer', '', [4, 8, 12, 16, 20, 24]);
    this.addTarget(Targets.t_Fünfer, '', 'Fünfer', '', [5, 10, 15, 20, 25, 30]);
    this.addTarget(Targets.t_Sechser, '', 'Sechser', '', [6, 12, 18, 24, 30, 36]);
    this.addTarget(Targets.t_Bonus, 'bonus', 'Bonus', '', []);
    this.addTarget(Targets.t_Dreierpasch, '', 'Dreierpasch', 'Alle Augen zählen', []);
    this.addTarget(Targets.t_Viererpasch, '', 'Viererpasch', 'Alle Augen zählen', []);
    this.addTarget(Targets.t_ZweiPaare, '', 'Zwei Paare', 'Alle Augen zählen', []);
    this.addTarget(Targets.t_DreiPaare, '', 'Drei Paare', '35 Punkte', [35]);
    this.addTarget(Targets.t_ZweiDreier, '', 'Zwei Dreier', '45 Punkte', [45]);
    this.addTarget(Targets.t_FullHouse, '', 'Full House', '25 Punkte', [25]);
    this.addTarget(Targets.t_GroßesFullHouse, '', 'Großes Full-House', '45 Punkte', [45]);
    this.addTarget(Targets.t_KleineStraße, '', 'Kleine Straße', '30 Punkte', [30]);
    this.addTarget(Targets.t_GroßeStraße, '', 'Große Straße', '40 Punkte', [40]);
    this.addTarget(Targets.t_Highway, '', 'Highway', '50 Punkte', [50]);
    this.addTarget(Targets.t_Kniffel, '', 'Kniffel', '50 Punkte', [50]);
    this.addTarget(Targets.t_KniffelExtreme, '', 'Kniffel Extreme', '75 Punkte', [75]);
    this.addTarget(Targets.t_10oderWeniger, '', '10 oder weniger', '40 Punkte', [40]);
    this.addTarget(Targets.t_33oderMehr, '', '33 oder mehr', '40 Punkte', [40]);
    this.addTarget(Targets.t_Chance, '', 'Chance', 'Alle Augen zählen', []);
    this.addTarget(Targets.t_SuperChance, '', 'Super Chance', 'Alle Augen zählen x2', []);
    this.addTarget(Targets.t_Summe, 'summe', 'Summe', '', []);

    // aktuelles Scoreboard wieder herstellen
    this.restoreScoreBoard();

    if (this.scoreboard.player.length == 0) this.onNewGame();
  }

  ngOnInit(): void {
  }

  addTarget(id: number, type: string, name: string, info: string, possibleScores: number[]) {
    var target: Target = { id: id, type: type, name: name, info: info, possibleScores: possibleScores, fields: [] };
    this.scoreboard.targets[id] = target;
  }

  addPlayer(name: string) {
    var id = this.scoreboard.player.length;
    var player: Player = { id: id, name: name, joker: 3 };
    this.scoreboard.player[id] = player;

    this.scoreboard.targets.forEach(t => {
      var field: Field = { targetId: t.id, playerId: id, score: null, text: null };
      t.fields[id] = field;
    });
  }

  onClick(f: Field) {
    if (this.scoreboard.finished !== undefined) return;
    if (f.targetId == Targets.t_Bonus || f.targetId == Targets.t_Summe) return;

    const modalRef = this.modalService.open(DialogScoreComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      this.setScore(f.playerId, f.targetId, result);
      this.calculate(f.playerId);
    });
    modalRef.componentInstance.target = this.scoreboard.targets[f.targetId].name;
    modalRef.componentInstance.possibleScores = this.scoreboard.targets[f.targetId].possibleScores;
  }

  setScore(playerId: number, targetId: number, score: Nullable<number>) {
    this.scoreboard.targets[targetId].fields[playerId].score = score;
  }
  getScore(playerId: number, targetId: number): number {
    return this.scoreboard.targets[targetId].fields[playerId].score ?? 0;
  }

  calculate(playerId: number) {
    var sum: number = this.getScore(playerId, Targets.t_Einser)
      + this.getScore(playerId, Targets.t_Zweier)
      + this.getScore(playerId, Targets.t_Dreier)
      + this.getScore(playerId, Targets.t_Vierer)
      + this.getScore(playerId, Targets.t_Fünfer)
      + this.getScore(playerId, Targets.t_Sechser);

    if (sum < 73) {
      this.scoreboard.targets[Targets.t_Bonus].fields[playerId].text = "Noch " + String(73 - sum);
      this.scoreboard.targets[Targets.t_Bonus].fields[playerId].score = null;
    }
    else {
      this.scoreboard.targets[Targets.t_Bonus].fields[playerId].text = null;
      this.scoreboard.targets[Targets.t_Bonus].fields[playerId].score = 45;
      sum += 45;
    }

    sum += Number(this.getScore(playerId, Targets.t_Dreierpasch))
      + Number(this.getScore(playerId, Targets.t_Viererpasch))
      + Number(this.getScore(playerId, Targets.t_ZweiPaare))
      + Number(this.getScore(playerId, Targets.t_DreiPaare))
      + Number(this.getScore(playerId, Targets.t_ZweiDreier))
      + Number(this.getScore(playerId, Targets.t_FullHouse))
      + Number(this.getScore(playerId, Targets.t_GroßesFullHouse))
      + Number(this.getScore(playerId, Targets.t_KleineStraße))
      + Number(this.getScore(playerId, Targets.t_GroßeStraße))
      + Number(this.getScore(playerId, Targets.t_Highway))
      + Number(this.getScore(playerId, Targets.t_Kniffel))
      + Number(this.getScore(playerId, Targets.t_KniffelExtreme))
      + Number(this.getScore(playerId, Targets.t_10oderWeniger))
      + Number(this.getScore(playerId, Targets.t_33oderMehr))
      + Number(this.getScore(playerId, Targets.t_Chance))
      + Number(this.getScore(playerId, Targets.t_SuperChance));

    if (sum == 0) this.setScore(playerId, Targets.t_Summe, null)
    else this.setScore(playerId, Targets.t_Summe, sum);

    // Speichern des aktuellen Scoreboards
    this.saveScoreBoard();

    // Prüfen, ob das Spiel zu Ende ist
    if (this.isFinished()) {
      this.finish();
    }

  }

  onNewGame() {
    const modalRef = this.modalService.open(DialogNewgameComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      if (result != null) this.newGame(result);
    });
  }

  newGame(newPlayer: string[]) {
    this.scoreboard.finished = undefined;
    this.scoreboard.player = [];
    this.scoreboard.targets.forEach(t => {
      t.fields = [];
    });
    newPlayer.forEach(p => {
      this.addPlayer(p);
    });

    this.saveScoreBoard();
  }

  onPlayerClick(player: Player) {

    if (this.scoreboard.finished !== undefined) return;
    if (player.joker == 0) return;

    const modalRef = this.modalService.open(DialogPlayerComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      if (result && player.joker > 0) player.joker--;
    });
    modalRef.componentInstance.player = player;
  }

  saveScoreBoard() {
    localStorage.setItem("CurrentScoreBoard", JSON.stringify(this.scoreboard));
  }

  restoreScoreBoard() {
    var board = localStorage.getItem("CurrentScoreBoard")
    if (board !== null) {
      this.scoreboard = JSON.parse(board);
    }
  }

  openNav() {
    const modalRef = this.modalService.open(DialogMenuComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      if (result == "NewGame") this.onNewGame();
      else if (result == "History") this.router.navigate(['/history'])
    });
  }

  isFinished(): boolean {
    var ret = true;
    this.scoreboard.targets.forEach(t => {
      t.fields.forEach(f => {
        if (f.targetId !== Targets.t_Bonus && f.targetId !== Targets.t_Summe && (f.score === null || f.score === undefined)) ret = false;
      })
    })
    return ret;
  }

  finish() {
    if (this.scoreboard.finished === undefined) {

      // Spiel beenden
      this.scoreboard.finished = new Date();

      // Spiel speichern
      this.saveScoreBoard();
      this.saveScoreboardToHistory();

      // Platzierung anzeigen
      this.service.scoreboard = this.scoreboard;
      const modalRef = this.modalService.open(DialogFinishedComponent, { size: 'sm' });
    }
  }

  saveScoreboardToHistory() {

    var history: ScoreboardHistory;

    var item = localStorage.getItem("ScoreboardHistory")
    if (item === null) {
      history = { entries: [] };
    } else {
      history = JSON.parse(item);
    }
    history.entries.unshift(this.scoreboard);
    localStorage.setItem("ScoreboardHistory", JSON.stringify(history));
  }

}
