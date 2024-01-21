export class ArDemoViewModel 
{
    //#region Properties

    public cameraWidth: number;

    public cameraHeight: number;

    public isCameraLoaded: boolean;

    //#endregion Properties

    //#region Constructors

    constructor()
    {
        this.cameraHeight = 1;
        this.cameraWidth = 1;
        this.isCameraLoaded = false;
    }

    //#endregion Constructors
}