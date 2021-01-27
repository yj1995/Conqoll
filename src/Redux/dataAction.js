import { OVERALL_DATA_REQUEST, OVERALL_DATA_ERROR, OVERALL_DATA_SUCCESS, LISTING_DATA_UPDATE, LISTING_DATA_PAGE_NO, OVERALL_DATA_PAGE_NO } from './dataActionTypes'
import axios from 'axios'

const apiCall = 'https://gist.githubusercontent.com/pratikg117/7ce66c7ade26a94772111334e40b287b/raw/fd5d7109921ca7a461a19ae73bfb71c9696bd139/Assignment%2520Json'

export function getData() {
  return function (dispatch) {
    dispatch({
      type: OVERALL_DATA_REQUEST
    })
    axios.get(apiCall)
      .then(response => {
        dispatch({
          type: OVERALL_DATA_SUCCESS,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: OVERALL_DATA_ERROR,
          payload: err
        })
      })
  }
}

export const updateListingData = (payload) => {
  return {
    type: LISTING_DATA_UPDATE,
    payload
  }
}

export const listingDataPageNo = (payload) => {
  return {
    type: LISTING_DATA_PAGE_NO,
    payload
  }
}

export const overallDataPageNo = (payload) => {
  return {
    type: OVERALL_DATA_PAGE_NO,
    payload
  }
}