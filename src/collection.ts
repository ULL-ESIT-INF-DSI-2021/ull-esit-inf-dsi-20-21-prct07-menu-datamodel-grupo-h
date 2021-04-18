import {Food} from './food/food';
import {Carte} from './carte';
import {Menu} from './menu';
import {foodInPlates, Plate, plateCategory} from './plate/plate';
import {StarterPlate} from './plate/starterPlate';
import {FirstPlate} from './plate/firstPlate';
import {SecondPlate} from './plate/secondPlate';
import {DessertPlate} from './plate/dessertPlate';

export class Collection {
    protected foods: Map<string, Food>;
    protected plates: Map<string, Plate>;
    protected menus: Map<string, Menu>;
    protected cartas: Map<string, Carte>;

    constructor() {
      this.foods = new Map<string, Food>();
      this.plates = new Map<string, Plate>();
      this.menus = new Map<string, Menu>();
      this.cartas = new Map<string, Carte>();
    }

    addFood(food: Food) {
      this.foods.set(food.getName(), food);
    }

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

    addMenu(menuName: string, platesName: string[]) {
      const plates: Plate[] = [];
      platesName.forEach((element) => {
        plates.push(this.plates.get(element) as Plate);
      });
      const menuAux = new Menu(menuName, plates);
      this.menus.set(menuAux.getName(), menuAux);
    }

    addCarta(nameCarta: string, menuList: string[], plateList: string[]) {
      const menu: Menu[] = [];
      const plate: Plate[] = [];
      menuList.forEach((element) => {
        menu.push(this.menus.get(element) as Menu);
      });
      plateList.forEach((element) => {
        plate.push(this.plates.get(element) as Plate);
      });

      const cartaAux = new Carte(nameCarta, menu, plate);

      this.cartas.set(cartaAux.getName(), cartaAux);
    }

    deleteFood(foodName: string) {
      this.foods.delete(foodName);
    }

    deletePlate(plateName: string) {
      this.plates.delete(plateName);
    }

    deleteMenu(menuName: string) {
      this.menus.delete(menuName);
    }

    deleteCarta(cartaName: string) {
      this.cartas.delete(cartaName);
    }

    getPlateMap(): Map<string, Plate> {
      return this.plates;
    }

    getMenuMap(): Map<string, Menu> {
      return this.menus;
    }

    getFoods(): Food[] {
      return [...this.foods.values()];
    }

    getPlates(): Plate[] {
      return [...this.plates.values()];
    }

    getMenus(): Menu[] {
      return [...this.menus.values()];
    }

    getCartas(): Carte[] {
      return [...this.cartas.values()];
    }
}
