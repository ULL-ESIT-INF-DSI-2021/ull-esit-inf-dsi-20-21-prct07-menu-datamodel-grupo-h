import {Food} from './food/food';
import {Carte} from './carte';
import {Menu} from './menu';
import {foodInPlates, Plate, plateCategory} from './plate/plate';
import {StarterPlate} from './plate/starterPlate';
import {FirstPlate} from './plate/firstPlate';
import {SecondPlate} from './plate/secondPlate';
import {DessertPlate} from './plate/dessertPlate';

/**
 * Clase collection, en ella se permite almacenar alimentos con sus nombres, 
 * platos con sus nombres, menus con sus nombres y cartas con sus nombres.
 * @param foods map que guardará alimentos con sus nombres identificativos.
 * @param plates map que guardará plates con sus nombres identificativos.
 * @param menus map que guardará menus con sus nombres identificativos.
 * @param cartas map que guardará cartas con sus nombres identificativos.
 */
export class Collection {
    protected foods: Map<string, Food>;
    protected plates: Map<string, Plate>;
    protected menus: Map<string, Menu>;
    protected cartes: Map<string, Carte>;

    /**
   * Constructor de la clase que permitirá añadir alimentos, platos, menús
   * y cartas para su almacenamiento.
   */
    constructor() {
      this.foods = new Map<string, Food>();
      this.plates = new Map<string, Plate>();
      this.menus = new Map<string, Menu>();
      this.cartes = new Map<string, Carte>();
    }

    /**
     * Método que permitirá añadir alimentos para su almacenamiento
     * @param food alimento a guardar
     */
    addFood(food: Food) {
      this.foods.set(food.getName(), food);
    }

    /**
     * Método que permitirá añadir platos para su almacenamiento
     * @param plateName nombre del plato a almacenar
     * @param plate plato a almacenar
     */
    addPlate(plateName: string, plate: [string, number][], plateType: plateCategory) {
      if (!this.plates.has(plateName)) {
        const aux: foodInPlates[] = [];
        plate.forEach((element) => {
          aux.push([this.foods.get(element[0]) as Food, element[1]]);
        });
        let plateAux: Plate;
        switch (plateType) {
          case 'Starter':
            plateAux = new StarterPlate(plateName, aux, 'Starter');
            break;
          case 'First':
            plateAux = new FirstPlate(plateName, aux, 'First');
            break;
          case 'Second':
            plateAux = new SecondPlate(plateName, aux, 'Second');
            break;
          case 'Dessert':
            plateAux = new DessertPlate(plateName, aux, 'Dessert');
            break;
        }
        this.plates.set(plateAux.getName(), plateAux);
      }
    }

    /**
     * Método que permite añadir un menú a la colección
     * @param menuName Nombre del menu
     * @param platesName Array con el numbre de los platos de ese menú
     */
    addMenu(menuName: string, platesName: string[]) {
      const plates: Plate[] = [];
      platesName.forEach((element) => {
        plates.push(this.plates.get(element) as Plate);
      });
      const menuAux = new Menu(menuName, plates);
      this.menus.set(menuAux.getName(), menuAux);
    }

    /**
     * Método que permite añadir una carta a la colección
     * @param nameCarte Nombre de la carta
     * @param menuList Array con el numbre de los menús de esa carta
     * @param plateList Array con el numbre de los platos de esa carta
     */
    addCarte(nameCarte: string, menuList: string[], plateList: string[]) {
      const menu: Menu[] = [];
      const plate: Plate[] = [];
      menuList.forEach((element) => {
        menu.push(this.menus.get(element) as Menu);
      });
      plateList.forEach((element) => {
        plate.push(this.plates.get(element) as Plate);
      });

      const carteAux = new Carte(nameCarte, menu, plate);

      this.cartes.set(carteAux.getName(), carteAux);
    }

    /**
     * Metodo que permite eliminar un alimento de la colección
     * @param foodName Nombre del alimento
     */
    deleteFood(foodName: string) {
      this.foods.delete(foodName);
    }

    /**
     * Metodo que permite eliminar un plato de la colección
     * @param plateName Nombre del plato
     */
    deletePlate(plateName: string) {
      this.plates.delete(plateName);
    }

    /**
     * Metodo que permite eliminar un menú de la colección
     * @param menuName Nombre del menú
     */
    deleteMenu(menuName: string) {
      this.menus.delete(menuName);
    }

    /**
     * Metodo que permite eliminar una carta de la colección
     * @param menuName Nombre del carta
     */
    deleteCarte(carteName: string) {
      this.cartes.delete(carteName);
    }

    /**
     * Método getter que devuelve los platos almacenados
     * @returns los platos almacenados junto con su nombre identificativo.
     */
    getPlateMap(): Map<string, Plate> {
      return this.plates;
    }

    /**
     * Método getter que devuelve los menús almacenados
     * @returns los menús almacenados junto con su nombre identificativo.
     */
    getMenuMap(): Map<string, Menu> {
      return this.menus;
    }

    /**
     * Método getter que devuelve los alimentos almacenados
     * @returns los alimentos almacenados en el map.
     */
    getFoods(): Food[] {
      return [...this.foods.values()];
    }

    /**
     * Método que devuelve los platos que han sido almacenados
     * @returns platos almacenados en el map.
     */
    getPlates(): Plate[] {
      return [...this.plates.values()];
    }

    /**
     * Método que devuelve los menús que han sido almacenados
     * @returns menús almacenados en el map.
     */
    getMenus(): Menu[] {
      return [...this.menus.values()];
    }

    /**
     * Método que devuelve las cartas que han sido almacenadas
     * @returns cartas almacenadas en el map.
     */
    getCartes(): Carte[] {
      return [...this.cartes.values()];
    }
}
