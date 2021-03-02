import apiUrl from '../apiConfig'
import axios from 'axios'

export const pictureIndexAll = () => {
  return axios({
    url: apiUrl + '/pictures/all/',
    method: 'GET'
  })
}

export const pictureIndex = user => {
  return axios({
    url: apiUrl + '/pictures/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const pictureCreate = (picture, user) => {
  return axios({
    url: apiUrl + '/pictures/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { picture: picture }
  })
}

export const pictureShow = (id) => {
  return axios({
    url: apiUrl + '/pictures/' + id + '/',
    method: 'GET'
  })
}
