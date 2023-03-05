export class TextInputViewModel
{
    //#region Properties

    public value: string;
    public validator: Function | null;
    public validationMessage: string;

    //#endregion Properties

    //#region Constructors

    constructor()
    {
        this.value = "";
        this.validationMessage = "";
        this.validator = null;
    }

    //#endregion Constructors

    //#region Getters and Setters

    //#endregion Getters and Setters

    //#region Private methods

    public isValueCorrect(): boolean
    {
        if (this.validator)
            return this.validator(this.value);

        return true;
    }

    //#endregion Private methods
}