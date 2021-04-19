import * as inquirer from 'inquirer';
import {Fruits} from './food/fruits';
import {Cereals} from './food/cereals';
import {Food, macroNutrients} from './food/food';
import {Proteins} from './food/proteins';
import {Vegetables} from './food/vegetables';
import {Dairy} from './food/dairy';
import {JsonDatabase} from './JsonDatabase';
import {Plate, plateCategory} from './plate/plate';
import {Menu} from './menu';
import {Carte} from './carte';

enum Commands {FOOD = 'Foods', PLATE = 'Plates', MENU = 'Menus', CARTA = 'Cartes', QUIT = 'Quit'};
enum Operations {ADD = 'Add', DELETE = 'Delete'};

/**
 * Clase que permite modificar la base de datos.
 */
class App {
  private collection: JsonDatabase;

  /**
   * Contructor de la clase que inicializa el atributo collection como una JsonDatabase
  */
  constructor() {
    this.collection = new JsonDatabase();
  }

  /**
  * Método que se trata del menú principal de la aplicación.
 */
  mainPrompt(): void {
    console.clear();
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'What do you want to modify?',
      choices: Object.values(Commands),
    }).then((answers) => {
      switch (answers['command']) {
        case Commands.FOOD:
          this.process('food');
          break;
        case Commands.PLATE:
          this.process('plate');
          break;
        case Commands.MENU:
          this.process('menu');
          break;
        case Commands.CARTA:
          this.process('carta');
          break;
        case Commands.QUIT:
          console.log('Thank you for using our application');
          return;
      }
    });
  }

  /**
   * Método que permite añadir o eliminar elementos de la base de datos.
   */
  process(option: string): void {
    console.clear();
    inquirer.prompt({
      type: 'list',
      name: 'option',
      message: 'Choose an option:',
      choices: Object.values(Operations),
    }).then((answers) => {
      switch (answers['option']) {
        case Operations.ADD:
          switch (option) {
            case 'food':
              this.addFood();
              break;
            case 'plate':
              this.addPlate();
              break;
            case 'menu':
              this.addMenu();
              break;
            case 'carta':
              this.addCarta();
              break;
          }
          break;
        case Operations.DELETE:
          switch (option) {
            case 'food':
              this.deleteFood();
              break;
            case 'plate':
              this.deletePlate();
              break;
            case 'menu':
              this.deleteMenu();
              break;
            case 'carta':
              this.deleteCarta();
              break;
          }
      }
    });
  }

  /**
 * Método que permite añadir un alimento.
 * Se podrá rellenar las propiedades del alimento
 * nombre, macronutrientes y precio.
 */
  addFood(): void {
    console.clear();
    inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Ingredient name:',
    }, {
      type: 'list',
      name: 'foodGroup',
      message: 'Select the group to which the food belongs:',
      choices: ['Proteins', 'Vegetables', 'Fruits', 'Cereals', 'Dairy'],
    }, {
      type: 'input',
      name: 'location',
      message: 'Ingredient location:',
    }, {
      type: 'input',
      name: 'carboHydrates',
      message: 'Sets carbohydrates\' value:',
    }, {
      type: 'input',
      name: 'lipids',
      message: 'Sets lipids\' value:',
    }, {
      type: 'input',
      name: 'proteins',
      message: 'Sets proteins\' value:',
    }, {
      type: 'input',
      name: 'price',
      message: 'Sets price\'s value:',
    }]).then((answers) => {
      let food: Food;
      const nutrients: macroNutrients = {
        carboHydrates: answers['carboHydrates'],
        proteins: answers['proteins'],
        lipids: answers['lipids'],
      };
      if (answers['foodGroup'] == 'Proteins') {
        food = new Proteins(answers['name'], answers['location'],
            nutrients, answers['price'], 'Proteins');
      } else if (answers['foodGroup'] == 'Vegetables') {
        food = new Vegetables(answers['name'], answers['location'],
            nutrients, answers['price'], 'Vegetables');
      } else if (answers['foodGroup'] == 'Fruits') {
        food = new Fruits(answers['name'], answers['location'],
            nutrients, answers['price'], 'Fruits');
      } else if (answers['foodGroup'] == 'Cereals') {
        food = new Cereals(answers['name'], answers['location'],
            nutrients, answers['price'], 'Cereals');
      } else {
        food = new Dairy(answers['name'], answers['location'],
            nutrients, answers['price'], 'Dairy');
      }
      this.collection.addFood(food);
      console.log('Successfully created ingredients');
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Do you want to add another food?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addFood();
        else this.mainPrompt();
      });
    });
  }

  /**
   * Método que permite añadir un plato.a
   * Este metodo añadirá un plato en funcion de 
   * su categoría.
   */
  addPlate(): void {
    const nameFood: string[] = [];
    this.collection.getFoods().forEach(function(element: Food) {
      nameFood.push(element.getName());
    });
    console.clear();
    inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Plate name:',
    }, {
      type: 'list',
      name: 'type',
      message: 'Indicate the plate category:',
      choices: ['Starter', 'First', 'Second', 'Dessert'],
    }]).then((answers) => {
      this.addPlateAux(answers['name'], answers['type'], nameFood);
    });
  }

  /**
   * Método que permite añadir un plato.
   * Permite rellenar las propiedades del plato
   * nombre, categoría, alimentos que lo conforman y
   * cantidad de los alimentos
   */
  addPlateAux(plateName: string, plateType: plateCategory, nameFood: string[], foodAndAmount: [string, number][] = []) {
    inquirer.prompt([{
      type: 'list',
      name: 'foods',
      message: 'Select the ingredient to be included in the plate:',
      choices: nameFood,
    }, {
      type: 'input',
      name: 'amount',
      message: 'Indicate the quantity of the ingredient in grams:',
    }, {
      type: 'confirm',
      name: 'askAgain',
      message: 'Do you want to introduce another ingredient?',
      default: true,
    }]).then((answers) => {
      foodAndAmount.push([answers['foods'], answers['amount']]);
      if (answers['askAgain']) {
        this.addPlateAux(plateName, plateType, nameFood, foodAndAmount);
      } else {
        this.collection.addPlate(plateName, foodAndAmount, plateType);
        inquirer.prompt([{
          type: 'list',
          name: 'continue',
          message: 'Do you want to add another plate?:',
          choices: ['Yes', 'No'],
        }]).then((answers) => {
          if (answers['continue'] == 'Yes') this.addPlate();
          else this.mainPrompt();
        });
      }
    });
  }

  /**
   * Método que permite añadir un menú.
   */
  addMenu() {
    const namePlate: string[] = [];
    this.collection.getPlates().forEach(function(element: Plate) {
      namePlate.push(element.getName());
    });
    inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Menu name:',
    }, {
      type: 'checkbox',
      name: 'plates',
      message: 'Select the plates that will make up the menu:',
      choices: namePlate,
      validate: function(answer) {
        if (answer.length < 3) {
          return 'You must select at least one plate.';
        }
        return true;
      },
    }]).then((answers) => {
      try {
        this.collection.addMenu(answers['name'], answers['plates']);
      } catch (error) {
        console.log('The menu must have one plate from each category or at least three of them ');
      }
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Do you want to add another menu?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addMenu();
        else this.mainPrompt();
      });
    });
  }

  /**
 * Método que permite añadir una carta.
 */
  addCarta() {
    const nameMenus: string[] = [];
    const namePlates: string[] = [];
    this.collection.getMenus().forEach(function(element: Menu) {
      nameMenus.push(element.getName());
    });
    this.collection.getPlates().forEach(function(element: Plate) {
      namePlates.push(element.getName());
    });
    inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Enter the name of the carta',
      choices: nameMenus,
    }, {
      type: 'checkbox',
      name: 'menu',
      message: 'Select the menus that will make up the menu:',
      choices: nameMenus,
    }, {
      type: 'checkbox',
      name: 'plate',
      message: 'Select the plates that will make up the menu:',
      choices: namePlates,
    }]).then((answers) => {
      this.collection.addCarte(answers['name'], answers['menu'], answers['plate']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Do you want to add another carta?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.addCarta();
        else this.mainPrompt();
      });
    });
  }

  /**
   * Método que permite eliminar un alimento creado.
   */
  async deleteFood(): Promise<void> {
    const nameFood: string[] = [];
    this.collection.getFoods().forEach(function(element: Food) {
      nameFood.push(element.getName());
    });
    console.clear();
    inquirer.prompt({
      type: 'checkbox',
      name: 'name',
      message: 'Choose the foods to eliminate',
      choices: nameFood,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose a food';
        }
        return true;
      },
    }).then((answers) => {
      this.collection.deleteFoodJson(answers['name']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Do you want to delete another food?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.deleteFood();
        else this.mainPrompt();
      });
    });
  }

  /**
   * Método que permite eliminar un plato creado.
   */
  deletePlate(): void {
    const namePlates: string[] = [];
    this.collection.getPlates().forEach(function(element: Plate) {
      namePlates.push(element.getName());
    });
    console.clear();
    inquirer.prompt({
      type: 'checkbox',
      name: 'name',
      message: 'Choose the plates to eliminate',
      choices: namePlates,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose a plate';
        }
        return true;
      },
    }).then((answers) => {
      this.collection.deletePlateJson(answers['name']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Do you want to delete another plate?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.deletePlate();
        else this.mainPrompt();
      });
    });
  }

  /**
   * Método que permite crear un menu creado
   */
  deleteMenu() {
    const nameMenus: string[] = [];
    this.collection.getMenus().forEach(function(element: Menu) {
      nameMenus.push(element.getName());
    });
    console.clear();
    inquirer.prompt({
      type: 'checkbox',
      name: 'name',
      message: 'Choose the menus to delete',
      choices: nameMenus,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose a menu';
        }
        return true;
      },
    }).then((answers) => {
      this.collection.deleteMenuJson(answers['name']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Do you want to delete another menu?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.deleteMenu();
        else this.mainPrompt();
      });
    });
  }

  /**
 * Método que permite eliminar una carta creada.
 */
  deleteCarta() {
    const nameCartes: string[] = [];
    this.collection.getCartes().forEach(function(element: Carte) {
      nameCartes.push(element.getName());
    });
    console.clear();
    inquirer.prompt({
      type: 'checkbox',
      name: 'name',
      message: 'Choose the cards to delete',
      choices: nameCartes,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose a card';
        }
        return true;
      },
    }).then((answers) => {
      this.collection.deleteCarteJson(answers['name']);
      inquirer.prompt([{
        type: 'list',
        name: 'continue',
        message: 'Do you want to delete another carta?:',
        choices: ['Yes', 'No'],
      }]).then((answers) => {
        if (answers['continue'] == 'Yes') this.deleteCarta();
        else this.mainPrompt();
      });
    });
  }
}

const prueba = new App();
prueba.mainPrompt();
