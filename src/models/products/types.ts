interface Product {
  id: number
  item_description: string
  item_key: string
  item_name: string
}

interface ProductsModel {
  output?: Product[]
}

enum ProductsActionType {
  Load = 'products-load',
  Clear = 'products-clear'
}

type ProductsAction = {
  type: ProductsActionType.Clear
} | {
  type: ProductsActionType.Load
  value?: ProductsModel
};

export { ProductsActionType };
export type { ProductsModel, ProductsAction };
