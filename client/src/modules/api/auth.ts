import axios from "axios"

const API_URL = `${import.meta.env.VITE_API_URL}/api`

export default async function auth(userLogin: string, userPassword: string) {
    try {
        console.log(import.meta.env.VITE_API_URL)
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