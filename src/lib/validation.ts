import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup
    .string()
    .required('Required')
    .max(20, 'Maximum 20 characters')
    .matches(/^[a-zA-Z0-9 ]+$/, 'Special characters not allowed'),
  displayName: yup
    .string()
    .required('Required')
    .matches(/^[a-zA-Z0-9 ]+$/, 'Special characters not allowed'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup.string().required('Required'),
});

export const updateProfileSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  displayName: yup
    .string()
    .required('Required')
    .matches(/^[a-zA-Z0-9 ]+$/, 'Special characters not allowed'),
});

export const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Required')
    .max(20, 'Maximum 20 characters')
    .matches(/^[a-zA-Z0-9 ]+$/, 'Special characters not allowed'),
});
