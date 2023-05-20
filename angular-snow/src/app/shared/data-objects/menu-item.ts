export class MenuItem
{
    //#region Properties

    public label: string | undefined;

    public description: string | undefined;

    public link: string | undefined;

    public faIcon: string | undefined;

    //#endregion Properties

    //#region Constructors

    constructor(label?: string, description?: string, link?: string, faIcon?: string)
    {
        this.label = label;
        this.description = description;
        this.link = link;
        this.faIcon = faIcon;
    }

    //#endregion Constructors
}