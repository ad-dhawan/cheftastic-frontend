import axios from 'axios';

export const SERVER_URL = 'https://cheftastic2.herokuapp.com';
export const BASE_URL = 'api'

console.log(`API_URL : ${SERVER_URL}`);

/** All API call Interface */
let GetData = {

  /** REGISTER USER */
  registerUser(data) {
    return axios.post(`${SERVER_URL}/${BASE_URL}/auth/register`, data).then(res => res).catch(err => err)
  },

  /** GET FEED DATA */
  getFeed(page_size) {
    return axios.get(`${SERVER_URL}/${BASE_URL}/post/get_all?page_size=${page_size}`).then(res => res).catch(err => err)
  },

  /** GET PAGINATED FEED DATA */
  getPaginatedFeed(page_size, marker_id, fetch_data) {
    return axios.get(`${SERVER_URL}/${BASE_URL}/post/get_all?page_size=${page_size}&marker_id=${marker_id}&fetch_data=${fetch_data}`).then(res => res).catch(err => err)
  }

}

export {GetData};