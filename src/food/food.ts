export type foodGroup = 'Proteins'|'Vegetables'|'Dairy'|'Cereals'|'Fruits';

export type macroNutrients = {
    carboHydrates: number,
    proteins: number,
    lipids: number
}

export type FoodType = {
  name: string;
  location: string;
  macroNutrients: macroNutrients;
  price: number;
  type: foodGroup;
}

export abstract class Food {
  constructor(protected name: string, protected location: string,
        public macroNutrients: macroNutrients, protected price: number) {}

  getName(): string {
    return this.name;
  }

  getLocation() : string {
    return this.location;
  }

  getMacroNutrients(): macroNutrients {
    return this.macroNutrients;
  }

  getPrice(): number {
    return this.price;
  }

  setName(name: string): void {
    this.name = name;
  }

  setLocation(location: string): void {
    this.location = location;
  }

  setMacroNutrients(nutrients: macroNutrients): void {
    this.macroNutrients = nutrients;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  abstract getFoodGroup(): foodGroup;
}
