import axios from 'axios';

const API = "http://localhost:5000/api";
export const RegisterUser = async ({ username, email, password }) => {
    try {
        const res = await axios.post(`${API}/auth/register`, {
            username: username,
            email: email,
            password: password
        })

        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const LoginUser = async ({ email, password }) => {
    try {
        const res = await axios.post(`${API}/auth/login`, {
            email: email,
            password: password
        })

        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

