import {Plate, plateCategory, foodInPlates} from "./plate";

/**
 * Subclase que extiende de la clase padre plate que permite crear un objeto 
 * que represente aquellos platos reconocidos como primer plato
 */
export class FirstPlate extends Plate {
  /**
   * Constructor de la clase: 
   * @param name Nombre del plato 
   * @param food Alimentos que componen el plato
   * @param type Tipo de plato al que pertenece (First)
   */
  constructor(name: string, food: foodInPlates[], protected type: plateCategory) {
    super(name, food);
  }

  /**
   * Método que devuelve el tipo al que pertenece el plato
   * @returns Tipo al que pertenece el plato
   */
  getPlateCategory(): plateCategory {
    return this.type;
  }
}
