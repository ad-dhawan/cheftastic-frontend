import axios from 'axios';

import { STAGING_URL } from '@env'

export const SERVER_URL = STAGING_URL;
export const BASE_URL = 'api'

console.log(`API_URL : ${SERVER_URL}`);

/** All API call Interface */
let GetData = {

  /** REGISTER USER */
  registerUser(data) {
    return axios.post(`${SERVER_URL}/${BASE_URL}/auth/register`, data).then(res => res).catch(err => err.response)
  },

  /** GET FEED DATA */
  getFeed(page_size, marker_id, fetch_data) {
    if(!marker_id && !fetch_data)
      return axios.get(`${SERVER_URL}/${BASE_URL}/post/get_all?page_size=${page_size}`).then(res => res).catch(err => err)
    else
      return axios.get(`${SERVER_URL}/${BASE_URL}/post/get_all?page_size=${page_size}&marker_id=${marker_id}&fetch_data=${fetch_data}`).then(res => res).catch(err => err)  
  },

  /** GET SPECIALS */
  getSpecials() {
      return axios.get(`${SERVER_URL}/${BASE_URL}/post/get_top`).then(res => res).catch(err => err) 
  },

  /** GET NOTIFICATIONS */
  getNotifications(user_id, page_size, marker_id, fetch_data) {
    if(!marker_id && !fetch_data)
      return axios.get(`${SERVER_URL}/${BASE_URL}/auth/get_notification/${user_id}?page_size=${page_size}`).then(res => res).catch(err => err)
    else
      return axios.get(`${SERVER_URL}/${BASE_URL}/auth/get_notification/${user_id}?page_size=${page_size}&marker_id=${marker_id}&fetch_data=${fetch_data}`).then(res => res).catch(err => err)   
  },

}

export {GetData};