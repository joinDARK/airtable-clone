import axios from "axios"

const API_URL = "http://localhost:5000/api"

export default async function auth(userLogin: string, userPassword: string) {
    try {
        const res = await axios.post(
            `${API_URL}/login`, 
            {
                login: userLogin,
                password: userPassword
            },
            {
                headers: {
                    "User-Agent": "Developer",
                    "bypass-tunnel-reminder": "12234"
                }
            }
        )
        return res
    } catch(e: any) {
        throw e
    }
}