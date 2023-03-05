import { NgModule } from '@angular/core';
import { NgxSnowComponent } from './ngx-snow.component';
import { TextInputComponent } from './components/text-input/text-input.component';



@NgModule({
  declarations: [
    NgxSnowComponent,
    TextInputComponent
  ],
  imports: [
  ],
  exports: [
    NgxSnowComponent
  ]
})
export class NgxSnowModule { }
