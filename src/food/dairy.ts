import {Food, foodGroup, macroNutrients} from "./food";

export class Dairy extends Food {
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  getFoodGroup(): foodGroup {
    return this.type;
  }
}
