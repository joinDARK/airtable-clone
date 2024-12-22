import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod'
import { UserShema } from '../schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import auth from '../../modules/api/auth';
import axios from 'axios';
import useLoaderStore from '../store/useLoaderStore';
import { useEffect } from 'react';
import { validateToken } from '../../modules/jwt';

interface AuthPageProps {
  onLogin: (state: boolean) => void;
}

type User = z.infer<typeof UserShema>

function AuthPage({onLogin}: AuthPageProps) {
  const navigate = useNavigate(); // Хук для навигации
  const handlerLoader = useLoaderStore(store => store.setIsLoading)

  const {register, handleSubmit, formState: {errors}, reset } = useForm<User>({
    resolver: zodResolver(UserShema),
    defaultValues: {
      login: "",
      password: ""
    }
  })

  const onSubmit = async (newUser: User) => {
    handlerLoader(true)
    try {
      const res = await auth(newUser.login, newUser.password)
      toast.success("Вы вошли в аккаунт!")
      onLogin(true); // Устанавливаем авторизацию
      navigate("/managers")
      localStorage.setItem("jwt", res.data.token)
    } catch(e) {
      if (axios.isAxiosError(e)) {
        toast.error("Неверный логин или пароль")
      } else {
        toast.error("Произошла непредвиденная ошибка.")
      }
      reset({login: newUser.login, password: ""})
    } finally {
      handlerLoader(false)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    const isValide = validateToken(token)

    if (isValide) {
      onLogin(isValide)
      navigate("/managers")
    } else {
      localStorage.removeItem("jwt")
    }
  })

  return (
    <div className='dark:text-white flex h-full justify-center items-center'>
      <form className='w-[500px] h-fit border p-5 rounded-md dark:border-gray-600 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-3xl font-black mb-3 text-center'>Вход</h1>
        <div className='mb-2'>
          <span className={`${errors.login ? "text-red-500" : "text-transparent"} select-none`}>Логин не может быть пустым</span>
          <input {...register("login")} autoComplete='login' placeholder='Введите логин' className='w-full bg-transparent rounded-md py-2.5'/>
        </div>
        <div className='mb-6'>
          <span className={`${errors.password ? "text-red-500" : "text-transparent"} select-none`}>Пароль не может быть пустым</span>
          <input {...register("password")} placeholder='Введите пароль' type='password' autoComplete='current-password' className='w-full bg-transparent rounded-md py-2.5'/>
        </div>
        <button type='submit' className='bg-blue-600 transition-all rounded-md py-2.5 text-lg hover:bg-blue-700 active:scale-95'>Войти</button>
      </form>
    </div>
  )
}

export default AuthPage