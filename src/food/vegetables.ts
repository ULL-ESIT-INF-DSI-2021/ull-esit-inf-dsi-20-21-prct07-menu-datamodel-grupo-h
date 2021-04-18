import {Food, foodGroup, macroNutrients} from "./food";

export class Vegetables extends Food {
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, protected type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  getFoodGroup(): foodGroup {
    return this.type;
  }
}
