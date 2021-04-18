import {Food, macroNutrients, foodGroup} from "../food/food";

export type plateCategory = 'Starter' | 'First' | 'Second' | 'Dessert';

export type foodInPlates = [Food, number];

export type PlateType = {
  name: string;
  macroNutrients: macroNutrients;
  groupFood: foodGroup;
  price: number;
  food: string[];
  amount: number[];
  type: plateCategory;
}

export abstract class Plate {
  protected macroNutrients: macroNutrients;
  protected groupFood: foodGroup;
  protected price: number;
  protected food: Map<Food, number>;

  constructor(protected name: string, food: foodInPlates[]) {
    this.food = new Map<Food, number>();
    food.forEach((element) => this.addFoodInPlates(element[0], element[1]));
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  addFoodInPlates(food: Food, amount: number) {
    this.food.set(food, amount);
  }

  private nutritionalComposition(): macroNutrients {
    const result: macroNutrients = {
      carboHydrates: 0,
      proteins: 0,
      lipids: 0,
    };

    this.food.forEach((value: number, keys: Food) => {
      result.carboHydrates += (keys.macroNutrients.carboHydrates / 100) * value;
      result.proteins += (keys.macroNutrients.proteins / 100) * value;
      result.lipids += (keys.macroNutrients.lipids / 100) * value;
    });

    return result;
  }

  private predominantGroupFood(): foodGroup {
    const counter = new Map<foodGroup, number>();
    let group: foodGroup;

    [...this.food.keys()].forEach((element) => {
      group = element.getFoodGroup();
      if (counter.has(group)) {
        counter.set(group, Number(counter.get(group)) + 1);
      } else {
        counter.set(group, 0);
      }
    });

    let max: number = [...counter.values()][0];
    let maxGroup: foodGroup = [...counter.keys()][0];
    counter.forEach(function(amount: number, group: foodGroup) {
      if (amount > max) {
        max = amount;
        maxGroup = group;
      }
    });

    return maxGroup;
  }

  private calculatePrice(): number {
    let result: number = 0;
    this.food.forEach(function(value: number, keys: Food) {
      result += (keys.getPrice() / 1000) * value;
    });
    return result;
  }

  addFood(foodToAdd: Food, amount: number): void {
    this.food.set(foodToAdd, amount);
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  deleteFood(foodToDelete: Food): void {
    this.food.delete(foodToDelete);
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  getName(): string {
    return this.name;
  }

  getNumber(): number[] {
    return [...this.food.values()];
  }

  getFood(): Food[] {
    return [...this.food.keys()];
  }

  getPrice(): number {
    return this.price;
  }

  getNutritionalComposition(): macroNutrients {
    return this.macroNutrients;
  }

  getPredominantGroupFood(): foodGroup {
    return this.groupFood;
  }

  printPlate() {
    let result: string = this.name +'\n';
    result += ' - Price: ' + this.price + '\n';
    result += ' - Ingredients: \n';
    this.food.forEach(function(value: number, keys: Food) {
      result += '   * ' + keys.getName() + '\n';
    });
    result += ' - Nutritional composition:' +
    '\n   * Carbohydrates: ' + this.macroNutrients.carboHydrates +
    '\n   * Lipids: ' + this.macroNutrients.lipids +
    '\n   * Proteins: ' + this.macroNutrients.proteins + '\n';
    result +=' - Predominant food group:' + this.getPredominantGroupFood()+'\n';
    console.log(result);
  }

  abstract getPlateCategory(): plateCategory;
}
