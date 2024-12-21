import axios from "axios"

const API_URL = "https://wild-schools-move.loca.lt/api"

export default async function auth() {
    const res = await axios.post(`${API_URL}/login`, {
        headers: {
            "User-Agent": "Developer"
        },
        data: {
            login: "root",
            password: "1234"
        }
    })
    return res
}