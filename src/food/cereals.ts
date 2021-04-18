import {Food, foodGroup, macroNutrients} from "./food";

export class Cereals extends Food {
  constructor(name: string, origin: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, origin, macroNutrients, price);
  }

  getFoodGroup(): foodGroup {
    return this.type;
  }
}
