import { MenuItem } from "../data-objects/menu-item";

export class HomeViewModel
{
    //#region Properties

    public menuItems: MenuItem[] = 
        [
            new MenuItem("About me", "Here you can find some information about me and my main social networks", "/introduction", "fa-solid fa-id-card"),
            new MenuItem("Face detector", "Find out how awesome you are", "/face-detector", "fa-solid fa-face-grin-wide")
        ];

    //#endregion Properties

    //#region 
}