import { Languages } from "../enums/languages.enum";

export class IntroductionCardViewModel
{
    //#region Properties

    public selectedLanguage: Languages;
    public firstOpened: boolean;
    public secondOpened: boolean;
    public launchedTurn: boolean;
    public halfFinishedTurn: boolean;

    //#endregion Properties

    //#region Constructors

    constructor()
    {
        this.selectedLanguage = Languages.English;
        this.firstOpened = true;
        this.secondOpened = false;
        this.launchedTurn = false;
        this.halfFinishedTurn = false;
    }

    //#endregion Constructors
}