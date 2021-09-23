import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { updateProfileSchema, updatePasswordSchema } from '../lib/validation';
import { User } from '../types';

type FormInputs = {
  email: string;
  displayName: string;
};

type PasswordFormInput = {
  password: string;
};

const Profile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(updateProfileSchema),
  });

  const {
    register: passwordRegister,
    handleSubmit: passwordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormInput>({
    resolver: yupResolver(updatePasswordSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('email', user.email);
      setValue('displayName', user.displayName);
    }
  }, []);

  const onSubmit = (data: FormInputs) => {
    const updatedUser = {
      ...user,
      displayName: data.displayName,
    };
    setUser(updatedUser as User);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile details edited');
  }

  const submitPasswordForm = (data: PasswordFormInput) => {
    const updatedUser = {
      ...user,
      password: data.password,
    };
    setUser(updatedUser as User);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Password changed');
  }

  const deleteAccount = () => {
    toast.success('Account removed');
    const users: any[] = JSON.parse(localStorage.getItem('users') as string);
    const updatedUsers = users.filter((item) => item.email !== user?.email);
    setUser(null);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('user');
  }

  return (
    <div className="flex p-4 flex-wrap">
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
            className={`input input-bordered ${errors.email && 'input-error'}`}
            disabled
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
              <span className="label-text-alt text-error">
                {errors.displayName.message}
              </span>
            </label>
          )}
        </div>
        <button className="btn btn-primary mt-5">Update Profile</button>
      </form>
      <form
        onSubmit={passwordSubmit(submitPasswordForm)}
        className="p-10 card bg-base-200 w-full sm:w-1/3 m-auto mt-4"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className={`input ${passwordErrors.password && 'input-error'}`}
            {...passwordRegister('password')}
          />
          {passwordErrors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {passwordErrors.password.message}
              </span>
            </label>
          )}
          <button className="btn btn-primary mt-5">change password</button>
        </div>
      </form>
      <div className="w-full text-center mt-10">
        <label
          htmlFor="my-modal-2"
          className="btn btn-error text-white modal-button"
        >
          Delete account
        </label>
        <input type="checkbox" id="my-modal-2" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <p>
              Are you sure you want to delete the account? You will be logged
              out immediatley
            </p>
            <div className="modal-action">
              <label
                htmlFor="my-modal-2"
                className="btn btn-primary"
                onClick={deleteAccount}
              >
                Confirm
              </label>
              <label htmlFor="my-modal-2" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
