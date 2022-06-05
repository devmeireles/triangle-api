import { ITriangle } from "../../src/types/Triangle";

/**
 * Generates an equilateral triangle
 */
export const getEquilateralTriangle = jest.fn((): ITriangle => (
    {
        sizeA: 3,
        sizeB: 3,
        sizeC: 3
    }
))

/**
 * Generates an isosceles triangle
 */
export const getIsoscelesTriangle = jest.fn((): ITriangle => (
    {
        sizeA: 1,
        sizeB: 1,
        sizeC: 2
    }
))

/**
 * Generates a scalene triangle
 */
export const getScaleneTriangle = jest.fn((): ITriangle => (
    {
        sizeA: 1,
        sizeB: 2,
        sizeC: 3
    }
))

/**
 * Generates a random triangle
 */
export const getRandomTriangle = jest.fn((): ITriangle => (
    {
        sizeA: Math.floor(Math.random() * 10) + 1,
        sizeB: Math.floor(Math.random() * 10) + 1,
        sizeC: Math.floor(Math.random() * 10) + 1
    }
))
