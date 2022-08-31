import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HistorieComponent } from './historie/historie.component';
import { HistorieScoreboardComponent } from './historie-scoreboard/historie-scoreboard.component';

const routes: Routes = [
  { path: '', component: ScoreboardComponent},
  { path: 'history', component: HistorieComponent},
  { path: 'historyboard', component: HistorieScoreboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
