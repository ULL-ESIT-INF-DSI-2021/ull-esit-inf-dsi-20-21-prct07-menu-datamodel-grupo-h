import {macroNutrients, foodGroup} from './food/food';
import {Plate, plateCategory, PlateType} from './plate/plate';

/**
 * Tipo de dato que define la informacion de un menu.
 * @param name contiene el nombre del menu.
 * @param macroNutrients macronutrientes del menu.
 * @param plates platos que conforman el menu.
 * @param price precio del menu.
 */
export type MenuType = {
  name: string;
  macroNutrients: macroNutrients;
  plates: PlateType[];
  price: number;
}

/**
 * La clase Menu permitirá crear menús en los que se podrán
 * añadir platos.
 * @param macroNutrients macronutrientes totales del menu
 * @param price precio total del menu
 */
export class Menu {
  private macroNutrients: macroNutrients;
  private price : number;

  /**
 * Constructor de la clase, permitirá crear un objeto menú.
 * @param name nombre del menú
 * @param plates array de platos que conformarán el menú.
 */
  constructor(private name : string, private plates: Plate[]) {
    if (!this.validate()) {
      throw new Error('ERROR');
    }
    this.price = this.calculatePrice();
    this.macroNutrients = this.nutritionalComposition();
  }

  /**
 * Método que comprobará si el menú está compuesto por al menos
 * tres platos o al menos esta compuesto por un plato de cada categoría
 * (starter, first, second y dessert).
 * @returns si es valido o no
 */
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

  /**
 * Calculará el precio del menún en función del precio de cada plato
 * @returns precio total del menú
 */
  private calculatePrice(): number {
    let result: number = 0;
    this.plates.forEach(function(element: Plate) {
      result += element.getPrice();
    });
    return result;
  }

  /**
   * Método que devolverá la información nutricional del menú
   * @returns los valores macronutrientes del menú
   */
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

  /**
   * Método que permitirá añadir un plato al menú.
   * @param plate plato a añadir.
   */
  addPlate(plate: Plate): void {
    this.plates.push(plate);
    this.price = this.calculatePrice();
    this.macroNutrients = this.nutritionalComposition();
  }

  /**
   * Método que permitirá eliminar un plato o más al menú.
   * @param plate plato/s a eliminar.
   */
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

  /**
   * Método que permitirá mostrar la información del menú.
   * mostrando los platos que lo contiene así como la
   * información nutricional del menú.
   */
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

  /**
   * Método getter que devuelve el nombre del menu
   * @returns nombre del menu
   */
  getName(): string {
    return this.name;
  }

  /**
   * Método getter que devuelve el precio del menu
   * @returns precio del menu
   */
  getPrice(): number {
    return this.price;
  }

  /**
   * Método getter que devuelve los platos disponibles en el menu
   * @returns Conjunto de platos disponibles en el menu
   */
  getPlates(): Plate[] {
    return this.plates;
  }

  /**
   * Método getter que devuelve la composición nutricional del menu
   * @returns Composición nutricional del manu
   */
  getNutritionalComposition(): macroNutrients {
    return this.macroNutrients;
  }

  /**
   * Método getter que devuelve el grupo de alimento predominante de cada plato del menu
   * @returns Array con el grupo de alimento predominante de cada plato
   */
  getFoodList(): foodGroup[] {
    const result: foodGroup[] = [];

    this.plates.forEach(function(element: Plate) {
      result.push(element.getPredominantGroupFood());
    });

    return result;
  }
}
