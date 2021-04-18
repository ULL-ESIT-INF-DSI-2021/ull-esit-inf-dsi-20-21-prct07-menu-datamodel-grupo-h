import {Plate, PlateType} from "./plate/plate";
import {Menu, MenuType} from "./menu";

export type CarteType = {
  name: string;
  menu: MenuType[];
  plates: PlateType[];
}

export class Carte {
  constructor(private name: string, private menus: Menu[],
    private plates: Plate[]) {}

  getName(): string {
    return this.name;
  }

  getMenus(): Menu[] {
    return this.menus;
  }

  getPlates(): Plate[] {
    return this.plates;
  }
}
