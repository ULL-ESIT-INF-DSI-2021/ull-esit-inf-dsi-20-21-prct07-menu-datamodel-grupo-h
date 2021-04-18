import {Food, foodGroup, macroNutrients} from "./food";

/**
 * La clase Dairy permite crear un objeto que represente
 * aquellos alimentos que pertenezcan a los lácteos.
 */
export class Dairy extends Food {
  /**
    * Constructor de la clase:
    * @param name nombre del alimento
    * @param origin localización origen del alimento
    * @param macroNutrients información nutricional del alimento
    * @param price precio del alimento por kilo
    * @param type grupo de alimento al que pertenece
  */
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  /**
   * Método que devolverá el grupo de alimento al que pertenece
   * @returns devolverá el grupo Dairy
   */
  getFoodGroup(): foodGroup {
    return this.type;
  }
}
