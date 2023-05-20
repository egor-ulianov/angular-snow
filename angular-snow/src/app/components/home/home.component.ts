import { Component } from '@angular/core';
import { HomeViewModel } from 'src/app/shared/view-models/home.view-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent
{
  //#region Properties

  public viewModel: HomeViewModel;

  //#endregion Properties

  //#region Constructors

  constructor()
  {
    this.viewModel = new HomeViewModel();
  }

  //#endregion Constructors

}
