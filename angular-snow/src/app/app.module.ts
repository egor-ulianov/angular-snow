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
import { NetworkScienceComponent } from './components/network-science/network-science.component';
import { ExampleNetworkComponent } from './shared/components/example-network/example-network.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { InstagramNetworkComponent } from './shared/components/instagram-network/instagram-network.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionCardComponent,
    HomeComponent,
    FaceDetectorComponent,
    ObjectDetectorComponent,
    ArDemoComponent,
    NetworkScienceComponent,
    ExampleNetworkComponent,
    InstagramNetworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'introduction', component: IntroductionCardComponent },
      { path: 'face-detector', component: FaceDetectorComponent },
      { path: 'object-detector', component: ObjectDetectorComponent },
      { path: 'ar-demo', component: ArDemoComponent },
      { path: 'home', component: HomeComponent },
      { path: 'network-science', component: NetworkScienceComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full'}
    ], {}),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
