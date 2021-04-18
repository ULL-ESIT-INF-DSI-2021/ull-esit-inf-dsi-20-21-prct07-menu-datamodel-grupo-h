import {Plate, PlateType} from './plate/plate';
import {Menu, MenuType} from './menu';

/**
 * Tipo de dato que define la informacion de una carta
 * @param name contiene el nombre de la carta
 * @param menu array de menús que conforman la carta
 * @param plates array de platos que conforman la carta
 */
export type CarteType = {
  name: string;
  menu: MenuType[];
  plates: PlateType[];
}

/**
 * La clase Carta permitirá crear cartas en las que se podrán añadir menús y platos.
 */
export class Carte {
  /**
   * Constructor de la clase:
   * @param name Nombre de la carta 
   * @param menus Conjunto de menus disponibles en la carta
   * @param plates Conjunto de platos disponibles en la carta que no pertenecen a un menu
   */
  constructor(private name: string, private menus: Menu[],
    private plates: Plate[]) {}

  /**
   * Método que retorna el nombre de la carta
   * @returns Nombre de la carta 
   */
  getName(): string {
    return this.name;
  }

  /**
   * Método que retorna el conjunto de menus disponibles en la carta 
   * @returns Array con los menus disponibles
   */
  getMenus(): Menu[] {
    return this.menus;
  }

  /**
   * Método que retorna el conjunto de platos disponibles en la carta
   * @returns Array con los platos disponibles 
   */
  getPlates(): Plate[] {
    return this.plates;
  }
}
