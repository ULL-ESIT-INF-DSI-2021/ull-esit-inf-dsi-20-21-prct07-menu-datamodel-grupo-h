/**
 * Fichero de prueba para la clase Carte. En el se probarán los
 * métodos que conforman la clase en su totalidad.
 */
import 'mocha';
import {expect} from 'chai';
import {Proteins} from "../src/food/proteins";
import {Vegetables} from "../src/food/vegetables";
import {Dairy} from "../src/food/dairy";
import {Cereals} from "../src/food/cereals";
import {Fruits} from "../src/food/fruits";
import {DessertPlate} from '../src/plate/dessertPlate';
import {FirstPlate} from '../src/plate/firstPlate';
import {SecondPlate} from '../src/plate/secondPlate';
import {StarterPlate} from '../src/plate/starterPlate';
import {Menu} from '../src/menu';
import {Carte} from "../src/carte";

const egg = new Proteins("egg", "Spain", {carboHydrates: 10, proteins: 24, lipids: 1}, 5, "Proteins");
const zucchini = new Vegetables("zucchini", "Tenerife", {carboHydrates: 15, proteins: 2, lipids: 2}, 4, "Vegetables");
const cheese = new Dairy("cheese", "El Hierro", {carboHydrates: 20, proteins: 15, lipids: 20}, 8, "Dairy");
const bread = new Cereals("bread", "Arafo", {carboHydrates: 40, proteins: 5, lipids: 10}, 3, "Cereals");
const lemon = new Fruits("lemon", "Agaete", {carboHydrates: 18, proteins: 2, lipids: 2}, 4, "Fruits");
const chop = new Proteins("chop", "madrid", {carboHydrates: 15, proteins: 24, lipids: 9}, 5, "Proteins");
const lettuce = new Vegetables("lettuce", "La gomera", {carboHydrates: 10, proteins: 2, lipids: 2}, 2, "Vegetables");
const milk = new Dairy("milk", "Jinamar", {carboHydrates: 18, proteins: 14, lipids: 20}, 3, "Dairy");
const strawberry = new Fruits("strawberry", "Candelaria", {carboHydrates: 12, proteins: 3, lipids: 7}, 7, "Fruits");

const starter = new StarterPlate("grilled cheese and bread", [[cheese, 1000], [bread, 1000], [milk, 1000]], "Starter");
const first = new FirstPlate("meat with vegetables and egg", [[egg, 1000], [zucchini, 1000], [chop, 1000]], "First");
const second = new SecondPlate("Lemon boiled vegetables", [[lettuce, 1000], [zucchini, 1000], [lemon, 1000]], "Second");
const dessert = new DessertPlate("melon and strawberry", [[strawberry, 1000], [bread, 1000]], "Dessert");
const menu = new Menu("menu1", [starter, first, second, dessert]);
const carte = new Carte("Carte1", [menu], [first, second]);

describe('Tests for Carte', () => {
  it('carte.getName() returns Carte1', () => {
    expect(carte.getName()).to.be.equal("Carte1");
  });

  it('carte.getMenus() returns [menu]', () => {
    expect(carte.getMenus()).to.be.eql([menu]);
  });

  it('carte.getPlates() returns [first, second]', () => {
    expect(carte.getPlates()).to.be.eql([first, second]);
  });
});
