import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroductionCardComponent } from './components/introduction-card/introduction-card.component';
import { HomeComponent } from './components/home/home.component';
import { FaceDetectorComponent } from './components/face-detector/face-detector.component';
import { ObjectDetectorComponent } from './components/object-detector/object-detector.component';
import { ArDemoComponent } from './components/ar-demo/ar-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionCardComponent,
    HomeComponent,
    FaceDetectorComponent,
    ObjectDetectorComponent,
    ArDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'introduction', component: IntroductionCardComponent },
      { path: 'face-detector', component: FaceDetectorComponent },
      { path: 'object-detector', component: ObjectDetectorComponent },
      { path: 'ar-demo', component: ArDemoComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full'}
    ], {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
