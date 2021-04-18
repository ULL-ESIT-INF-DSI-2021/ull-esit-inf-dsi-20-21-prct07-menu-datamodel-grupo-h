import {Food, foodGroup, macroNutrients} from "./food";

export class Proteins extends Food {
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  getFoodGroup(): foodGroup {
    return this.type;
  }
}
