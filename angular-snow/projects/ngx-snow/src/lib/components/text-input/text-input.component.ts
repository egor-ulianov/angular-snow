import { Component, OnInit } from '@angular/core';
import { TextInputViewModel } from '../../view-models/text-input.view-model';

@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit 
{
  //#region Properties

  public viewModel: TextInputViewModel;

  //#endregion Properties

  //#region Constructors

  constructor()
  { 
    this.viewModel = new TextInputViewModel();
  }

  //#endregion Constructors

  //#region Angular lifecycle

  public ngOnInit(): void 
  {
    
  }

  //#endregion Angular lifecycle

}
