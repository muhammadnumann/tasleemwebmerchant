import { createSlice } from '@reduxjs/toolkit'

interface state {
  Data: any
  reviewsData: { reviews: any, summary: any }
  notification: Object[]
}

const initialState: state = {
  Data: null,
  reviewsData: { reviews: [], summary: {} },
  notification: []
}

export const DashboardSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    AddDashboardData: (state, action) => {
      state.Data = action.payload.data
    },
    AddReviewsData: (state, action) => {
      state.reviewsData = action.payload.data
    },
    AddNoticficationData: (state, action) => {
      state.notification = [action.payload.data]
    },
  },
})

export const { AddDashboardData, AddReviewsData, AddNoticficationData } = DashboardSlice.actions;

export default DashboardSlice.reducer