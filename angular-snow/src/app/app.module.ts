import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroductionCardComponent } from './components/introduction-card/introduction-card.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'introduction', component: IntroductionCardComponent },
    ], {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
