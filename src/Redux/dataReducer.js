import { OVERALL_DATA_REQUEST, OVERALL_DATA_ERROR, OVERALL_DATA_SUCCESS, LISTING_DATA_UPDATE, LISTING_DATA_PAGE_NO, OVERALL_DATA_PAGE_NO } from './dataActionTypes'

const initalState = {
  loading: false,
  listingData: [],
  allData: [],
  error: '',
  overallPageNos: 1,
  listingPageNos: 1
}

export const overallDataReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case OVERALL_DATA_REQUEST: return { ...state, loading: true }
    case OVERALL_DATA_SUCCESS: return { ...state, loading: false, allData: payload }
    case OVERALL_DATA_ERROR: return { ...state, loading: false, error: payload }
    case LISTING_DATA_UPDATE: return { ...state, listingData: payload }
    case LISTING_DATA_PAGE_NO: return { ...state, listingPageNos: payload }
    case OVERALL_DATA_PAGE_NO: return { ...state, overallPageNos: payload }
    default: return state
  }
}
