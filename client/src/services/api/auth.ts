import axios from "axios"

const API_URL = `${import.meta.env.VITE_API_URL}/api`

export default async function auth(userLogin: string, userPassword: string) {
    try {
        const res = await axios.post(
            `${API_URL}/login`,
            {
                login: userLogin,
                password: userPassword
            },
        )
        return res
    } catch (e: unknown) {
        throw new Error(e)
    }
}