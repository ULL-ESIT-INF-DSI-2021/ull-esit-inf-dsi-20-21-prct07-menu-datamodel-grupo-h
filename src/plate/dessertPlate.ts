import {Plate, plateCategory, foodInPlates} from "./plate";

export class DessertPlate extends Plate {
  constructor(name: string, food: foodInPlates[], protected type: plateCategory) {
    super(name, food);
  }

  getPlateCategory(): plateCategory {
    return this.type;
  }
}
