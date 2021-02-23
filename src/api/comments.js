import apiUrl from '../apiConfig'
import axios from 'axios'

export const commentIndex = () => {
  return axios({
    url: apiUrl + '/comments/',
    method: 'GET'
  })
}

export const commentCreate = (comment, user) => {
  return axios({
    url: apiUrl + '/comments/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { comment }
  })
}
