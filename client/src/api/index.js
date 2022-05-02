import axios from 'axios';

const API = "http://localhost:5000/api";
export const Register = async ({ username, email, password }) => {
    const res = await axios.post(`${API}/auth/register`, {
        username: username,
        email: email,
        password: password
    })

    return res.data;
}