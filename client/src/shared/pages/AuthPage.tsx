import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {toast} from "react-toastify"
import axios from "axios"
import {useLayoutEffect} from "react"

import auth from "@services/api/auth"
import {validateToken} from "@services/jwt"
import useLoaderStore from "@store/useLoaderStore"
import {UserShema} from "@schema/form"

interface AuthPageProps {
  onLogin: (state: boolean) => void
}

type User = z.infer<typeof UserShema>

function AuthPage({onLogin}: AuthPageProps) {
  const navigate = useNavigate() // Хук для навигации
  const handlerLoader = useLoaderStore(store => store.setIsLoading)

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<User>({
    resolver: zodResolver(UserShema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const onSubmit = async (newUser: User) => {
    handlerLoader(true)
    try {
      const res = await auth(newUser.login, newUser.password)
      toast.success("Вы вошли в аккаунт!")
      onLogin(true) // Устанавливаем авторизацию
      navigate("/managers")
      localStorage.setItem("jwt", res.data.token)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Неверный логин или пароль")
      } else {
        toast.error("Произошла непредвиденная ошибка.")
      }
      reset({login: newUser.login, password: ""})
    } finally {
      handlerLoader(false)
    }
  }

  useLayoutEffect(() => {
    const token = localStorage.getItem("jwt")
    const isValide = validateToken(token)

    if (isValide) {
      onLogin(isValide)
      navigate("/orders")
    } else {
      localStorage.removeItem("jwt")
    }
  })

  return (
    <div className="text-white flex h-full justify-center items-center">
      <form className="w-[500px] h-fit border p-5 rounded-md white:bg-gray-100 dark:border-gray-600 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-black mb-3 text-center text-gray-900 dark:text-gray-100">Вход</h1>
        <div className="mb-2">
          <span className={`${errors.login ? "text-red-500" : "text-transparent"} select-none`}>Логин не может быть пустым</span>
          <input 
            {...register("login")} 
            autoComplete="login" 
            placeholder="Введите логин" 
            className="w-full bg-transparent rounded-md p-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-800" 
          />
        </div>
        <div className="mb-6">
          <span className={`${errors.password ? "text-red-500" : "text-transparent"} select-none`}>Пароль не может быть пустым</span>
          <input
            {...register("password")}
            placeholder="Введите пароль"
            type="password"
            autoComplete="current-password"
            className="w-full bg-transparent rounded-md p-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
        <button type="submit" className="bg-blue-600 transition-all rounded-md py-2.5 text-lg hover:bg-blue-700 active:scale-95">
          Войти
        </button>
        <button
          type="button"
          onClick={() => {
            onLogin(true) // Устанавливаем авторизацию
            navigate("/orders")
          }}
          className="bg-green-600 transition-all rounded-md py-2.5 text-lg hover:bg-green-700 active:scale-95 mt-2"
        >
          Пропустить авторизацию
        </button>
      </form>
    </div>
  )
}

export default AuthPage
