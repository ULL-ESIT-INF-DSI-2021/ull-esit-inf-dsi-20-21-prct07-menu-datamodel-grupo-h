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
