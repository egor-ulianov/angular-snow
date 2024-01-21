export class ColorsHelper
{
    //#region Properties

    public static availableColors: string[] = ["#03045E", "#00B4D8", "#CAF0F8", "#90E0EF"];

    //#endregion Properties

    //#region Public methods

    public static getColorViaIndex(index: number): string
    {
        return this.availableColors[index % this.availableColors.length];
    }

    //#endregion Public methods
}