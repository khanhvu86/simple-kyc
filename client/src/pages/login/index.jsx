import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../hooks/use-login-mutation';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../hooks/use-auth-context';
import { ADMIN_URL } from '../../constant/url';
import { USER_ROLE } from '../../constant/user';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox';
import Input from '../../components/input';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const { mutateAsync: login, isPending, error, reset } = useLoginMutation();
  const { saveAuthData } = useAuthContext();

  const onSubmit = async (data) => {
    const response = await login({
      email: data.email,
      password: data.password,
    });
    const { accessToken, user } = response.data;
    saveAuthData(accessToken, user);
    if (user.role === USER_ROLE.NORMAL_USER) {
      return navigate(ADMIN_URL.USER_PROFILE.replace(':userId', user.id));
    } else {
      return navigate(ADMIN_URL.SUBMISSIONS);
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
            label="Email"
            placeholder="Enter your email"
            type="text"
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
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
          <a
            href="#"
            className="text-sm text-(--secondary-color) hover:underline"
          >
            Lost Password?
          </a>
        </div>
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          Login to your account
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?&nbsp;
        <a href="#" className="text-(--secondary-color) hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
};

export default Login;
