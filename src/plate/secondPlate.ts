import {Plate, plateCategory, foodInPlates} from "./plate";

export class SecondPlate extends Plate {
  constructor(name: string, food: foodInPlates[], protected type: plateCategory) {
    super(name, food);
  }

  getPlateCategory(): plateCategory {
    return this.type;
  }
}
