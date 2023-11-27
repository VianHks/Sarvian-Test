/* eslint-disable linebreak-style */

/*
 * interface DetailProduct {
 *   idItem: number
 *   checked: boolean
 *   namaItem: string
 *   harga: number
 */

/*
 * }
 * interface ProductView {
 *     id: number
 *     kategori: string
 *     jenis: DetailProduct[]
 */

//   }
interface Nasi {
  id: number
  checked: boolean
  itemName: string
  price: number

}

interface Menu {
  id: number
  itemName: string
  price: number
  terjual: number

}
interface Ayam {
  id: number
  itemName: string
  price: number

}
interface Sambel {
  id: number
  itemName: string
  price: number

}

interface ProductViewsModel {

  //   ProductviewOutput?: ProductView[]
  nasiOutput?: Nasi[]
  ayamOutput?: Ayam[]
  sambelOutput?: Sambel[]
  menuOutput?: Menu[]
}

enum ProductViewsActionType {
  NasiLoad = 'nasi-load',
  NasiClear = 'nasi-clear',
  AyamLoad = 'ayam-load',
  AyamClear = 'ayam-clear',
  SambelLoad = 'sambel-load',
  SambelClear = 'sambel-clear',
  MenuLoad = 'menu-load',
  MenuClear = 'menu-clear'

}

type ProductViewsAction = {

  type: ProductViewsActionType.NasiLoad
  value?: ProductViewsModel

} | {
  type: ProductViewsActionType.AyamClear
} | {
  type: ProductViewsActionType.AyamLoad
  value?: ProductViewsModel
} | {
  type: ProductViewsActionType.MenuClear
} | {
  type: ProductViewsActionType.MenuLoad
  value?: ProductViewsModel

} | {
  type: ProductViewsActionType.NasiClear
} | {
  type: ProductViewsActionType.SambelClear
} | {
  type: ProductViewsActionType.SambelLoad
  value?: ProductViewsModel
};

export { ProductViewsActionType };
export type { ProductViewsModel, ProductViewsAction };
