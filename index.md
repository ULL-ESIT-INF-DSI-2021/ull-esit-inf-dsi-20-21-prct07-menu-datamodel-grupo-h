# Informe Práctica 7

## Práctica 7 - Modelo de datos de un sistema que permite el diseño de menús

### 1. Introducción

En esta práctica, deberemos llevar a cabo un diseño orientado a objetos del modelo de datos de un sistema de información que permita el diseño de menús.

Además, se llevará a cabo un informe de la solución diseñada, haciendo hincapié en las decisiones de diseño que se han implementado.

### 2. Objetivos

- Aprender el uso de los módulos inquirer y lowdb.

### 3. Tareas previas

Antes de empezar a realizar la práctica, deberemos realizar las siguientes tareas: 

- Aceptar la [asignación de GitHub Classroom](https://classroom.github.com/group-assignment-invitations/ce722282af9e7f73430f242c78d00a28/status) asociada a esta práctica. Dado que es una asignación grupal, uno de los miembros del grupo aceptará la asignación, creará el equipo y luego, el resto de miembros deberá unirse a dicho equipo.

- Aprender a utilizar los módulos [Inquirer.js](https://www.npmjs.com/package/inquirer) y [Lowdb](https://www.npmjs.com/package/lowdb).

- En caso de que se tenga cualquier tipo de incidencia relacionada con la práctica, solo podrá comunicarse con el profesorado para cualquier tipo de incidencia relacionada con la misma a través de los [issues de GitHub](https://guides.github.com/features/issues/)de su repositorio. Para ello, se deberá crear un issue y se añadirá un comentario describiendo el problema, además de mencionar al profesorado y resto de miembros de su equipo de trabajo para que sean notificados.

- Habrá que incluir la documentación mediante el uso de TypeDoc y adoptar una metodología de desarrollo dirigido por pruebas/comportamiento. Por lo que, seguir la metodología TDD o BDD implica confirmar el correcto funcionamiento del código desarrollado, así como los casos en los que dicho código debería informar de un error cuando la entrada no sea la correcta (errors should never pass silently). También se desarrollarán pruebas unitarias que comprueben el correcto funcionamiento del código y, además, se incluirá otras pruebas unitarias que verifiquen que el software es robusto ante entradas no válidas o inesperadas.

- También habrá que respetar los principios SOLID de diseño orientado a objetos.

### 4. Ejercicio: Descripción de los requisitos del sistema de diseño de menús

### Alimentos y/o ingredientes

Para cada alimento o ingrediente considerado dentro del sistema de diseño de menús se debe almacenar la información siguiente:

1. Grupo de alimentos al que pertenece que puede ser:
Carnes, pescados, huevos, tofu, frutos secos, semillas y legumbres.
Verduras y hortalizas.
Leche y derivados.
Cereales.
Frutas.
2. La composición nutricional del alimento con respecto a los macronutrientes y kcal por 100 gr de dicho alimento.
Macronutrientes: Hidratos de carbono, proteínas y lípidos.
3. Precio del alimento y/o ingrediente por kg en euros.

Además, un alimento tendrá un nombre y localización de origen (país, ciudad, etc.)

**Solución:**

Para ello, hemos creado una clase abstracta que representa los distintos grupos de alimentos a considerar. Los distintos grupos de alimentos heredan de dicha clase.

**Clase abstracta Food**

```ts
/**
 * Contiene un tipo definido por la estructura de datos `type` que representa 
 * los grupos de alimentos existentes. Puede ser Proteins (proteinas), Vegetables (vegetales), 
 * Dairy (lacteaos), Cereals (cereales) y Fruits (frutas).
 */
export type foodGroup = 'Proteins'|'Vegetables'|'Dairy'|'Cereals'|'Fruits';

/**
 * Contiene un tipo definido por la estructura de datos `type` que representa
 * la composición nutricional de un alimento. Dispone de 3 atributos:
 * - carboHydrates: Carbohidratos del alimento
 * - proteins: Proteinas del alimento
 * - lipids: Lípidos del alimento
 */
export type macroNutrients = {
    carboHydrates: number,
    proteins: number,
    lipids: number
}

/**
 *  Contiene un tipo definido por la estructura de datos `type` que representa un alimento 
 *  (Dispone de 5 atributos)
 */
export type FoodType = {
  name: string;
  location: string;
  macroNutrients: macroNutrients;
  price: number;
  type: foodGroup;
}

/**
 * Clase abstracta que almacena información relacionado con un alimento
 */
export abstract class Food {
  /**
   * Constructor de la clase:
   * @param name Nombre del alimento
   * @param location Lugar de procedencia del alimento
   * @param macroNutrients Composición nutricional del alimento
   * @param price Precio del alimento por kg
   */
  constructor(protected name: string, protected location: string,
        public macroNutrients: macroNutrients, protected price: number) {}

  /**
   * Método que retorna el nombre del alimento
   * @returns Nombre del alimento 
   */
  getName(): string {
    return this.name;
  }

  /**
   * Método que retorna el lugar de procedencia del alimento
   * @returns Lugar de procedencia del alimento
   */
  getLocation() : string {
    return this.location;
  }

  /**
   * Método que devuelve la composición nutricional del alimento
   * @returns Composición nutricional del alimento
   */
  getMacroNutrients(): macroNutrients {
    return this.macroNutrients;
  }

  /**
   * Método que devuelve el precio del alimento
   * @returns Precio del alimento 
   */
  getPrice(): number {
    return this.price;
  }

  /**
   * Método que asigna un nombre a un alimento 
   * @param name Nombre a asignar
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Método que asigna el lugar de procedencia a un alimento 
   * @param location Lugar de procedencia a asignar
   */
  setLocation(location: string): void {
    this.location = location;
  }

  /**
   * Método que asigna la composición nutricional a un alimento 
   * @param nutrients Composición nutricional a asignar
   */
  setMacroNutrients(nutrients: macroNutrients): void {
    this.macroNutrients = nutrients;
  }

  /**
   * Método que asigna el precio a un alimento 
   * @param price Precio a asignar 
   */
  setPrice(price: number): void {
    this.price = price;
  }

  /**
   * Método abstracto que devolverá el grupo de alimento al que pertenece 
   */
  abstract getFoodGroup(): foodGroup;
}
```

En esta clase contamos con un constructor al que le pasamos por parámetro cuatro atributos protegidos en el siguiente orden:

name (nombre): una cadena con el nombre de la comida.
location (localización): una cadena con la localización de origen.
macroNutrients (macronutrientes): contiene un tipo definido por la estructura de datos `type` que dispone de tres propiedades de tipo numérico: carboHydrates (carbohidratos), proteins (proteinas) y lipids (lípidos). Que corresponda a la composición nutricional del alimento con respecto a los macronutrientes y kcal por 100 gr de dicho alimento.
price (precio): un tipo numérico con el precio de la comida.

Cada uno de ellos dispone de un getter y setter correspondiente y además un método abstracto llamado `getFoodGroup()` que devuelve un tipo `foodGroup`, que trata de otra estructura `type` que contiene el grupo de alimentos al que pertenece cada alimento. El contenido del type está separado por o’s `|` y contiene cada grupo de alimentos que corresponderá a cada clase hija que debemos crear, es decir que cada clase hija será un grupo de alimentos establecido que son: cereals (cereales), dairy(lácteos), fruits (frutas), proteins (proteínas) y vegetables (vegetales). Por último, tenemos otro ´type´ llamado `FoodType` que corresponde a la estructura de la clase `Food`, además de contener el type del grupo de alimento al que pertenece.

**Clase Cereals**

```ts
import {Food, foodGroup, macroNutrients} from "./food";

/**
 * La clase Cereals permite crear un objeto que represente
 * aquellos alimentos que esten compuestos de cereales.
 */
export class Cereals extends Food {
  /**
    * Constructor de la clase:
    * @param name nombre del alimento
    * @param origin localización origen del alimento
    * @param macroNutrients información nutricional del alimento
    * @param price precio del alimento por kilo
    * @param type grupo de alimento al que pertenece
  */
  constructor(name: string, origin: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, origin, macroNutrients, price);
  }

  /**
   * Método que devolverá el grupo de alimento al que pertenece
   * @returns devolverá el grupo Cereals
   */
  getFoodGroup(): foodGroup {
    return this.type;
  }
}
```

**Clase Dairy**

```ts
import {Food, foodGroup, macroNutrients} from "./food";

/**
 * La clase Dairy permite crear un objeto que represente
 * aquellos alimentos que pertenezcan a los lácteos.
 */
export class Dairy extends Food {
  /**
    * Constructor de la clase:
    * @param name nombre del alimento
    * @param origin localización origen del alimento
    * @param macroNutrients información nutricional del alimento
    * @param price precio del alimento por kilo
    * @param type grupo de alimento al que pertenece
  */
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  /**
   * Método que devolverá el grupo de alimento al que pertenece
   * @returns devolverá el grupo Dairy
   */
  getFoodGroup(): foodGroup {
    return this.type;
  }
}
```

**Clase Fruits**

```ts
import {Food, foodGroup, macroNutrients} from './food';

/**
 * La clase Fruits permite crear un objeto que represente
 * aquellos alimentos pertenecientes a las frutas.
 */
export class Fruits extends Food {
  /**
    * Constructor de la clase:
    * @param name nombre del alimento
    * @param origin localización origen del alimento
    * @param macroNutrients información nutricional del alimento
    * @param price precio del alimento por kilo
    * @param type grupo de alimento al que pertenece
  */
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  /**
   * Método que devolverá el grupo de alimento al que pertenece
   * @returns devolverá el grupo Fruits
   */
  getFoodGroup(): foodGroup {
    return this.type;
  }
}
```

**Clase Proteins**

```ts
import {Food, foodGroup, macroNutrients} from "./food";

/**
 * La clase Proteins permite crear un objeto que represente
 * aquellos alimentos con alto contenido en proteinas.
 */
export class Proteins extends Food {
  /**
  * Constructor de la clase:
  * @param name nombre del alimento
  * @param origin localización origen del alimento
  * @param macroNutrients información nutricional del alimento
  * @param price precio del alimento por kilo
  * @param type grupo de alimento al que pertenece
  */
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, private type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  /**
   * Método que devolverá el grupo de alimento al que pertenece
   * @returns devolverá el grupo Proteins
   */
  getFoodGroup(): foodGroup {
    return this.type;
  }
}
```

**Clase Vegetables**

```ts
import {Food, foodGroup, macroNutrients} from "./food";

/**
 * La clase Vegetables permite crear un objeto que represente
 * aquellos alimentos que pertenezcan a los vegetales.
 */
export class Vegetables extends Food {
  /**
    * Constructor de la clase:
    * @param name nombre del alimento
    * @param origin localización origen del alimento
    * @param macroNutrients información nutricional del alimento
    * @param price precio del alimento por kilo
    * @param type grupo de alimento al que pertenece
  */
  constructor(name: string, location: string, macroNutrients: macroNutrients,
      price: number, protected type: foodGroup) {
    super(name, location, macroNutrients, price);
  }

  /**
   * Método que devolverá el grupo de alimento al que pertenece
   * @returns devolverá el grupo Vegetables
   */
  getFoodGroup(): foodGroup {
    return this.type;
  }
}
```

Cada clase hija, es decir, cada grupo de alimentos hereda de la clase abstracta. Como constructor de cada clase, contienen los atributos heredados a través del `super()`. Y como método solo tienen el personalizado para cada clase que hablé anteriormente: `getFoodGroup()`. Este devolverá del type especificado, el grupo de alimentos que será equivalente al nombre de la clase.

### Platos

Los platos de un menú estarán compuestos por alimentos y/o ingredientes como los definidos anteriormente. Además, deberá considerar que un plato puede pertenecer a cuatro categorías distintas: entrante, primer plato, segundo plato y postre. Asimismo, para cada plato dentro del sistema se debería poder acceder a la siguiente información:

1. Lista de alimentos y/o ingredientes que lo componen.
2. Composición nutricional del plato. Esto es, la suma de la composición nutricional de los alimentos que componen el plato. Hay que tener en cuenta que los valores nutricionales se definen por 100 gr de ingrediente, pero no siempre se usan 100 gr de cada ingrediente para elaborar un plato.
3. Grupo de alimento predominante. Este atributo deberá definir el grupo de alimento que más aparece entre los ingredientes del plato (véase la lista de en el apartado Alimentos).
4. Precio total del plato en euros en función de la suma de los precios de los ingredientes y sus cantidades que lo componen.

**Solución:**

Para ello hemos creado una clase abstracta llamada Plate, de la cual heredan las clases que representan el plato entrante, primer plato, segundo plato y postre.

**Clase abstracta Plate**

```ts
import {Food, macroNutrients, foodGroup} from "../food/food";

/**
 * Tipo de dato definido para definir el tipo de plato.
 * Puede ser entrante (starter), primer plato (first),
 * second (segundo plato) y postre (dessert)
 */
export type plateCategory = 'Starter' | 'First' | 'Second' | 'Dessert';

/**
 * Tipo de dato definido para representar los alimentos
 * y sus cantidades en un plato. Se ha definido como una tupla
 * que recibe el alimento y la cantidad del mismo.
 */
export type foodInPlates = [Food, number];

/**
 * Tipo de dato que define la informacion de un plato.
 * @param name contiene el nombre del plato
 * @param macroNutrients macronutrientes del plato
 * @param price precio del plato
 * @param food array de alimentos que conforman el plato
 * @param amount array de cantidades de los alimentos
 * @param type tipo de plato (entrante, primero, segundo, postre)
 */
export type PlateType = {
  name: string;
  macroNutrients: macroNutrients;
  groupFood: foodGroup;
  price: number;
  food: string[];
  amount: number[];
  type: plateCategory;
}

/**
 * La clase abstracta Plate permitirá definir platos en los que se podrán
 * añadir alimentos. Las clases que hereden de ésta podrán diferenciarse gracias al
 * tipo de plato.
 * @param macroNutrients macronutrientes del plato
 * @param groupFood grupo de alimentos predominante en el plato
 * @param price precio del plato
 * @param food alimentos del plato junto con la cantidad usada de cada alimento.
 */
export abstract class Plate {
  protected macroNutrients: macroNutrients;
  protected groupFood: foodGroup;
  protected price: number;
  protected food: Map<Food, number>;

  /**
   * Constructor de la clase abstracta plate, permitirá crear un plato.
   * @param name nombre del plato
   * @param food alimentos que conforman el plato junto a sus cantidades.
   */
  constructor(protected name: string, food: foodInPlates[]) {
    this.food = new Map<Food, number>();
    food.forEach((element) => this.addFoodInPlates(element[0], element[1]));
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  /**
   * Método que permite agregar alimentos al plato
   * @param food alimento a añadir
   * @param amount cantidad del alimento a añadir
   */
  addFoodInPlates(food: Food, amount: number) {
    this.food.set(food, amount);
  }

  /**
   * Método que registrará la información nutricional del plato
   * @returns macronutrientes del plato.
   */
  private nutritionalComposition(): macroNutrients {
    const result: macroNutrients = {
      carboHydrates: 0,
      proteins: 0,
      lipids: 0,
    };

    this.food.forEach((value: number, keys: Food) => {
      result.carboHydrates += (keys.macroNutrients.carboHydrates / 100) * value;
      result.proteins += (keys.macroNutrients.proteins / 100) * value;
      result.lipids += (keys.macroNutrients.lipids / 100) * value;
    });

    return result;
  }

  /**
   * Método que devuelve el grupo de alimentos
   * predominante en el plato. En caso de que no haya
   * ninguno que predomine, se eligirá el grupo de alimento
   * del primer elemento del array de alimentos.
   * @returns grupo de alimentos predominante en el plato.
   */
  private predominantGroupFood(): foodGroup {
    const counter = new Map<foodGroup, number>();
    let group: foodGroup;

    [...this.food.keys()].forEach((element) => {
      group = element.getFoodGroup();
      if (counter.has(group)) {
        counter.set(group, Number(counter.get(group)) + 1);
      } else {
        counter.set(group, 0);
      }
    });

    let max: number = [...counter.values()][0];
    let maxGroup: foodGroup = [...counter.keys()][0];
    counter.forEach(function(amount: number, group: foodGroup) {
      if (amount > max) {
        max = amount;
        maxGroup = group;
      }
    });

    return maxGroup;
  }

  /**
   * Método que se encargará de calcular el precio del plato.
   * Lo calculará en base a la cantidad del alimento y al precio
   * por kilo de cada uno.
   * @returns el precio total del plato.
   */
  private calculatePrice(): number {
    let result: number = 0;
    this.food.forEach(function(value: number, keys: Food) {
      result += (keys.getPrice() / 1000) * value;
    });
    return result;
  }

  /**
   * Método que permitirá añadir más alimentos al plato
   * @param foodToAdd alimento a añadir
   * @param amount cantidad del alimento a añadir
   */
  addFood(foodToAdd: Food, amount: number): void {
    this.food.set(foodToAdd, amount);
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  /**
   * Método que eliminará alimentos del plato.
   * @param foodToDelete alimento a eliminar
   */
  deleteFood(foodToDelete: Food): void {
    this.food.delete(foodToDelete);
    this.macroNutrients = this.nutritionalComposition();
    this.groupFood = this.predominantGroupFood();
    this.price = this.calculatePrice();
  }

  /**
   * Método getter que devuelve el nombre del plato
   * @returns nombre del plato
   */
  getName(): string {
    return this.name;
  }

  /**
   * Método getter que devuelve las cantidades de los alimentos.
   * @returns cantidades de los alimentos del plato.
   */
  getNumber(): number[] {
    return [...this.food.values()];
  }

  /**
   * Método getter que devuelve los alimentos del plato.
   * @returns alimentos que conforman el plato.
   */
  getFood(): Food[] {
    return [...this.food.keys()];
  }

  /**
   * Método getter que devuelve el precio del plato
   * @returns precio total del plato
   */
  getPrice(): number {
    return this.price;
  }

  /**
   * Método getter que devuelve los macronutrientes del plato.
   * @returns la información nutricional del plato.
   */
  getNutritionalComposition(): macroNutrients {
    return this.macroNutrients;
  }

  /**
   * Método getter que devolverá el grupo de alimentos predominante
   * @returns el grupo de alimentos que predomine en el plato.
   */
  getPredominantGroupFood(): foodGroup {
    return this.groupFood;
  }

  /**
   * Método que permitirá imprimir la información del plato.
   * @returns devuelve un string con la información del plato.
   */
  printPlate() {
    let result: string = this.name +'\n';
    result += ' - Price: ' + this.price + '\n';
    result += ' - Ingredients: \n';
    this.food.forEach(function(value: number, keys: Food) {
      result += '   * ' + keys.getName() + '\n';
    });
    result += ' - Nutritional composition: ' +
    '\n   * Carbohydrates: ' + this.macroNutrients.carboHydrates +
    '\n   * Lipids: ' + this.macroNutrients.lipids +
    '\n   * Proteins: ' + this.macroNutrients.proteins + '\n';
    result +=' - Predominant food group: ' + this.getPredominantGroupFood()+'\n';

    return result;
  }

  /**
 * Método abstracto que permitirá a las clases que hereden diferenciarse entre sí
 * por categorías : Starter, First, Second y Dessert.
 */
  abstract getPlateCategory(): plateCategory;
}
```

En esta clase abstracta contamos con un constructor al que le pasamos por parámetro dos atributos protegidos en el siguiente orden:

name (nombre): Una cadena con el nombre del plato.
food (alimentos): contiene un tipo definido por la estructura de datos `type` que representa una tupla con el alimento que conformará el plato de tipo clase Food y su respectiva cantidad en gramos de tipo numérico.

Además la clase dispone de una serie de atributos externos que utilizaremos para poder obtener la información de los platos:
	
macronutrients: contiene el tipo de dato `macroNutrients` y almacena los macronutrientes del plato.
groupFood: atributo de tipo `foodGroup` que almacena el grupo de alimentos predominante en el plato.
price: atributo de tipo `number` que almacena el precio del plato.
food: un `map` que almacena el alimento y su correspondiente cantidad en gramos.

La clase cuenta con un constructor en el que se inicializa el map `food` nombrado anteriormente y se realiza un `forEach()` donde, a través de la función pública `addFoodInPlates()`, se va añadiendo al map la comida que está puesta en el array de tipo `foodInPlates` que se le pasa a la propia clase `Plate`.

También se inicializan los atributos anteriores haciendo llamadas a los métodos privados: `nutritionalComposition()` para el atributo macronutrients, `predominantGroupFood()` para el atributo groupFood y `calculatePrice()` para el atributo price. El método `nutritionalComposition()` se encargará de obtener el cómputo total de carbohidratos, proteínas y lípidos a partir de los alimentos que conforman el plato con ciertos cálculos de valores. El siguiente método `predominantGroupFood()`, se encargará de escoger el alimento del grupo predominante en función de los alimentos que existen en el plato. En caso de que no haya un grupo predominante, esta función devolverá el grupo del primer alimento. El método `CalculatePrice()` devolverá el precio del plato. Para ello calculará en función del peso por kilo de cada alimento, cual es el precio equivalente en función de la cantidad de ese alimento usado en el plato, sumará los resultados de cada alimento y devolverá el resultado de la suma como el precio final del plato.

Por otro lado, tenemos el método `addFood()`. A este método se les pasa por parámetro, un alimento de tipo clase `Food` y un número con la cantidad en gramos de dicho alimento llamado `amount`, y añade dicho alimento al map correspondiente de la clase y llama a los métodos privados para colocar los valores de sus atributos. Para el método `deleteFood()`, se haría lo mismo pero no es necesario pasarle el `amount` por parámetro. Además tenemos el método `printPlate()`, que imprime la información del objeto plato instanciado.

Además la clase cuenta con diversos getters de los atributos nombrados. La clase incluye un método (getter) abstracto getPlateCategory() que utilizarán las clases que la hereden para especificar su categoría ya sea: plato entrante, primer plato, segundo plato o postre. Por último, tenemos otro ´type´ llamado `PlateType` que corresponde a la estructura de la clase `Plate`, además de contener el type de la categoría a la que pertenece el plato.

**Clase StarterPlate**

```ts
import {Plate, plateCategory, foodInPlates} from "./plate";

/**
 * Subclase que extiende de la clase padre plate que permite crear un objeto 
 * que represente aquellos platos reconocidos como entrantes
 */
export class StarterPlate extends Plate {
  /**
   * Constructor de la clase:
   * @param name Nombre del plato
   * @param food Alimentos que componen el plato
   * @param type Tipo de plato al que pertenece (Starter)
   */
  constructor(name: string, food: foodInPlates[], protected type: plateCategory) {
    super(name, food);
  }

  /**
   * Método que devuelve el tipo al que pertenece el plato
   * @returns Tipo al que pertenece el plato
   */
  getPlateCategory(): plateCategory {
    return this.type;
  }
}
```

**Clase FirstPlate**

```ts
import {Plate, plateCategory, foodInPlates} from "./plate";

/**
 * Subclase que extiende de la clase padre plate que permite crear un objeto 
 * que represente aquellos platos reconocidos como primer plato
 */
export class FirstPlate extends Plate {
  /**
   * Constructor de la clase: 
   * @param name Nombre del plato 
   * @param food Alimentos que componen el plato
   * @param type Tipo de plato al que pertenece (First)
   */
  constructor(name: string, food: foodInPlates[], protected type: plateCategory) {
    super(name, food);
  }

  /**
   * Método que devuelve el tipo al que pertenece el plato
   * @returns Tipo al que pertenece el plato
   */
  getPlateCategory(): plateCategory {
    return this.type;
  }
}
```

**Clase SecondPlate**

```ts
import {Plate, plateCategory, foodInPlates} from "./plate";

/**
 * Subclase que extiende de la clase padre plate que permite crear un objeto 
 * que represente aquellos platos reconocidos como segundo plato
 */
export class SecondPlate extends Plate {
  /**
   * Constructor de la clase: 
   * @param name Nombre del plato 
   * @param food Alimentos que componen el plato
   * @param type Tipo de plato al que pertenece (Second)
   */
  constructor(name: string, food: foodInPlates[], protected type: plateCategory) {
    super(name, food);
  }

   /**
   * Método que devuelve el tipo al que pertenece el plato
   * @returns Tipo al que pertenece el plato
   */
  getPlateCategory(): plateCategory {
    return this.type;
  }
}
```

**ClaseDessertPlate**

```ts
import {Plate, plateCategory, foodInPlates} from "./plate";

/**
 * Subclase que extiende de la clase padre plate que permite crear un objeto 
 * que represente aquellos platos reconocidos como postre
 */
export class DessertPlate extends Plate {
  /**
   * Constructor de la clase:
   * @param name Nombre del plato
   * @param food Alimentos que componen el plato
   * @param type Tipo de plato al que pertenece (Dessert)
   */
  constructor(name: string, food: foodInPlates[], protected type: plateCategory) {
    super(name, food);
  }

  /**
   * Método que devuelve el tipo al que pertenece el plato
   * @returns Tipo al que pertenece el plato
   */
  getPlateCategory(): plateCategory {
    return this.type;
  }
}
```

Estas clases heredan de la clase `Plate` explicada anteriormente donde heredan dichos atributos de la clase padre y especifican de manera personalizada para cada clase, el método `getPlateCategory()` correspondiente. Este devuelve la categoría de cada plato.

### Menús

Un menú estará compuesto por platos, incluyendo un plato de cada categoría o, al menos, tres de ellas. Para cada menú, se debe poder consultar la siguiente información:

Precio total del menú en euros.
Platos que lo componen con sus correspondientes alimentos y/o ingredientes.
Composición nutricional del menú de acuerdo a lo definido en el punto 2 de la sección Alimentos.
Listado de grupos de alimentos por orden de aparición.

**Solución:**

Para ello hemos creado la siguiente clase `Menu`.

**Clase Menu**

```ts
import {macroNutrients, foodGroup} from './food/food';
import {Plate, plateCategory, PlateType} from './plate/plate';

/**
 * Tipo de dato que define la informacion de un menu.
 * @param name contiene el nombre del menu.
 * @param macroNutrients macronutrientes del menu.
 * @param plates platos que conforman el menu.
 * @param price precio del menu.
 */
export type MenuType = {
  name: string;
  macroNutrients: macroNutrients;
  plates: PlateType[];
  price: number;
}

/**
 * La clase Menu permitirá crear menús en los que se podrán
 * añadir platos.
 * @param macroNutrients macronutrientes totales del menu
 * @param price precio total del menu
 */
export class Menu {
  private macroNutrients: macroNutrients;
  private price : number;

  /**
 * Constructor de la clase, permitirá crear un objeto menú.
 * @param name nombre del menú
 * @param plates array de platos que conformarán el menú.
 */
  constructor(private name : string, private plates: Plate[]) {
    if (!this.validate()) {
      throw new Error('ERROR');
    }
    this.price = this.calculatePrice();
    this.macroNutrients = this.nutritionalComposition();
  }

  /**
 * Método que comprobará si el menú está compuesto por al menos
 * tres platos o al menos esta compuesto por un plato de cada categoría
 * (starter, first, second y dessert).
 * @returns si es valido o no
 */
  validate(): boolean {
    if (this.plates.length < 3) return false;

    let group: plateCategory[] = [];
    this.plates.forEach(function(element) {
      group.push(element.getPlateCategory());
    });

    group = group.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    if (group.length < 3) return false;

    return true;
  }

  /**
 * Calculará el precio del menún en función del precio de cada plato
 * @returns precio total del menú
 */
  private calculatePrice(): number {
    let result: number = 0;
    this.plates.forEach(function(element: Plate) {
      result += element.getPrice();
    });
    return result;
  }

  /**
   * Método que devolverá la información nutricional del menú
   * @returns los valores macronutrientes del menú
   */
  private nutritionalComposition(): macroNutrients {
    const result: macroNutrients = {
      carboHydrates: 0,
      proteins: 0,
      lipids: 0,
    };

    this.plates.forEach(function(element: Plate) {
      result.carboHydrates += element.getNutritionalComposition().carboHydrates;
      result.proteins += element.getNutritionalComposition().proteins;
      result.lipids += element.getNutritionalComposition().lipids;
    });

    return result;
  }

  /**
   * Método que permitirá añadir un plato al menú.
   * @param plate plato a añadir.
   */
  addPlate(plate: Plate): void {
    this.plates.push(plate);
    this.price = this.calculatePrice();
    this.macroNutrients = this.nutritionalComposition();
  }

  /**
   * Método que permitirá eliminar un plato o más al menú.
   * @param plate plato/s a eliminar.
   */
  deletePlate(platesToDelete: string[]) {
    let pos: number = 0;
    this.plates.forEach((element) => {
      platesToDelete.forEach((item) => {
        if (element.getName() === item) {
          pos = this.plates.indexOf(element);
          this.plates.splice(pos, 1);
        }
      });
    });
  }

  /**
   * Método que permitirá mostrar la información del menú.
   * mostrando los platos que lo contiene así como la
   * información nutricional del menú.
   */
  printMenu() {
    let result: string = 'Menu: ' + this.name +'\n ';
    result += 'Price: ' + this.price + '\n Plates: \n';
    this.plates.forEach(function(element) {
      result += ' - ' + element.getName() + '\n';
    });
    result += 'Nutritional composition: ' +
    '\n - Carbohydrates: ' + this.macroNutrients.carboHydrates +
    '\n - Lipids: ' + this.macroNutrients.lipids +
    '\n - Proteins: ' + this.macroNutrients.proteins + '\n';

    console.log(result);
  }

  /**
   * Método getter que devuelve el nombre del menu
   * @returns nombre del menu
   */
  getName(): string {
    return this.name;
  }

  /**
   * Método getter que devuelve el precio del menu
   * @returns precio del menu
   */
  getPrice(): number {
    return this.price;
  }

  /**
   * Método getter que devuelve los platos disponibles en el menu
   * @returns Conjunto de platos disponibles en el menu
   */
  getPlates(): Plate[] {
    return this.plates;
  }

  /**
   * Método getter que devuelve la composición nutricional del menu
   * @returns Composición nutricional del manu
   */
  getNutritionalComposition(): macroNutrients {
    return this.macroNutrients;
  }

  /**
   * Método getter que devuelve el grupo de alimento predominante de cada plato del menu
   * @returns Array con el grupo de alimento predominante de cada plato
   */
  getFoodList(): foodGroup[] {
    const result: foodGroup[] = [];

    this.plates.forEach(function(element: Plate) {
      result.push(element.getPredominantGroupFood());
    });

    return result;
  }
}
```

En esta clase contamos con un constructor al que le pasamos por parámetro dos atributos privados en el siguiente orden:

name (nombre): una cadena con el nombre del menú.
plates[ ](platos): Array de tipo clase `Plate` que conformarán el menú.

La clase contará con una serie de métodos que la dotarán con diversas funcionalidades. El método público `validate()` comprobará que el menú está compuesto por al menos tres platos contiene, de esta forma nos aseguramos que habrá un plato de cada categoría. El método privado `calculatePrice()` devolverá el precio del menú que será la suma del precio de cada plato que lo conforman. El método privado `nutritionalComposition()` devolverá la información nutricional del menú, esto es la cantidad total de carbohidratos, lípidos y proteínas que contiene calculandolo con la suma de todos los macronutrientes de los platos. El método público `addPlate()` permite añadir un plato nuevo al menú. A continuación dispone de una serie de getters que permitirán obtener los valores que se le han añadido en el constructor a los atributos. Además tenemos el método `printMenu()`, que imprime la información del objeto Menú instanciado. Por último, tenemos otro ´type´ llamado `MenuType` que corresponde a la estructura de la clase `Menu`.

### Carta

Supongamos que el sistema que estamos diseñando se empleará en un restaurante. Dicho restaurante dispone de una carta con una serie de menús prediseñados por la administración del local. Además, en la carta se incluyen platos individuales para que los comensales diseñen sus propios menús para comer. Los menús a diseñar por los clientes pueden tener todos los platos que deseen ya que, por ejemplo, un grupo de personas podría decidir pedir varios platos para compartir o pedirlos individualmente.

**Solución:**

A continuación, tenemos la clase `Carte`.

**Clase Carte**

```ts
import {Plate, PlateType} from './plate/plate';
import {Menu, MenuType} from './menu';

/**
 * Tipo de dato que define la informacion de una carta
 * @param name contiene el nombre de la carta
 * @param menu array de menús que conforman la carta
 * @param plates array de platos que conforman la carta
 */
export type CarteType = {
  name: string;
  menu: MenuType[];
  plates: PlateType[];
}

/**
 * La clase Carta permitirá crear cartas en las que se podrán añadir menús y platos.
 */
export class Carte {
  /**
   * Constructor de la clase:
   * @param name Nombre de la carta 
   * @param menus Conjunto de menus disponibles en la carta
   * @param plates Conjunto de platos disponibles en la carta que no pertenecen a un menu
   */
  constructor(private name: string, private menus: Menu[],
    private plates: Plate[]) {}

  /**
   * Método que retorna el nombre de la carta
   * @returns Nombre de la carta 
   */
  getName(): string {
    return this.name;
  }

  /**
   * Método que retorna el conjunto de menus disponibles en la carta 
   * @returns Array con los menus disponibles
   */
  getMenus(): Menu[] {
    return this.menus;
  }

  /**
   * Método que retorna el conjunto de platos disponibles en la carta
   * @returns Array con los platos disponibles 
   */
  getPlates(): Plate[] {
    return this.plates;
  }
}
```

Esta clase permite crear cartas en las que se podrán añadir menús y platos. Para ello, en su constructor le pasamos por parámetro 3 atributos privados en el siguiente orden:

name (nombre): una cadena con el nombre de la carta.
menus[ ] (menus): Array de tipo clase `Menú` que conformarán la carta.
plates[ ] (platos): Array de tipo clase `Plate` que estarán disponibles en la carta.

La clase cuenta con los getters correspondientes a los atributos nombrados anteriormente. Y por último, contiene un `type` que corresponde a los atributos de la clase `Carte`.

### Funcionamiento

**Primera Parte**

Para comprobar el funcionamiento de su diseño deberá crear:

Al menos 50 alimentos y/o ingredientes distintos para cocinar platos. Puede ayudarse del siguiente recurso para cumplimentar esta información.
Entre 5 y 10 platos por cada categoría (entrante, primer plato, etc).
Un mínimo de 5 menús distintos con los platos creados anteriormente.
Una carta conformada por los diferentes menús diseñados.

En este punto, deberá hacer uso del módulo Inquirer.js para la gestión de una línea de comandos interactiva. De este modo, su aplicación deberá permitir añadir, borrar y modificar ingredientes, platos, menús y cartas. Para ello, le recomendamos que lea el Capítulo 1 del libro Essential TypeScript: From Beginner to Pro, dado que se describe un ejemplo detallado de su uso, incluyendo cómo podría hacer para que toda la información introducida persista mediante el uso del paquete Lowdb.

**Solución:**

Para ello creamos en primer lugar, la clase `Collection`. 

**Clase Collection**

```ts
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
```

Esta clase colecciona las distintas funcionalidades a realizar de los distintos objetos, como es, añadir, modificar o borrar. En el constructor, tiene 4 atributos externos que se inicializan para crear un map: `foods`, `plates`, `menus` y `cartes`. Tienen como clave una cadena y como valor, el tipo clase perteneciente a la que sea.

Como métodos públicos, tenemos `addFood()`, donde le pasamos por parámetro el objeto`Food` que queremos añadir al map. Para ello, utilizamos la función `set` del map, donde especificamos como clave el nombre del objeto y como valor, el objeto. 

Seguidamente, tenemos el método `addPlate()` donde le pasamos por parámetro el nombre del plato, una tupla de tamaño 2 que tiene una cadena y un número, en representación al nombre del alimento y la cantidad de alimentos y por último, la categoría del plato. Dentro de esta función tenemos que realizar que en caso de que el nombre del plato no esté como clave dentro del map, debemos hacer una tupla de tipo `foodInPlates` y recorrer el array de arrays de la tupla pasada por parámetro, escogiendo el primer elemento cadena que corresponde al nombre del alimento y colocando como clave en `foods` dicha cadena, y como valor, la cantidad de alimentos en el plato. Para luego, en el switch crear la instancia del objeto plato dependiendo de la categoría de dicho plato donde le pasaremos la tupla de alimentos almacenada. Finalmente, guardamos con el `set()` en el map `plates`, el nombre del plato como clave y el objeto plato instanciado.

Para realizar el `addMenu()`, le debemos pasar por parámetro el nombre del menú y un array con los nombres de los platos. Luego, hacemos un `forEach()` donde recorremos el array de `platesName` que corresponde a los nombres de los platos y vamos colocando en `plates` que es un array de tipo clase `Plates` a través del `push()`, cada elemento del map de tipo `Plate`, que con la función `get()` tenga como clave, el mismo nombre que el iterado en `platesName`. Una vez hecho esto, creamos el objeto Menú donde le pasamos los correspondientes platos y lo guardamos en nuestro map de colección de `menus`.

Para el `addCarta()`, le pasamos el nombre de la carta, el array con el listado de menús que corresponden a los nombres del menú y el array con el listado de nombres de platos. Para escoger por nombre de menús y nombre de platos, aquellos objetos menús y platos, hacemos los mismo que en el `addMenu()`, recorremos los array de listados por nombres, y guardamos en un nuevo array los objetos correspondientes donde a través del `get` del map, escogemos el objeto que tenga como clave, el mismo nombre que el iterado. Luego creamos el objeto `Carte` y lo metemos en el map de la clase cartes.

Para los métodos deleteFood(), deletePlate(), deleteMenu() y deleteCarta(), les pasamos por parámetro el nombre del objeto correspondiente, y con el `delete()` borramos dicho objeto del map que la clave, que corresponde a los nombres de los objetos, sea igual al nombre pasado por parámetro.

Por último, tenemos los métodos getters. En el getPlateMap() y getMenuMap(), devolvemos el propio map de objeto y en los métodos, getFoods(), getPlates(), getMenus() y getCartas(), pasamos el map correspondiente a array. Estos últimos los utilizaremos para trabajar con arrays de objetos en las siguientes clases.

**Clase JsonDatabase**

```ts
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
```

A continuación, tenemos la clase JsonDatabase donde hacemos uso del inquirer y es hija de la clase `Collection`, que es donde están almacenados los distintos objetos y los distintos métodos básicos con los que operamos. En primer lugar, tenemos un `type` que define las estructuras de datos de los distintos tipos de objetos de nuestra base de datos. Para ello, recogemos todos aquellos `type` que habíamos especificado en cada clase en representación a la estructura de atributos que tienen. En primer lugar, tengo como atributo el `database` que, a través del paquete lowdb, hacemos una llamada al lowdbSync, que establece una base de datos con la estructura establecida en `databaseType`. Una vez hecho esto, dentro del constructor establecemos la ruta donde queremos que genere la información de la base de datos. Además, tenemos también las distintas llamadas de carga de datos de los distintos objetos de nuestra base de datos, que explicaré a continuación.

En primer lugar, tenemos el `loadFood()` que permite recargar los objetos de tipo `Food` donde decimos que si la base de datos tiene el valor `foods`, pues cogemos con el `get()` los valores de `foods` y recorremos con el `forEach()` dichos valores, y vamos creando los objetos instanciados con los valores de la estructura, dependiendo del grupo de alimentos que sean. Una vez hecho esto, llamamos al método del padre, `addFood()` y le pasamos dicho objetos para añadir a nuestro map de alimentos. En caso de que no tenga el valor `foods`, simplemente lo crea vacío.

Luego, tenemos el `loadPlate()`, donde realizamos el mismo procedimiento, pero al recorrer las estructuras de platos, también recorremos con el `forEach()`, la estructura de datos de los alimentos de cada plato recorrido y vamos metiendo dichos alimentos en un array al igual que su cantidad en gramos. Una vez hacemos esto, creamos la instancia del objeto dependiendo de la categoría de plato, teniendo en cuenta la estructura de datos de los alimentos que contenga cada plato. Finalmente, almacenamos dicho objeto en el map correspondiente de la clase collection.

En el `loadMenu()`, también realizamos el mismo procedimiento pero recorremos con el `forEach()` la estructura de datos de platos. Luego, se realiza una instancia del menú donde le pasamos el array de los objetos de la clase `Plate`.

Por último, tenemos la carga de datos `loadCartas()` donde recorremos por un lado, la estructura de datos de menú y por otro lado, la estructura de datos de platos. Finalmente, instanciamos el objetos con los distintos arrays que contienen dichos objetos. 

También tenemos los métodos: addFood(), addPlate(), addMenu() y addCarta(). En estos métodos llamamos a los métodos padres correspondientes para añadir dichos objetos independientes. Es por ello, que los parámetros de las funciones de añadir serán igual que los parámetros de la funciones de añadir del padre. Y finalmente, lo que hacemos es realizar un `store()` para actualizar la base de datos.

Por otro lado, tenemos los métodos: deleteFoodJson(), deletePlateJson(), deleteMenuJson() y deleteCartaJson(). En estos métodos, lo que hacemos es pasar por parámetro un array de cadenas y a través de un `forEach()`, recorremos los nombres de dichos objetos y vamos borrando con la llamada a las funciones de borrado de la clase padre. Finalmente, actualizamos la base de datos con el `store()`.

También tenemos los métodos: toPlateType(), toMenuType() y toCartaType() que permiten pasar de un array de objetos a un array que contenga la estructura de datos correspondiente de ese objeto. Para ello, simplemente recorremos con un `forEach()` el array de objetos y llenamos las estructuras con las llamadas a los getters.

Finalmente, tenemos el método privado `store()` que permite pasar por parámetro el tipo de objeto en cadena y a través del `switch()`, actualiza la base de datos de la estructura correspondiente a través del `write()`.

### Clase App

La clase App permite eliminar y añadir ingredientes, platos, menús y cartas para lo que se emplea el módulo Inquirer.js. Además, para conseguir que toda la información introducida persiste se emplea el paquete Lowdb.

En primer lugar, el atributo **collection** es un objeto de la clase JsonDatabase. El método más relevante es `mainPrompt()` donde se emplea Inquirer para mostrar una lista de opciones donde el usuario puede elegir que desea modificar en la base de datos, entre las opciones están **food**, **plate**, **menu** y **carte**. Por último, con `QUIT` es posible salir de la aplicación.

Una vez que el usuario ha seleccionado que modificar se llama al método `proccess` donde según el valor que tenga el parámetro **option**, se puede añadir o eliminar elementos, según la opción elegida se llama a un método que lleva a cabo esta operación.

En el `addFood()` primero se pregunta el nombre del ingrediente que se tiene que añadir, tras ello hay que indicar el grupo de alimentos al que pertenece, así como el resto de atributos que contienen los objetos alimentos (Food, Fruits, Cereals…).

Como se puede observar, esta pedida de datos se encuentra dentro de `inquirer.promp`, lo que hace este método es pedir datos gracias a la función `promp` de inquirer.
Se aprecia diferentes campos, a continuación vamos a explicarlos:

*  **type**: indica cómo se va a solicitar la pedida, se puede hacer de muchas formas, mediante `list`, que muestra una lista de opciones, `input`, que muestra un campo de texto a rellenar, `checkbox`, que es una lista que permite opciones múltiples….
* **name**: será el identificador de la respuesta que se ha generado.
* **message**: mensaje que aparecerá antes de elegir la respuesta (ej: instrucciones a seguir)
* **choices**: este campo sólo aparecerá si en el type se eligen campos como list o checkbox.

Una vez pedido los datos mediante `prompt`, con la función `then`, le pasamos `answers`, que contendrá todas las respuestas almacenadas en la función `prompt`. Podemos especificar una respuesta concreta gracias al identificador `name`, que explicamos anteriormente.

Ya dentro de `then`, asignamos los valores correspondientes según los valores introducidos por el usuario, y  añadimos el nuevo elemento generado a nuestra colección. Finalmente según lo que decida el usuario, se procederá a añadir otro ingrediente, o volverá al menú principal.

Para añadir platos creamos la función `addPlate()` para añadir platos y con la función `addPlateAux()` es donde seleccionamos los ingredientes, la cantidad y si se quiere introducir otros ingredientes más. 

También tenemos la función `addMenu()` que permite añadir los menús y `addCarte()` que permite añadir cartas.

Las funciones de borrado: `deleteFood()`, `deletePlate()`, `deleteMenu()` y `deleteCarte()` permiten elegir entre comida, platos, menús y cartas de la base de datos para eliminar lo que el usuarios haya elegido.

### Clase Comanda

Por último, deberá crear una clase Comanda que permita almacenar la comanda de un nuevo cliente de restaurante. Recuerde que la comanda de un cliente puede ser un menú predefinido o un menú personalizado con los platos que el cliente desee.

Para el funcionamiento de la clase Comanda, también necesitará hacer uso de `Inquirer.js`. En concreto, un cliente podrá:

Visualizar la carta del restaurante. Para cada menú y/o plato, el cliente querrá poder observar toda la información que tiene (precio, ingredientes, composición nutricional y grupos de alimentos).
Realizar una comanda. Un cliente podrá realizar una comanda a partir de un menú preestablecido o bien solicitando un menú personalizado. En caso de solicitar un menú personalizado, se deberá proporcionar la opción de visualizar la carta completa del restaurante, seleccionar cualquier plato del sistema y en la cantidad que el cliente considere oportuna (siempre de manera entera, no una ración y media por ejemplo). Por último, considere que un cliente puede solicitar un menú personalizado a partir de un menú existente. Por ejemplo, eliminando o añadiendo distintos platos al menú.

**Solución:**

```ts
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
```

Para ello, creamos la clase `Command` que contiene como atributos: `collection` de tipo JsonDatabase, `menus` de arrays de `Menu` y `plates` que corresponde a un array de tuplas que contiene el valor objeto `Plate` y un tipo numérico. Para `collection` creamos un objeto de la clase `JsonDatabase`.

Tenemos la función `mainMenu()` que a través del `inquirer.prompt()` especificamos lo que queremos realizar por consola con el `inquirer`. En este caso mostramos una lista para que el usuario escoja si visualizar la carta, pedir una comanda o mostrar la comanda.

En la función `showCommand()`, simplemente mostramos la información de los platos o menús escogidos.

En `visualize()`, mostramos la carta con los menús y platos individuales, para ello llamamos a las otras dos funciones que imprimen la información de los objetos que son: printMenu() y printPlate().

Luego en la función `makeOrder()`, hacemos la orden de comanda ya sea por un menú establecido dentro de nuestra carta o a través de un menú personalizable empezando de 0 o modificando ya uno hecho. Para ello, derivamos a las funciones `chooseStandardMenu()` como opción de menú preestablecido,  `choosePersonalizedMenu()` para escoger la opción para personalizar el menú de 0 que lo realiza la función `chooseMenuFromZero()`, o la opción para personalizar el menú a partir de uno realizado que lo realiza la función `chooseMenuFromOther()`.

Por último, tenemos las funciones importantes como `addPlatesInCommand()` y `deletePlatesInCommand()` que permiten hacer la comunicación con el usuario para añadir o eliminar platos durante el proceso.

### 5. Realización de pruebas (Spec)

**Clase food**

```ts
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
```

**Clase Plate**

```ts
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
```

**Clase Menu**

```ts
/**
 * Fichero de prueba para la clase Menu. En el se probarán los
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
// Menu
const menu = new Menu("menu1", [starter, first, second, dessert]);
try {
  const menufail = new Menu("menu2", [first, second]);
} catch (error) {
  console.log('');
}

try {
  const menufail2 = new Menu("menuF", [first, second, second]);
} catch (error) {
  console.log('');
}
const menutoadd = new Menu("menu3", [starter, first, second]);

describe('Tests for Menu', () => {
  it('menu.getName() returns menu1', () => {
    expect(menu.getName()).to.be.equal("menu1");
  });

  it('menu.validate returns true', () => {
    expect(menu.validate()).to.be.equal(true);
  });

  it('menugetPrice() returns 48', () => {
    expect(menu.getPrice()).to.be.equal(48);
  });

  it('menu.getPlates returns [starter, first, second, dessert]', () => {
    expect(menu.getPlates()).to.be.eql([starter, first, second, dessert]);
  });

  it('menu.getNutritionalComposition returns {carboHydrates: 2130, lipids: 850, proteins: 980}', () => {
    expect(menu.getNutritionalComposition()).to.be.eql({carboHydrates: 2130, lipids: 850, proteins: 980});
  });

  it('menugetPrice() returns ["Dairy", "Proteins", "Vegetables", "Fruits"]', () => {
    expect(menu.getFoodList()).to.be.eql(["Dairy", "Proteins", "Vegetables", "Fruits"]);
  });
});

menutoadd.addPlate(dessert);
describe('Test for addPlates and deletePlates from Menu', () => {
  it('menutoadd.getPlates returns [starter, first, second, dessert]', () => {
    expect(menutoadd.getPlates()).to.be.eql([starter, first, second, dessert]);
  });

  it('menutoadd.deletePlates returns [starter, first, second, dessert]', () => {
    menutoadd.deletePlate(["meat with vegetables and egg"]);
    expect(menutoadd.getPlates().length).to.be.equal(3);
  });
});

menutoadd.printMenu();
```

**Clase Carte**

```ts
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
```

**Clase Collection**

```ts
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
```

### 6. Conclusiones

En conclusión, esta práctica nos ha permitido utilizar distintas estructuras de datos que hemos visto en la asignatura y hemos adquirido nuevos conocimientos sobre `inquirer` para la realización de menús en consola, al igual que con `lowdb` que nos ha permitido acercanos más a las bases de datos y a la funcionalidad que representan.

En general, la carga de trabajo durante el desarrollo de este proyecto ha sido bastante elevada, aunque la división de tareas dentro del grupo facilitó bastante la organización a la hora de desarrollar el proyecto. A su vez, comparada con otras prácticas, esta ha sido mucho más compleja que sus predecesoras debido a la necesidad de aprender  nuevos conceptos nunca antes vistos por ningún integrante del grupo.

### 7. Bibliografía

- [Enunciado de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct07-menu-dataModel/)
- [Documentación Inquirer](https://www.npmjs.com/package/inquirer)
- [Documentación lowdb](https://www.npmjs.com/package/lowdb)
- [Información alimentos](https://drive.google.com/file/d/1B-jULJvgWmphWsZV1e3BG0fGL77jokSZ/view)

