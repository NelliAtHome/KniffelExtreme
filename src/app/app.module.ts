import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { DialogScoreComponent } from './dialog-score/dialog-score.component';
import { DialogNewgameComponent } from './dialog-newgame/dialog-newgame.component';
import { DialogPlayerComponent } from './dialog-player/dialog-player.component';
import { DialogMenuComponent } from './dialog-menu/dialog-menu.component';
import { HistorieComponent } from './historie/historie.component';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {LOCALE_ID } from '@angular/core';
import { HistorieScoreboardComponent } from './historie-scoreboard/historie-scoreboard.component';
import { DialogFinishedComponent } from './dialog-finished/dialog-finished.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    DialogScoreComponent,
    DialogNewgameComponent,
    DialogPlayerComponent,
    DialogMenuComponent,
    HistorieComponent,
    HistorieScoreboardComponent,
    DialogFinishedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
