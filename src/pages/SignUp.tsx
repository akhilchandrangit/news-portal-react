import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../lib/validation';
import { User } from '../types';
import { toast } from 'react-toastify';

type FormInputs = {
  email: string;
  password: string;
  displayName: string;
};

const SignUp: React.FC = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: FormInputs) => {
    const dbUsers = localStorage.getItem('users');
    const users = dbUsers ? JSON.parse(dbUsers) as User[] : [];
    const isUserExists = users?.find((user) => user.email === data.email);
    if (isUserExists) {
      toast.error('User already exists');
      return;
    }
    localStorage.setItem('users', JSON.stringify([ ...users, data ]));
    toast.success('Signup successfull');
    history.push('/login');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 card bg-base-200 w-full sm:w-1/3 m-auto"
      >
        <h2 className="text-center font-bold mb-2">Signup</h2>
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
              <span className="label-text-alt text-error">{errors.email.message}</span>
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
              <span className="label-text-alt text-error">{errors.password.message}</span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Display Name</span>
          </label>
          <input
            type="text"
            placeholder="display name"
            className={`input ${errors.displayName && 'input-error'}`}
            {...register('displayName')}
          />
          {errors.displayName && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.displayName.message}</span>
            </label>
          )}
        </div>
        <button className="btn btn-primary mt-5">signup</button>
        <p className="flex items-center mt-3">
          Already have an account?{' '}
          <Link to="/login" className="ml-2 text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
