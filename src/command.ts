import * as inquirer from 'inquirer';
import {Menu} from './menu';
import {Plate} from './plate/plate';
import {JsonDatabase} from './JsonDatabase';

/**
 * Comandos a utilizar en la interfaz
 */
enum Commands {SHOW = 'See the carta', ORDER = 'Do an order', FINISH = 'Finish command'}; 

enum MenusOrder {BASIC = 'Menu preestablecido', PERSONAL = 'Menu personalizado'}; 
/**
 * Clase que permitira que el usuario cree su propio menú
 * o que el usuario elija un menu predefinido
 * @param collection información de alimentos, platos, menús y cartas
 * @param menus array de menús predefinidos
 * @param plates array de platos predefinidos
 */
export class Command {
  private collection: JsonDatabase;
  private menus: Menu[];
  private plates: [Plate, number][];
/**
 * Constructor de la clase que inicializará los parámetros
 * definidos anteriormente.
 */
  constructor() {
    this.collection = new JsonDatabase();
    this.menus = [];
    this.plates = [];
  }
/**
 * Método que mostrará por consola el menú principal 
 *  de la comanda al usuario.
 */
  mainMenu() {
    console.clear();
    inquirer.prompt({
      type: 'list',
      name: 'option',
      message: 'What do you want to do?',
      choices: Object.values(Commands),
    }).then((answers) => {
      switch (answers['option']) {
        case Commands.SHOW:
          this.visualize();
          break;
        case Commands.ORDER:
          this.makeOrder();
          break;
        case Commands.FINISH:
          this.showCommand();
          return;
      }
    });
  }
/**
 * Método que informará al usuario de las elecciones
 * que irá realizando desde el menú principal.
 */
  showCommand() {
    console.log('The menu you have requeste are: \n\n');
    this.menus.forEach((element) => {
      element.printMenu();
    });

    console.log('\nThe plate you have request are: \n\n');
    this.plates.forEach((element) => {
      element[0].printPlate();
      console.log(' - Amount:' + element[1] + '\n');
    });

    console.log('\n Thank you very much for your order');
  }
 /**
 * Método que mostrará al usuario información sobre
 * los menús, cartas y platos disponibles.
 */
  visualize() {
    console.clear();
    console.log('The carta is:\n');
    console.log('The menus are:\n');
    this.collection.getMenus().forEach((element) => {
      element.printMenu();
    });
    console.log('The plates are:\n');
    this.collection.getPlates().forEach((element) => {
      element.printPlate();
    });
    inquirer.prompt({
      type: 'confirm',
      name: 'command',
      message: 'Do you want to order an command?',
      default: true,
    }).then((answers) => {
      if (answers['command']) {
        this.makeOrder();
      } else {
        this.mainMenu();
      }
    });
  }
  /**
   * Método que permitirá al usuario registrar un pedido
   */
  makeOrder() {
    console.clear();
    inquirer.prompt({
      type: 'list',
      name: 'option',
      message: 'Choose one of the options',
      choices: Object.values(MenusOrder),
    }).then((answers) => {
      if (answers['option'] == MenusOrder.BASIC) {
        this.chooseStandardMenu();
      } else {
        this.choosePersonalizedMenu();
      }
    });
  }
 /**
 * Método que permitirá al usuario elegir un
 * menú predefinido
 */
  chooseStandardMenu() {
    const nameMenu: string[] = [];
    this.collection.getMenus().forEach(function(element) {
      nameMenu.push(element.getName());
    });
    console.clear();
    inquirer.prompt([{
      type: 'list',
      name: 'menus',
      message: 'Select the menu that will make up the menu:',
      choices: nameMenu,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must select at least one menu.';
        }
        return true;
      },
    }, {
      type: 'confirm',
      name: 'askAgain',
      message: 'Do you want to introduce another menu?',
      default: true,
    }]).then((answers) => {
      this.menus.push(this.collection.getMenuMap().get(answers['menus']) as Menu);
      if (answers['askAgain']) {
        this.chooseStandardMenu();
      } else {
        this.mainMenu();
      }
    });
  }
 /**
 * Método que permitirá al usuario crear un menú desde cero o
 * crear uno a partir de otro ya existente.
 */
  choosePersonalizedMenu() {
    console.clear();
    inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'Do you want to create your personalized menu from scratch or from ready-made menus?',
      choices: ['Create menu from another already made', 'Create a menu by choosing dishes from scratch'],
    }).then((answers) => {
      if (answers['type'] == 'Create menu from another already made') {
        this.chooseMenuFromOther();
      } else {
        this.chooseMenuFromZero();
      }
    });
  }
 /**
 * Método que permite crear un menu a partir de otro existente.
 */
  chooseMenuFromOther() {
    const nameMenu: string[] = [];
    const namePlate: string[] = [];
    this.collection.getMenus().forEach(function(element) {
      nameMenu.push(element.getName());
    });
    this.collection.getPlates().forEach(function(element) {
      namePlate.push(element.getName());
    });
    console.clear();
    inquirer.prompt({
      type: 'list',
      name: 'menus',
      message: 'Select the menu from which you want to create the custom:',
      choices: nameMenu,
    }).then((answers) => {
      const menuAux: Menu = this.collection.getMenuMap().get(answers['menus']) as Menu;
      console.log('El menu ' + answers['menus'] + ' tiene los siguientes platos:');
      menuAux.printMenu();
      inquirer.prompt({
        type: 'confirm',
        name: 'add',
        message: 'Do you want to add dishes?',
      }).then((answers) => {
        if (answers['add']) this.addPlatesInCommand(namePlate, menuAux);
        else this.deletePlatesInCommand(menuAux);
      });
    });
  }
  /**
   * Método que permite al usuario añadir platos a la comanda
   */
  addPlatesInCommand(namePlate: string[], menu: Menu) {
    inquirer.prompt([{
      type: 'list',
      name: 'foods',
      message: 'Select the plates to be included in the menu:',
      choices: namePlate,
    }, {
      type: 'input',
      name: 'amount',
      message: 'Indicate the quantity of the plate:',
      validate: function(value) {
        if ((value - Math.floor(value)) != 0) {
          return 'You must enter a whole number';
        }
        return true;
      },
    }, {
      type: 'confirm',
      name: 'askAgain',
      message: 'Do you want to introduce another plate?',
      default: true,
    }]).then((answers) => {
      this.plates.push([this.collection.getPlateMap().get(answers['foods']) as Plate, answers['amount']]);
      if (answers['askAgain']) this.addPlatesInCommand(namePlate, menu);
      else this.deletePlatesInCommand(menu);
    });
  }
  /**
   * Método que permite eliminar platos de la comanda
   */
  deletePlatesInCommand(menu: Menu) {
    const namePlate: string[] = [];
    menu.getPlates().forEach(function(element) {
      namePlate.push(element.getName());
    });
    inquirer.prompt({
      type: 'confirm',
      name: 'delete',
      message: 'Do you want to remove dishes from the menu?',
    }).then((answers) => {
      if (answers['delete']) {
        inquirer.prompt({
          type: 'checkbox',
          name: 'delete',
          message: 'Select the plates to be included in the menu:',
          choices: namePlate,
        }).then((answers) => {
          menu.deletePlate(answers['delete']);
          this.menus.push(menu);
          inquirer.prompt([{
            type: 'list',
            name: 'continue',
            message: 'Do you want to delete another plate?:',
            choices: ['Yes', 'No'],
          }]).then((answers) => {
            if (answers['continue'] == 'Yes') this.deletePlatesInCommand(menu);
            else this.mainMenu();
          });
        });
      } else {
        this.mainMenu();
      }
    });
  }
/**
 * Método que permitirá al usuario crear un menú desde cero.
 */
  chooseMenuFromZero() {
    const namePlate: string[] = [];
    this.collection.getPlates().forEach(function(element) {
      namePlate.push(element.getName());
    });
    inquirer.prompt([{
      type: 'list',
      name: 'plate',
      message: 'Select the plates to be included in the menu:',
      choices: namePlate,
    }, {
      type: 'input',
      name: 'amount',
      message: 'Indicate the quantity of the plate:',
      validate: function(value) {
        if ((value - Math.floor(value)) != 0) {
          return 'You must enter a whole number';
        }
        return true;
      },
    }, {
      type: 'confirm',
      name: 'askAgain',
      message: 'Do you want to introduce another plate?',
      default: true,
    }]).then((answers) => {
      this.plates.push([this.collection.getPlateMap().get(answers['plate']) as Plate, answers['amount']]);
      if (answers['askAgain']) this.chooseMenuFromZero();
      else this.mainMenu();
    });
  }
}

const pruebaCommand = new Command();
pruebaCommand.mainMenu();
