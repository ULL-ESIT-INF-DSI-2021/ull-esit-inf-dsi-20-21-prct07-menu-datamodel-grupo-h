/**
 * Fichero de prueba para la clase plates. En el se probarán los
 * métodos que conforman la clase en su totalidad.
 */
import 'mocha';
import {expect} from 'chai';
import {Proteins} from "../src/food/proteins";
import {Vegetables} from "../src/food/vegetables";
import {Dairy} from "../src/food/dairy";
import {Fruits} from "../src/food/fruits";
import {StarterPlate} from "../src/plate/starterPlate";
import {FirstPlate} from "../src/plate/firstPlate";
import {SecondPlate} from "../src/plate/secondPlate";
import {DessertPlate} from "../src/plate/dessertPlate";
import {egg, zucchini, cheese, bread, lemon} from "../tests/food.spec";

export const chop = new Proteins("chop", "madrid", {carboHydrates: 15, proteins: 24, lipids: 9}, 5, "Proteins");
export const lettuce = new Vegetables("lettuce", "La gomera", {carboHydrates: 10, proteins: 2, lipids: 2}, 2, "Vegetables");
export const milk = new Dairy("milk", "Jinamar", {carboHydrates: 18, proteins: 14, lipids: 20}, 3, "Dairy");
export const strawberry = new Fruits("strawberry", "Candelaria", {carboHydrates: 12, proteins: 3, lipids: 7}, 7, "Fruits");
export const melon = new Fruits("melon", "Candelaria", {carboHydrates: 15, proteins: 7, lipids: 3}, 2, "Fruits");

// Entrante
export const starterPlateExamp = new StarterPlate("grilled cheese and bread", [[cheese, 1000], [bread, 1000], [milk, 1000]], "Starter");
export const toChart1 = new StarterPlate("generic1", [[cheese, 1000], [bread, 1000], [melon, 1000]], "Starter");
export const toChart2 = new StarterPlate("generic2", [[zucchini, 1000], [chop, 1000]], "Starter");
const toTestSetters = new FirstPlate("mytest", [[zucchini, 1000], [chop, 1000]], "First");
const toTestdelete = new FirstPlate("mytest", [[zucchini, 1000], [chop, 1000]], "First");


// test StartedPlate
describe('Tests for StarterPlates', () => {
  it('starterPlateExamp.getName() returns grilled cheese and bread', () => {
    expect(starterPlateExamp.getName()).to.be.equal("grilled cheese and bread");
  });

  it('starterPlateExamp.getFood() returns [cheese, bread, milk]', () => {
    expect(starterPlateExamp.getFood()).to.be.eql([cheese, bread, milk]);
  });

  it('starterPlateExamp.getPrice() returns 14', () => {
    expect(starterPlateExamp.getPrice()).to.be.equal(14);
  });

  it('starterPlateExamp.getNutritionalCompositions() returns {carboHydrates: 780, proteins: 340, lipids: 500}', () => {
    expect(starterPlateExamp.getNutritionalComposition()).to.be.eql({carboHydrates: 780, proteins: 340, lipids: 500});
  });

  it('starterPlateExamp.getPredominantGroupFood() returns Dairy', () => {
    expect(starterPlateExamp.getPredominantGroupFood()).to.be.equal("Dairy");
  });

  it('starterPlateExamp.getPlateCategory() returns Starter', () => {
    expect(starterPlateExamp.getPlateCategory()).to.be.equal("Starter");
  });
});

// Primer plato
export const firstPlateExamp = new FirstPlate("meat with vegetables and egg", [[egg, 1000], [zucchini, 1000], [chop, 1000]], "First");

// test firstPlate
describe('Tests for FirstPlates', () => {
  it('firstPlateExamp.getName() returns meat with vegetables and egg', () => {
    expect(firstPlateExamp.getName()).to.be.equal("meat with vegetables and egg");
  });

  it('firstPlateExamp.getFood() returns [egg, zucchini, chop])', () => {
    expect(firstPlateExamp.getFood()).to.be.eql([egg, zucchini, chop]);
  });

  it('firstPlateExamp.getPrice() returns 14', () => {
    expect(firstPlateExamp.getPrice()).to.be.equal(14);
  });

  it('firstPlateExamp.getNutritionalCompositions() returns {carboHydrates: 400, proteins: 500, lipids: 120}', () => {
    expect(firstPlateExamp.getNutritionalComposition()).to.be.eql({carboHydrates: 400, proteins: 500, lipids: 120});
  });

  it('firstPlateExamp.getPredominantGroupFood() returns proteins', () => {
    expect(firstPlateExamp.getPredominantGroupFood()).to.be.equal("Proteins");
  });

  it('firstPlateExamp.getPlateCategory() returns First', () => {
    expect(firstPlateExamp.getPlateCategory()).to.be.equal("First");
  });
});

// segundo plato
export const secondPlateExamp = new SecondPlate("Lemon boiled vegetables", [[lettuce, 1000], [zucchini, 1000], [lemon, 1000]], "Second");

// test SecondPlate
describe('Tests for SecondPlate', () => {
  it('secondPlateExamp.getName() returns Lemon boiled vegetables', () => {
    expect(secondPlateExamp.getName()).to.be.equal("Lemon boiled vegetables");
  });

  it('secondPlateExamp.getFood() returns [lettuce, zucchini,lemon])', () => {
    expect(secondPlateExamp.getFood()).to.be.eql([lettuce, zucchini, lemon]);
  });

  it('secondPlateExamp.getPrice() returns 10', () => {
    expect(secondPlateExamp.getPrice()).to.be.equal(10);
  });

  it('secondPlateExamp.getNutritionalCompositions() returns {carboHydrates: 400, proteins: 500, lipids: 120}', () => {
    expect(secondPlateExamp.getNutritionalComposition()).to.be.eql({carboHydrates: 430, proteins: 60, lipids: 60});
  });

  it('secondPlateExamp.getPredominantGroupFood() returns vegetables', () => {
    expect(secondPlateExamp.getPredominantGroupFood()).to.be.equal("Vegetables");
  });

  it('secondPlateExamp.getPlateCategory() returns Second', () => {
    expect(secondPlateExamp.getPlateCategory()).to.be.equal("Second");
  });
});
// postre
export const dessertPlateExamp = new DessertPlate("melon, strawberry and bread", [[strawberry, 1000], [bread, 1000], [melon, 1000]], "Dessert");

// test DessertPlate
describe('Tests for DessertPlate', () => {
  it('dessertPlateExamp.getName() returns melon, strawberry and bread', () => {
    expect(dessertPlateExamp.getName()).to.be.equal("melon, strawberry and bread");
  });

  it('dessertPlateExamp.getFood() returns [lettuce, zucchini,lemon])', () => {
    expect(dessertPlateExamp.getFood()).to.be.eql([strawberry, bread, melon]);
  });

  it('dessertPlateExamp.getPrice() returns 12', () => {
    expect(dessertPlateExamp.getPrice()).to.be.equal(12);
  });

  it('dessertPlateExamp.getNutritionalCompositions() returns {carboHydrates: 670, proteins: 150, lipids: 200}', () => {
    expect(dessertPlateExamp.getNutritionalComposition()).to.be.eql({carboHydrates: 670, proteins: 150, lipids: 200});
  });

  it('dessertPlateExamp.getPredominantGroupFood() returns Fruits', () => {
    expect(dessertPlateExamp.getPredominantGroupFood()).to.be.equal("Fruits");
  });

  it('dessertPlateExamp.getPlateCategory() returns Dessert', () => {
    expect(dessertPlateExamp.getPlateCategory()).to.be.equal("Dessert");
  });
});

const randomPlate = new DessertPlate("random", [[bread, 1000], [melon, 1000], [strawberry, 1000]], "Dessert");
describe('Tests for randomPlate', () => {
  it('randomplate.getPredominantGroupFood() returns Fruits', () => {
    expect(randomPlate.getPredominantGroupFood()).to.be.equal("Fruits");
  });
});

// test addFood
toTestSetters.addFood(lemon, 1000);
describe('Tests for addFood from Plates', () => {
  it('toTestSetters.getFood() returns [zucchini, chop, lemon]', () => {
    expect(toTestSetters.getFood()).to.be.eql([zucchini, chop, lemon]);
  });
});

// test getNumber
describe('Tests for getNumber from Plates', () => {
  it('toTestSetters.getNumber() returns [1000, 1000, 1000]', () => {
    expect(toTestSetters.getNumber()).to.be.eql([1000, 1000, 1000]);
  });
});

// test print
describe('Tests for printPlate from Plates', () => {
  it('toTestSetters.printPlate() returns', () => {
    const aux: string = toTestSetters.printPlate();
    expect(toTestSetters.printPlate()).to.be.equal(aux);
  });
});

// test deletefood
toTestdelete.deleteFood(zucchini);
describe('Tests for toTestdelete from Plates', () => {
  it('toTestdelete.getFood() returns [chop]', () => {
    expect(toTestdelete.getFood()).to.be.eql([chop]);
  });
});
