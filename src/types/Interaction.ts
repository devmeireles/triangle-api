import { ETriangle, ITriangle } from './Triangle'
import { IDefault } from './Default'

/**
 * Default Interaction kys
 */
export interface IInteraction extends IDefault {
  type: ETriangle;
  shape: ITriangle;
}
