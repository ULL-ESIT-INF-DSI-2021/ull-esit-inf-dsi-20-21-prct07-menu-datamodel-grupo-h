import {macroNutrients, foodGroup} from './food/food';
import {Plate, plateCategory, PlateType} from './plate/plate';

export type MenuType = {
  name: string;
  macroNutrients: macroNutrients;
  plates: PlateType[];
  price: number;
}

export class Menu {
  private macroNutrients: macroNutrients;
  private price : number;

  constructor(private name : string, private plates: Plate[]) {
    if (!this.validate()) {
      throw new Error('ERROR');
    }
    this.price = this.calculatePrice();
    this.macroNutrients = this.nutritionalComposition();
  }

  validate(): boolean {
    if (this.plates.length < 3) return false;

    let group: plateCategory[] = [];
    this.plates.forEach(function(element) {
      group.push(element.getPlateCategory());
    });

    group = group.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    if (group.length < 3) return false;

    return true;
  }

  private calculatePrice(): number {
    let result: number = 0;
    this.plates.forEach(function(element: Plate) {
      result += element.getPrice();
    });
    return result;
  }

  private nutritionalComposition(): macroNutrients {
    const result: macroNutrients = {
      carboHydrates: 0,
      proteins: 0,
      lipids: 0,
    };

    this.plates.forEach(function(element: Plate) {
      result.carboHydrates += element.getNutritionalComposition().carboHydrates;
      result.proteins += element.getNutritionalComposition().proteins;
      result.lipids += element.getNutritionalComposition().lipids;
    });

    return result;
  }

  addPlate(plate: Plate): void {
    this.plates.push(plate);
    this.price = this.calculatePrice();
    this.macroNutrients = this.nutritionalComposition();
  }

  deletePlate(platesToDelete: string[]) {
    let pos: number = 0;
    this.plates.forEach((element) => {
      platesToDelete.forEach((item) => {
        if (element.getName() === item) {
          pos = this.plates.indexOf(element);
          this.plates.splice(pos, 1);
        }
      });
    });
  }

  printMenu() {
    let result: string = 'Menu: ' + this.name +'\n ';
    result += 'Price: ' + this.price + '\n Plates: \n';
    this.plates.forEach(function(element) {
      result += ' - ' + element.getName() + '\n';
    });
    result += 'Nutritional composition: ' +
    '\n - Carbohydrates: ' + this.macroNutrients.carboHydrates +
    '\n - Lipids: ' + this.macroNutrients.lipids +
    '\n - Proteins: ' + this.macroNutrients.proteins + '\n';

    console.log(result);
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getPlates(): Plate[] {
    return this.plates;
  }

  getNutritionalComposition(): macroNutrients {
    return this.macroNutrients;
  }

  getFoodList(): foodGroup[] {
    const result: foodGroup[] = [];

    this.plates.forEach(function(element: Plate) {
      result.push(element.getPredominantGroupFood());
    });

    return result;
  }
}
