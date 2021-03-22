import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/users`
export default {
    getAllUsers (page) {
        return Service.get(`${resource}?page=${page}`, {
            headers: {
                "token": localStorage.getItem('token'),
            },
        }).then((response) => {
            if (response.status === 200) {
                return response
                
            }
        })
    },
    updateUser (userId, userData) {
        return Service.put(`${resource}/${userId}`,{
            ...userData,
        }, {
            headers: {
                "token": localStorage.getItem('token'),
            },
        }).then((response) => {
            // if (response.data.done) {
                return response.data
            // }
        })
    },
    deleteUser (userId) {
        return Service.delete(`${resource}/${userId}`, {
            headers: {
                "token": localStorage.getItem('token'),
            },
        }).then((response) => {
            // if (response.data.done) {
                return response.data
            // }
        })
    },
}