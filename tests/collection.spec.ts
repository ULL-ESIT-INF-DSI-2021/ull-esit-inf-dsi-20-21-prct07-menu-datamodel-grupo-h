/**
 * Fichero de prueba para la clase plates. En el se probarán los
 * métodos que conforman la clase en su totalidad.
 */
import 'mocha';
import {expect} from 'chai';
import {Collection} from '../src/collection';
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
import {Carte} from '../src/carte';

const egg = new Proteins("egg", "Spain", {carboHydrates: 10, proteins: 24, lipids: 1}, 5, "Proteins");
const zucchini = new Vegetables("zucchini", "Tenerife", {carboHydrates: 15, proteins: 2, lipids: 2}, 4, "Vegetables");
const cheese = new Dairy("cheese", "El Hierro", {carboHydrates: 20, proteins: 15, lipids: 20}, 8, "Dairy");
const bread = new Cereals("bread", "Arafo", {carboHydrates: 40, proteins: 5, lipids: 10}, 3, "Cereals");
const lemon = new Fruits("lemon", "Agaete", {carboHydrates: 18, proteins: 2, lipids: 2}, 4, "Fruits");
const chop = new Proteins("chop", "madrid", {carboHydrates: 15, proteins: 24, lipids: 9}, 5, "Proteins");
const lettuce = new Vegetables("lettuce", "La gomera", {carboHydrates: 10, proteins: 2, lipids: 2}, 2, "Vegetables");
const milk = new Dairy("milk", "Jinamar", {carboHydrates: 18, proteins: 14, lipids: 20}, 3, "Dairy");
const strawberry = new Fruits("strawberry", "Candelaria", {carboHydrates: 12, proteins: 3, lipids: 7}, 7, "Fruits");
const melon = new Fruits("melon", "Candelaria", {carboHydrates: 15, proteins: 7, lipids: 3}, 2, "Fruits");

const starter = new StarterPlate("grilled cheese and bread", [[cheese, 1000], [bread, 1000], [milk, 1000]], "Starter");
const first = new FirstPlate("meat with vegetables and egg", [[egg, 1000], [zucchini, 1000], [chop, 1000]], "First");
const second = new SecondPlate("Lemon boiled vegetables", [[lettuce, 1000], [zucchini, 1000], [lemon, 1000]], "Second");
const dessert = new DessertPlate("melon and strawberry", [[strawberry, 1000], [bread, 1000]], "Dessert");

const menu = new Menu("menu1", [starter, first, second, dessert]);
const carte = new Carte("Carta1", [menu], [starter, first, dessert]);

const collection: Collection = new Collection();

describe('Tests for Collection', () => {
  it('Exist an object from class Collection', () => {
    expect(collection).not.to.be.equal(null);
  });

  it('collection.addFood(cheese) insert a food element to an atribute map from Collection', () => {
    collection.addFood(cheese);
    expect(collection.getFoods().length).to.be.equal(1);
  });

  it('collection.addPlate(starter.getName(), [[\'cheese\', 1000], [\'bread\', 1000], [\'milk\', 1000]], "Starter") insert a plate element to an atribute map from Collection', () => {
    collection.addFood(bread);
    collection.addFood(milk);
    collection.addFood(zucchini);
    collection.addFood(melon);
    collection.addFood(chop);
    collection.addFood(strawberry);
    collection.addFood(egg);
    collection.addFood(lettuce);
    collection.addFood(lemon);
    collection.addPlate(starter.getName(), [['cheese', 1000], ['bread', 1000], ['milk', 1000]], "Starter");
    collection.addPlate(starter.getName(), [['cheese', 1000], ['bread', 1000], ['milk', 1000]], "Starter");

    expect(collection.getPlates().length).to.be.equal(1);
  });

  it('collection.addMenu() insert a menu element to an atribute map from Collection', () => {
    collection.addPlate(first.getName(), [['egg', 1000], ['zucchini', 1000], ['chop', 1000]], "First");
    collection.addPlate(dessert.getName(), [['strawberry', 1000], ['bread', 1000]], "Dessert");
    collection.addPlate(second.getName(), [['lettuce', 1000], ['zucchini', 1000], ['lemon', 1000]], "Second");
    collection.addMenu(menu.getName(), ["grilled cheese and bread", "meat with vegetables and egg", "melon and strawberry"]);
    expect(collection.getMenus().length).to.be.equal(1);
  });

  it('collection.addCarta() insert a carte element to an atribute map from Collection', () => {
    collection.addCarte(carte.getName(), ["menu1"], ['cheese', 'bread', 'milk']);
    expect(collection.getCartes().length).to.be.equal(1);
  });

  it('collection.deleteFood("cheese") delete a food element to an atribute map from Collection', () => {
    collection.deleteFood("cheese");
    expect(collection.getFoods().length).to.be.equal(9);
  });

  it('collection.deletePlate(grilled cheese and bread) delete a plate element of the plates collection', () => {
    collection.deletePlate("grilled cheese and bread");
    expect(collection.getPlates().length).to.be.equal(3);
  });

  it('collection.deleteMenu(menu1) delete a menu element of the menus collection', () => {
    collection.deleteMenu("menu1");
    expect(collection.getMenus().length).to.be.equal(0);
  });

  it('collection.deleteCarte(Carta1) delete a carte element of the cartes collection', () => {
    collection.deleteCarte("Carta1");
    expect(collection.getCartes().length).to.be.equal(0);
  });

  it('[...collection.getPlateMap()].length returns 2', () => {
    collection.getPlateMap();
    expect([...collection.getPlateMap()].length).to.be.equal(3);
  });

  it('[...collection.getMenuMap()].length returns 0', () => {
    collection.getMenuMap();
    expect([...collection.getMenuMap()].length).to.be.equal(0);
  });
});
