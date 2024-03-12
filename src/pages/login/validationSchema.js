import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string('Enter an username').required('username is required'),
  password: Yup.string('Enter a password').required('password is required')
});

export const initialValues = {
  username: '',
  password: '',
};
