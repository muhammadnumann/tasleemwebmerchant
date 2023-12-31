import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Auth/AuthReducer'
import AccountReducer from './Account/AccountReducer'
import ProductReducer from './Poduct/index'
import ProductOrderReducer from './Order/index'
import ApiLoading from './ApiLoading/ApiLoadingSlice'
import Dashboard from './Dashboard/index'

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Account: AccountReducer,
    product: ProductReducer,
    order: ProductOrderReducer,
    ApiLoading: ApiLoading,
    Dashboard: Dashboard
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
