import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import {Carte, CarteType} from './carte';
import {Food, FoodType} from './food/food';
import {Menu, MenuType} from './menu';
import {Plate, plateCategory, PlateType} from './plate/plate';
import {Collection} from './collection';
import {Fruits} from './food/fruits';
import {StarterPlate} from './plate/starterPlate';
import {Proteins} from './food/proteins';
import {Vegetables} from './food/vegetables';
import {Dairy} from './food/dairy';
import {Cereals} from './food/cereals';
import {FirstPlate} from './plate/firstPlate';
import {SecondPlate} from './plate/secondPlate';
import {DessertPlate} from './plate/dessertPlate';

/**
 * Tipo que establece la forma que debe tener la base de datos.
 */
export type databaseType = {
    foods: FoodType[],
    plates: PlateType[],
    menus: MenuType[],
    cartes: CarteType[],
}

/**
 * Clase que permite trabajar sobre la base de datos.
 */
export class JsonDatabase extends Collection {
    private database: lowdb.LowdbSync<databaseType>;

    /**
     * Constructor de la clase, donde se crea o abre el fichero ./src/database.json y se cargan los elementos en collection.
     */
    constructor() {
      super();
      this.database = lowdb(new FileSync("./src/database.json"));
      this.loadFood();
      this.loadPlate();
      this.loadMenu();
      this.loadCartes();
    }

    /**
     * Método que permite cargar los alimentos que se encuentran la base de datos al objeto collection.
     */
    loadFood() {
      if (this.database.has("foods").value()) {
        const dbItems = this.database.get("foods").value();
        let aux: Food;
        dbItems.forEach((item: FoodType) => {
          switch (item.type) {
            case 'Proteins':
              aux = new Proteins(item.name, item.location, item.macroNutrients, item.price, item.type);
              break;
            case 'Vegetables':
              aux = new Vegetables(item.name, item.location, item.macroNutrients, item.price, item.type);
              break;
            case 'Dairy':
              aux = new Dairy(item.name, item.location, item.macroNutrients, item.price, item.type);
              break;
            case 'Cereals':
              aux = new Cereals(item.name, item.location, item.macroNutrients, item.price, item.type);
              break;
            case 'Fruits':
              aux = new Fruits(item.name, item.location, item.macroNutrients, item.price, item.type);
              break;
          };
          super.addFood(aux);
        });
      } else {
        this.database.set("foods", []).write();
      }
    }
    
    /**
     * Método que permite cargar platos que se encuentren en la base de datos.
     */
    loadPlate() {
      if (this.database.has("plates").value()) {
        const dbItems = this.database.get("plates").value();
        let aux: Plate;
        let auxFood: [Food, number][] = [];
        let index: number = 0;
        dbItems.forEach((item: PlateType) => {
          auxFood = [];
          index = 0;
          item.food.forEach((value) => {
            auxFood.push([this.foods.get(value) as Food, item.amount[index]]);
            index++;
          });
          switch (item.type) {
            case 'Starter':
              aux = new StarterPlate(item.name, auxFood, 'Starter');
              break;
            case 'First':
              aux = new FirstPlate(item.name, auxFood, 'First');
              break;
            case 'Second':
              aux = new SecondPlate(item.name, auxFood, 'Second');
              break;
            case 'Dessert':
              aux = new DessertPlate(item.name, auxFood, 'Dessert');
              break;
          }
          this.plates.set(aux.getName(), aux);
        });
      } else {
        this.database.set("plates", []).write();
      }
    }

    /**
     * Método que permite cargar menús que se encuentren en la base de datos.
     */
    loadMenu() {
      if (this.database.has("menus").value()) {
        const dbItems = this.database.get("menus").value();
        let aux: Menu;
        let auxPlate: Plate[];
        dbItems.forEach((item: MenuType) => {
          auxPlate = [];
          item.plates.forEach((eachPlates: PlateType) => {
            auxPlate.push(this.plates.get(eachPlates.name) as Plate);
          });
          aux = new Menu(item.name, auxPlate);
          this.menus.set(aux.getName(), aux);
        });
      } else {
        this.database.set("menus", []).write();
      }
    }

    /**
     * Método que permite cargar las cartas que se encuentran en la base de datos.
     */    /**
     * Método que cargará las cartas desde
     */
    loadCartes() {
      if (this.database.has("cartes").value()) {
        const dbItems = this.database.get("cartes").value();
        let auxMenu: Menu[];
        let auxPlate: Plate[];
        dbItems.forEach((itemCarte: CarteType) => {
          auxMenu = [];
          auxPlate = [];
          itemCarte.menu.forEach((itemMenu: MenuType) => {
            auxMenu.push(this.menus.get(itemMenu.name) as Menu);
          });
          itemCarte.plates.forEach((itemPlate: PlateType) => {
            auxPlate.push(this.plates.get(itemPlate.name) as Plate);
          });
          const auxCarte = new Carte(itemCarte.name, auxMenu, auxPlate);
          this.cartes.set(auxCarte.getName(), auxCarte);
        });
      } else {
        this.database.set("cartes", []).write();
      }
    }

    /**
     * Método que permite añadir un alimento a la base de datos.
     */
    addFood(food: Food) {
      super.addFood(food);
      this.store('food');
    }

    /**
     * Método que permite añadir un plato a la base de datos.
     */
    addPlate(plateName: string, food: [string, number][], plateType: plateCategory) {
      super.addPlate(plateName, food, plateType);
      this.store('plate');
    }

    /**
     * Método que permite añadir un menu a la base de datos.
     */
    addMenu(menuName: string, platesName: string[]) {
      super.addMenu(menuName, platesName);
      this.store('menu');
    }

    /**
     * Método que permite añadir una carta a la base de datos.
     */
    addCarte(nameCarte: string, menus: string[], plates: string[]) {
      super.addCarte(nameCarte, menus, plates);
      this.store('carte');
    }

    /**
     * Método que permite eliminar una comida de la base de datos.
     */
    deleteFoodJson(foodName: string[]) {
      foodName.forEach((element) => {
        super.deleteFood(element);
      });
      this.store('food');
    }

    /**
     * Método que permite eliminar una plato de la base de datos.
     */
    deletePlateJson(plateName: string[]) {
      plateName.forEach((element) => {
        super.deletePlate(element);
      });
      this.store('plate');
    }

    /**
     * Método que permite eliminar un menu de la base de datos.
     */
    deleteMenuJson(menuName: string[]) {
      menuName.forEach((element) => {
        super.deleteMenu(element);
      });
      this.store('menu');
    }

    /**
     * Método que permite eliminar una carta de la base de datos.
     */
    deleteCarteJson(carteName: string[]) {
      carteName.forEach((element) => {
        super.deleteCarte(element);
      });
      this.store('carte');
    }

    /**
     * Método que transforma al tipo PlateType.
     */
    private toPlateType(elements: Plate[]): PlateType[] {
      const aux: PlateType[] = [];
      elements.forEach((element) => {
        aux.push({
          name: element.getName(),
          macroNutrients: element.getNutritionalComposition(),
          groupFood: element.getPredominantGroupFood(),
          price: element.getPrice(),
          food: element.getFood().map(function(element) {
            return element.getName();
          }),
          amount: element.getNumber(),
          type: element.getPlateCategory(),
        });
      });
      return aux;
    }

    /**
     * Método que transforma al tipo MenuType.
     */
    private toMenuType(elements: Menu[]): MenuType[] {
      const aux: MenuType[] = [];
      elements.forEach((element) => {
        aux.push({
          name: element.getName(),
          macroNutrients: element.getNutritionalComposition(),
          plates: this.toPlateType(element.getPlates()),
          price: element.getPrice(),
        });
      });
      return aux;
    }

    /**
     * Método que transforma al tipo CarteType.
     */
    private toCarteType(elements: Carte[]): CarteType[] {
      const aux: CarteType[] = [];
      elements.forEach((element) => {
        aux.push({
          name: element.getName(),
          menu: this.toMenuType(element.getMenus()),
          plates: this.toPlateType(element.getPlates()),
        });
      });
      return aux;
    }

    /**
     * Método que permite añadir elementos a la base de datos.
     */
    private store(type: string) {
      switch (type) {
        case 'food':
          this.database.set("foods", this.getFoods()).write();
        case 'plate':
          const auxPlate: PlateType[] = this.toPlateType(this.getPlates());
          this.database.set("plates", auxPlate).write();
        case 'menu':
          const auxMenu: MenuType[] = this.toMenuType(this.getMenus());
          this.database.set("menus", auxMenu).write();
        case 'carte':
          const auxCarte: CarteType[] = this.toCarteType(this.getCartes());
          this.database.set("cartes", auxCarte).write();
      }
    }
}
