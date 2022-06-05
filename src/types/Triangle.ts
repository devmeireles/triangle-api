/* eslint-disable no-unused-vars */

/**
 * Generic triangle interface
 */
export interface ITriangle {
  sizeA: number;
  sizeB: number;
  sizeC: number;
}

/**
 * A friendly enum for {@link ITriangle} types
 */
export enum ETriangle {
  EQUILATERAL = 'equilateral',
  ISOSCELES = 'isosceles',
  SCALENE = 'scalene',
}
