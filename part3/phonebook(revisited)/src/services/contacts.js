import axios from 'axios'

const baseURL = 'https://still-harbor-32125.herokuapp.com/api/persons'

//Send http GET request to server to get all contacts
const getAll = () => {
    return axios
    .get(baseURL)
    .then( response => {
      return response.data
    })
}

//Send http POST request to server to send new contact
const newContact = personObject => {
    
    return axios
        .post(baseURL, personObject)
        .then(response => {
          return response.data
        })
        
}

//Send DELETE request for contact to server
const deleteContact = id => {
    return axios
    .delete(baseURL.concat('/'+id))
    .then(response => response)
    
    
}

//Send PUT request to update contact number
const updateNumber = (id, personObject) => {
  return axios
  .put(baseURL.concat('/'+id), personObject)
  .then(response => {
    return response.data
  })
  .catch(err => alert("Something went wrong. "+err))
}

export default {getAll, newContact, deleteContact, updateNumber}