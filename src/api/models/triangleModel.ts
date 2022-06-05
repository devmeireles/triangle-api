import { ETriangle, ITriangle } from '../../types/Triangle'

/**
 * Calculates the triangle are and returns the type of triangle
 * @param triangle as a {@link ITriangle}
 * @returns the quantity of equal sizes as {@link ETriangle}
 */
export const getTriangleType = (triangle: ITriangle): ETriangle => {
  let count: number = 0

  const shape = Object.values(triangle)

  shape.forEach((value: number, index: number, arr: Array<number>) => {
    const current = value
    const previous = arr[index - 1]
    const next = arr[index + 1]

    if (current === next || current === previous || previous === next) {
      count += 1
    }
  })

  switch (count) {
    case 0:
      return ETriangle.SCALENE
    case 2:
      return ETriangle.ISOSCELES
    case 3:
      return ETriangle.EQUILATERAL
    default:
      return ETriangle.ISOSCELES
  }
}
