import { createSlice } from '@reduxjs/toolkit'

interface state {
  productList: Array<Object>,
  productTaxList: Array<Object>,
  ProductCategory: Object;
  ProductSubCategory: Object;
}

const initialState: state = {
  productList: [],
  productTaxList: [],
  ProductCategory: {},
  ProductSubCategory: {},

}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    AddProductList: (state, action) => {
      state.productList.push(action.payload.data)
    },
    AddProductTaxList: (state, action) => {
      state.productTaxList.push(action.payload.data)
    },
    ProductCategory: (state, action) => {
      state.ProductCategory = action.payload.data
    },
    ProductSubCategory: (state, action) => {
      state.ProductSubCategory = action.payload.data
    },
    DeleteProduct: (state, action) => {
      const id = action.payload.data.id
    },
  },
})

export const { AddProductList, AddProductTaxList, ProductCategory, ProductSubCategory } = ProductSlice.actions;
export default ProductSlice.reducer