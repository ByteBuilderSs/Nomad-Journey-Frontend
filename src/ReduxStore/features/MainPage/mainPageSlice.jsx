import { createSlice } from '@reduxjs/toolkit'

export const mainPageSlice = createSlice({
  name: 'mainpage',

  initialState: {

    // announcement cards info 
    announcData: [],
    loader : false,
    // sort announcements
    sort : "sort_by=anc_timestamp_created&descending=True",
    filters : {"language" : [], "city" : [], "country" : [], "date" : []},
    showPagination : false,
    // number of page shown in pagination
    paginCount : 1,
    // which page are we in 
    page : 1,

  },

  reducers: {

    setAnncData: (state, action) => {
        state.announcData = action.payload
    },
    setLoader: (state, action) => {
      state.loader = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setPagination: (state, action) => {
      state.showPagination = action.payload
    },
    setPaginCount: (state, action) => {
      state.paginCount = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setAnncData, setLoader, setSort, setPagination, setPaginCount, setPage, setFilters } = mainPageSlice.actions

export default mainPageSlice.reducer