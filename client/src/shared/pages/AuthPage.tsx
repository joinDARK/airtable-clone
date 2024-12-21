import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod'
import { UserShema } from '../schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import auth from '../../modules/api/auth';

interface AuthPageProps {
  onLogin: (state: boolean) => void;
}

type User = z.infer<typeof UserShema>

function AuthPage({onLogin}: AuthPageProps) {
  const navigate = useNavigate(); // Хук для навигации

  const {register, handleSubmit, formState: {errors}, reset } = useForm<User>({
    resolver: zodResolver(UserShema),
    defaultValues: {
      login: "",
      password: ""
    }
  })

  const onSubmit = async (newUser: User) => {
    console.log(await auth())
    if (newUser.login == "root" && newUser.password == "1234") {
      toast.success("Вы вошли в аккаунт!")
      onLogin(true); // Устанавливаем авторизацию
      navigate("/managers")
    } else {
      toast.error("Не удалось войти. Проверьте логин или пароль")
      reset({login: newUser.login, password: ""})
    }
  };

  return (
    <div className='dark:text-white flex h-full justify-center items-center'>
      <form className='w-[500px] h-fit border p-5 rounded-md dark:border-gray-600 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-3xl font-black mb-3 text-center'>Вход</h1>
        <div className='mb-2'>
          <span className={`${errors.login ? "text-red-500" : "text-transparent"}`}>Логин не может быть пустым</span>
          <input {...register("login")} autoComplete='login' placeholder='Введите логин' className='w-full bg-transparent rounded-md py-2.5'/>
        </div>
        <div className='mb-6'>
          <span className={`${errors.password ? "text-red-500" : "text-transparent"}`}>Пароль не может быть пустым</span>
          <input {...register("password")} placeholder='Введите пароль' type='password' autoComplete='password' className='w-full bg-transparent rounded-md py-2.5'/>
        </div>
        <button type='submit' className='bg-blue-600 transition-all rounded-md py-2.5 text-lg hover:bg-blue-700 active:scale-95'>Войти</button>
      </form>
    </div>
  )
}

export default AuthPage