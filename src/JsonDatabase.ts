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

export type databaseType = {
    foods: FoodType[],
    plates: PlateType[],
    menus: MenuType[],
    cartas: CarteType[],
}

export class JsonDatabase extends Collection {
    private database: lowdb.LowdbSync<databaseType>;

    constructor() {
      super();
      this.database = lowdb(new FileSync("./src/database.json"));
      this.loadFood();
      this.loadPlate();
      this.loadMenu();
      this.loadCartas();
    }

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
        this.database.set("foods", []).write(); // REVISARLO
      }
    }

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

    loadCartas() {
      if (this.database.has("cartas").value()) {
        const dbItems = this.database.get("cartas").value();
        let auxMenu: Menu[];
        let auxPlate: Plate[];
        dbItems.forEach((itemCarta: CarteType) => {
          auxMenu = [];
          auxPlate = [];
          itemCarta.menu.forEach((itemMenu: MenuType) => {
            auxMenu.push(this.menus.get(itemMenu.name) as Menu);
          });
          itemCarta.plates.forEach((itemPlate: PlateType) => {
            auxPlate.push(this.plates.get(itemPlate.name) as Plate);
          });
          const auxCarta = new Carte(itemCarta.name, auxMenu, auxPlate);
          this.cartas.set(auxCarta.getName(), auxCarta);
        });
      } else {
        this.database.set("cartas", []).write();
      }
    }

    addFood(food: Food) {
      super.addFood(food);
      this.store('food');
    }

    addPlate(plateName: string, food: [string, number][], plateType: plateCategory) {
      super.addPlate(plateName, food, plateType);
      this.store('plate');
    }

    addMenu(menuName: string, platesName: string[]) {
      super.addMenu(menuName, platesName);
      this.store('menu');
    }

    addCarta(nameCarta: string, menus: string[], plates: string[]) {
      super.addCarta(nameCarta, menus, plates);
      this.store('carta');
    }

    deleteFoodJson(foodName: string[]) {
      foodName.forEach((element) => {
        super.deleteFood(element);
      });
      this.store('food');
    }

    deletePlateJson(plateName: string[]) {
      plateName.forEach((element) => {
        super.deletePlate(element);
      });
      this.store('plate');
    }

    deleteMenuJson(menuName: string[]) {
      menuName.forEach((element) => {
        super.deleteMenu(element);
      });
      this.store('menu');
    }

    deleteCartaJson(cartaName: string[]) {
      cartaName.forEach((element) => {
        super.deleteCarta(element);
      });
      this.store('carta');
    }


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
        case 'carta':
          const auxCarta: CarteType[] = this.toCarteType(this.getCartas());
          this.database.set("cartas", auxCarta).write();
      }
    }
}
