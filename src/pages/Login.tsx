import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSchema } from '../lib/validation';
import { User } from '../types';

type FormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormInputs) => {
    const dbUsers = localStorage.getItem('users');
    const users = dbUsers ? (JSON.parse(dbUsers) as User[]) : [];
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (!user) {
      toast.error('Wrong email/password');
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Success');
    history.push('/feeds');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 card bg-base-200 w-full sm:w-1/3 m-auto"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="email"
            className={`input ${errors.email && 'input-error'}`}
            {...register('email')}
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className={`input ${errors.password && 'input-error'}`}
            {...register('password')}
          />
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>
        <button className="btn btn-primary mt-5">login</button>
        <p className="flex items-center mt-3">
          Dont have an account?{' '}
          <Link to="/signup" className="ml-2 text-primary">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
