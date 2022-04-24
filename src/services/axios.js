import axios from 'axios';

export const baseUrl = 'http://localhost:3000';

console.log(`API_URL : ${baseUrl}`);

/** All API call Interface */
let GetData = {

  /** REGISTER USER */
  registerUser(data) {
    return axios.post(`${baseUrl}/api/auth/register`, data).then(res => res).catch(err => err)
  },

}

export {GetData};