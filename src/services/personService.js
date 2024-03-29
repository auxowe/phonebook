import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line
export default{
    getAll, create, update, deletePerson
};