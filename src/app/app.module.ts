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

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    DialogScoreComponent,
    DialogNewgameComponent,
    DialogPlayerComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
