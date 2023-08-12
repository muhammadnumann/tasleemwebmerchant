import { createSlice } from '@reduxjs/toolkit'

interface state {
  productOrderList: Array<Object>,
  ProductConfirmOrder: Array<Object>,
  ProductCancelOrder: Array<Object>,
  ProductReadyOrder: Array<Object>,

}

const initialState: state = {
  productOrderList: [],
  ProductConfirmOrder: [],
  ProductCancelOrder: [],
  ProductReadyOrder: []
}

export const ProductOrderSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    AddProductOrder: (state, action) => {
      state.productOrderList.push(action.payload.data)
    },

    ProductConfirmOrder: (state, action) => {
      state.ProductConfirmOrder = action.payload.data
    },
    ProductCancelOrder: (state, action) => {
      state.ProductCancelOrder = action.payload.data
    },
    ProductReadyOrder: (state, action) => {
      state.ProductReadyOrder = action.payload.data
    },
  },
})

export const { AddProductOrder,
  ProductConfirmOrder,
  ProductCancelOrder,
  ProductReadyOrder } = ProductOrderSlice.actions;

export default ProductOrderSlice.reducer