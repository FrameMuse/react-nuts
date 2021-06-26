

import { PriceString } from '../../resources/interfaces/price'
import Price from './Price'

export class PriceRange implements PriceString {
  public from: number
  public to?: number
  public constructor(from: number, to?: number) {
    this.from = from
    this.to = to
  }
}

PriceRange.prototype.toString = function () {
  return Price.convertAndFormat(this.from) + (this.to ? " - " + Price.convertAndFormat(this.to) : " +")
}
