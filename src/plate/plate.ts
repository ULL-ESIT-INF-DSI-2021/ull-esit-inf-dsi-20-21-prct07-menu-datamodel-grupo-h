import {Food, macroNutrients, foodGroup} from "../food/food";

/**
 * Tipo de dato definido para definir el tipo de plato.
 * Puede ser entrante (starter), primer plato (first),
 * second (segundo plato) y postre (dessert)
 */
export type plateCategory = 'Starter' | 'First' | 'Second' | 'Dessert';

/**
 * Tipo de dato definido para representar los alimentos
 * y sus cantidades en un plato. Se ha definido como una tupla
 * que recibe el alimento y la cantidad del mismo.
 */
export type foodInPlates = [Food, number];

/**
 * Tipo de dato que define la informacion de un plato.
 * @param name contiene el nombre del plato
 * @param macroNutrients macronutrientes del plato
 * @param price precio del plato
 * @param food array de alimentos que conforman el plato
 * @param amount array de cantidades de los alimentos
 * @param type tipo de plato (entrante, primero, segundo, postre)
 */
export type PlateType = {
  name: string;
  macroNutrients: macroNutrients;
  groupFood: foodGroup;
  price: number;
  food: string[];
  amount: number[];
  type: plateCategory;
}

/**
 * La clase abstracta Plate permitirá definir platos en los que se podrán
 * añadir alimentos. Las clases que hereden de ésta podrán diferenciarse gracias al
 * tipo de plato.
 * @param macroNutrients macronutrientes del plato
 * @param groupFood grupo de alimentos predominante en el plato
 * @param price precio del plato
 * @param food alimentos del plato junto con la cantidad usada de cada alimento.
 */
export abstract class Plate {
  protected macroNutrients: macroNutrients;
  protected groupFood: foodGroup;
  protected price: number;
  protected food: Map<Food, number>;

  /**
   * Constructor de la clase abstracta plate, permitirá crear un plato.
   * @param name nombre del plato
   * @param food alimentos que conforman el plato junto a sus cantidades.
   */
  constructor(protected name: string, food: foodInPlates[]) {
    this.food = new Map<Food, number>();
    food.forEach((element) => this.addFoodInPlates(element[0], element[1]));
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  /**
   * Método que permite agregar alimentos al plato
   * @param food alimento a añadir
   * @param amount cantidad del alimento a añadir
   */
  addFoodInPlates(food: Food, amount: number) {
    this.food.set(food, amount);
  }

  /**
   * Método que registrará la información nutricional del plato
   * @returns macronutrientes del plato.
   */
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

  /**
   * Método que devuelve el grupo de alimentos
   * predominante en el plato. En caso de que no haya
   * ninguno que predomine, se eligirá el grupo de alimento
   * del primer elemento del array de alimentos.
   * @returns grupo de alimentos predominante en el plato.
   */
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

  /**
   * Método que se encargará de calcular el precio del plato.
   * Lo calculará en base a la cantidad del alimento y al precio
   * por kilo de cada uno.
   * @returns el precio total del plato.
   */
  private calculatePrice(): number {
    let result: number = 0;
    this.food.forEach(function(value: number, keys: Food) {
      result += (keys.getPrice() / 1000) * value;
    });
    return result;
  }

  /**
   * Método que permitirá añadir más alimentos al plato
   * @param foodToAdd alimento a añadir
   * @param amount cantidad del alimento a añadir
   */
  addFood(foodToAdd: Food, amount: number): void {
    this.food.set(foodToAdd, amount);
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  /**
   * Método que eliminará alimentos del plato.
   * @param foodToDelete alimento a eliminar
   */
  deleteFood(foodToDelete: Food): void {
    this.food.delete(foodToDelete);
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  /**
   * Método getter que devuelve el nombre del plato
   * @returns nombre del plato
   */
  getName(): string {
    return this.name;
  }

  /**
   * Método getter que devuelve las cantidades de los alimentos.
   * @returns cantidades de los alimentos del plato.
   */
  getNumber(): number[] {
    return [...this.food.values()];
  }

  /**
   * Método getter que devuelve los alimentos del plato.
   * @returns alimentos que conforman el plato.
   */
  getFood(): Food[] {
    return [...this.food.keys()];
  }

  /**
   * Método getter que devuelve el precio del plato
   * @returns precio total del plato
   */
  getPrice(): number {
    return this.price;
  }

  /**
   * Método getter que devuelve los macronutrientes del plato.
   * @returns la información nutricional del plato.
   */
  getNutritionalComposition(): macroNutrients {
    return this.macroNutrients;
  }

  /**
   * Método getter que devolverá el grupo de alimentos predominante
   * @returns el grupo de alimentos que predomine en el plato.
   */
  getPredominantGroupFood(): foodGroup {
    return this.groupFood;
  }

  /**
   * Método que permitirá imprimir la información del plato.
   * @returns devuelve un string con la información del plato.
   */
  printPlate() {
    let result: string = this.name +'\n';
    result += ' - Price: ' + this.price + '\n';
    result += ' - Ingredients: \n';
    this.food.forEach(function(value: number, keys: Food) {
      result += '   * ' + keys.getName() + '\n';
    });
    result += ' - Nutritional composition: ' +
    '\n   * Carbohydrates: ' + this.macroNutrients.carboHydrates +
    '\n   * Lipids: ' + this.macroNutrients.lipids +
    '\n   * Proteins: ' + this.macroNutrients.proteins + '\n';
    result +=' - Predominant food group: ' + this.getPredominantGroupFood()+'\n';

    console.log(result);
    return result;
  }

  /**
 * Método abstracto que permitirá a las clases que hereden diferenciarse entre sí
 * por categorías : Starter, First, Second y Dessert.
 */
  abstract getPlateCategory(): plateCategory;
}
