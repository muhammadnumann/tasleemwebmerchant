import { createSlice } from '@reduxjs/toolkit'


const initialState: any = {
  ManageProfile: null,
  Setting: null,
  TimeSetup: null,
  Taxes: null
}

export const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    ManageProfile: (state, action) => {
      state.ManageProfile = action.payload
      localStorage.setItem("userData", JSON.stringify(action.payload))
    },
    SettingsSlice: (state, action) => {
      state.Setting = action.payload.data
    },
    TimeSetUpSlice: (state, action) => {
      state.TimeSetup = action.payload.data
    },
    TaxesSlice: (state, action) => {
      state.Taxes = action.payload.data
    },
  },
})

export const { ManageProfile, SettingsSlice, TimeSetUpSlice, TaxesSlice } = AccountSlice.actions;
export default AccountSlice.reducer