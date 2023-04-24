import { Component, OnInit } from '@angular/core';
import { Languages } from 'src/app/shared/enums/languages.enum';
import { IntroductionCardViewModel } from 'src/app/shared/view-models/introduction-card.view-model';

@Component({
  selector: 'app-introduction-card',
  templateUrl: './introduction-card.component.html',
  styleUrls: ['./introduction-card.component.css']
})
export class IntroductionCardComponent implements OnInit 
{
  //#region Properties

  public viewModel: IntroductionCardViewModel;

  //#endregion Properties

  //#region Constructors

  constructor()
  {
    this.viewModel = new IntroductionCardViewModel();
  }

  //#endregion Constructors

  //#region Getters and Setters

  public get languagesEnum()
  {
    return Languages;
  }

  //#endregion getters and Setters

  //#region Angular lifecycle

  public ngOnInit(): void 
  {
  }

  //#endregion Angular lifecycle

  //#region Public methods

  public setLanguage(language: Languages): void
  {
    this.viewModel.selectedLanguage = language;
  }

  public async turnCard(): Promise<void>
  {
    this.viewModel.launchedTurn = true;
    await this.delay(300);
    this.viewModel.launchedTurn = false;
    this.viewModel.firstOpened = false;
    this.viewModel.secondOpened = true;
    this.viewModel.halfFinishedTurn = true;
    await this.delay(300);
    this.viewModel.halfFinishedTurn = false;
  }

  public toTelegramPage(): void
  {
    window.open("https://t.me/egor_ulianov", "_blank");
  }

  public toLinkedInPage(): void
  {
    window.open("https://www.linkedin.com/in/egor-ulianov-858aa5190/", "_blank");
  }

  public toGithubPage(): void
  {
    window.open("https://github.com/egor-ulianov", "_blank");
  }

  //#endregion Public methods

  //#region Private methods

  private async delay(ms: number): Promise<void>
  {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  //#endregion Private methods
}
