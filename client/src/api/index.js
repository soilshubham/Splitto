import axios from 'axios';

const API = "http://localhost:8000/api";
export const RegisterUser = async ({ name, email, password }) => {
    try {
        const res = await axios.post(`${API}/auth/register`, {
            name: name,
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

export const GetUser = async (id) => {
    try {
        const res = await axios.get(`${API}/user/${id}`);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const AddGroup = async ({ name, userID }) => {
    try {
        const res = await axios.post(`${API}/auth/create-group`, {
            name: name,
            userID: userID
        })

        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const JoinGroup = async ({ groupID, userID }) => {
    try {
        const res = await axios.post(`${API}/group/join-group`, {
            groupID: groupID,
            userID: userID
        })

        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const GetGroup = async (id) => {
    try {
        const res = await axios.get(`${API}/group/${id}`);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const AddEntry = async ({ groupID, name, amount, payerID, paidForID }) => {
    try {
        const res = await axios.post(`${API}/entry/add`, {
            groupID: groupID,
            name: name,
            amount: amount,
            payerID: payerID,
            paidForID: paidForID
        })

        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}
