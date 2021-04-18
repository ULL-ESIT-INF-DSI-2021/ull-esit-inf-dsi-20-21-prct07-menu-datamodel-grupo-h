/**
 * Fichero de prueba para la clase food. En el se probarán los
 * métodos que conforman la clase en su totalidad.
 */
import 'mocha';
import {expect} from 'chai';
import {Proteins} from "../src/food/proteins";
import {Vegetables} from "../src/food/vegetables";
import {Dairy} from "../src/food/dairy";
import {Cereals} from "../src/food/cereals";
import {Fruits} from "../src/food/fruits";

export const egg = new Proteins("egg", "Spain", {carboHydrates: 10, proteins: 24, lipids: 1}, 5, "Proteins");
export const zucchini = new Vegetables("zucchini", "Tenerife", {carboHydrates: 15, proteins: 2, lipids: 2}, 4, "Vegetables");
export const cheese = new Dairy("cheese", "El Hierro", {carboHydrates: 20, proteins: 15, lipids: 20}, 8, "Dairy");
export const bread = new Cereals("bread", "Arafo", {carboHydrates: 40, proteins: 5, lipids: 10}, 3, "Cereals");
export const lemon = new Fruits("lemon", "Agaete", {carboHydrates: 18, proteins: 2, lipids: 2}, 4, "Fruits");
const testSetters = new Proteins("generic", "generic", {carboHydrates: 1, proteins: 1, lipids: 1}, 5, "Proteins");

// test proteins
describe('Tests for Proteins', () => {
  it('egg.getPrice() returns 5', () => {
    expect(egg.getPrice()).to.be.equal(5);
  });

  it('egg.getName() returns egg', () => {
    expect(egg.getName()).to.be.equal("egg");
  });

  it('egg.getLocation() returns Spain', () => {
    expect(egg.getLocation()).to.be.equal("Spain");
  });

  it('egg.getMacroNutrients() returns {carboHydrates: 10, proteins: 24, lipids: 1}', () => {
    expect(egg.getMacroNutrients()).to.be.eql({carboHydrates: 10, proteins: 24, lipids: 1 });
  });

  it('egg.getFoodGroup() returns Proteins', () => {
    expect(egg.getFoodGroup()).to.be.equal("Proteins");
  });
});

// test vegetables
describe('Tests for Vegetables', () => {
  it('zucchini.getPrice() returns 4', () => {
    expect(zucchini.getPrice()).to.be.equal(4);
  });

  it('zucchini.getName() returns zucchini', () => {
    expect(zucchini.getName()).to.be.equal("zucchini");
  });

  it('zucchini.getLocation() returns Tenerife', () => {
    expect(zucchini.getLocation()).to.be.equal("Tenerife");
  });

  it('zucchini.getMacroNutrients() returns {carboHydrates: 15, proteins: 2, lipids: 2}', () => {
    expect(zucchini.getMacroNutrients()).to.be.eql({carboHydrates: 15, proteins: 2, lipids: 2});
  });

  it('zucchini.getFoodGroup() returns Vegetables', () => {
    expect(zucchini.getFoodGroup()).to.be.equal("Vegetables");
  });
});

// test Dairy
describe('Tests for Dairy', () => {
  it('cheese.getPrice() returns 8', () => {
    expect(cheese.getPrice()).to.be.equal(8);
  });

  it('cheese.getName() returns cheese', () => {
    expect(cheese.getName()).to.be.equal("cheese");
  });

  it('cheese.getLocation() returns El Hierro', () => {
    expect(cheese.getLocation()).to.be.equal("El Hierro");
  });

  it('cheese.getMacroNutrients() returns {carboHydrates: 20, proteins: 15, lipids: 20}', () => {
    expect(cheese.getMacroNutrients()).to.be.eql({carboHydrates: 20, proteins: 15, lipids: 20});
  });

  it('cheese.getFoodGroup() returns Dairy', () => {
    expect(cheese.getFoodGroup()).to.be.equal("Dairy");
  });
});

// test Cereals
describe('Tests for Cereals', () => {
  it('bread.getPrice() returns 3', () => {
    expect(bread.getPrice()).to.be.equal(3);
  });

  it('bread.getName() returns bread', () => {
    expect(bread.getName()).to.be.equal("bread");
  });

  it('bread.getLocation() returns Arafo', () => {
    expect(bread.getLocation()).to.be.equal("Arafo");
  });

  it('bread.getMacroNutrients() returns {carboHydrates: 40, proteins: 5, lipids: 10}', () => {
    expect(bread.getMacroNutrients()).to.be.eql({carboHydrates: 40, proteins: 5, lipids: 10});
  });

  it('bread.getFoodGroup() returns Cereals', () => {
    expect(bread.getFoodGroup()).to.be.equal("Cereals");
  });
});

// test Fruits
describe('Tests for Fruits', () => {
  it('lemon.getPrice() returns 4', () => {
    expect(lemon.getPrice()).to.be.equal(4);
  });

  it('lemon.getName() returns lemon', () => {
    expect(lemon.getName()).to.be.equal("lemon");
  });

  it('lemon.getLocation() returns Agaete', () => {
    expect(lemon.getLocation()).to.be.equal("Agaete");
  });

  it('lemon.getMacroNutrients() returns {carboHydrates: 18, proteins: 2, lipids: 2}', () => {
    expect(lemon.getMacroNutrients()).to.be.eql({carboHydrates: 18, proteins: 2, lipids: 2});
  });

  it('lemon.getFoodGroup() returns Fruits', () => {
    expect(lemon.getFoodGroup()).to.be.equal("Fruits");
  });
});

// Test Setters
testSetters.setName("fish");
testSetters.setLocation("jinamar");
testSetters.setMacroNutrients({carboHydrates: 18, proteins: 2, lipids: 2});
testSetters.setPrice(20);

describe('Tests for Food Setters', () => {
  it('testSetters.getPrice() returns 20', () => {
    expect(testSetters.getPrice()).to.be.equal(20);
  });

  it('testSetters.getName() returns egg', () => {
    expect(testSetters.getName()).to.be.equal("fish");
  });

  it('testSetters.getLocation() returns jinamar', () => {
    expect(testSetters.getLocation()).to.be.equal("jinamar");
  });

  it('testSetters.getMacroNutrients() returns {carboHydrates: 18, proteins: 2, lipids: 2}', () => {
    expect(testSetters.getMacroNutrients()).to.be.eql({carboHydrates: 18, proteins: 2, lipids: 2});
  });
});