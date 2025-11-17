import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../hooks/use-login-mutation';
import { useNavigate } from 'react-router';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox';
import Input from '../../components/input';
import { TOKEN } from '../../constant/auth';
import { ADMIN_URL } from '../../constant/url';

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const { mutateAsync: login, isPending, error, reset } = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });
      const { accessToken } = response.data;
      localStorage.setItem(TOKEN, accessToken);
      return navigate(ADMIN_URL.DASHBOARD);
    } catch (err) {
      console.error('Login failed: ', err);
    }
  };

  watch(() => {
    if (error?.message) reset();
  });

  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <Input
            label="Username"
            placeholder="Enter your username"
            type="text"
            error={errors.email?.message}
            {...register('username', { required: 'Username is required' })}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <Checkbox label="Remember me" {...register('remember')} />
        </div>
        {error?.message && (
          <small className="text-red-600 my-4 block">{error.message}</small>
        )}
        <Button isLoading={isPending} disabled={isPending}>
          Login
        </Button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?
        <a href="#" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
};

export default Login;
