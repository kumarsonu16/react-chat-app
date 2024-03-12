import * as Yup from 'yup';

export const validationSchema = Yup.object({
  message: Yup.string('Enter a message').required('message is required'),
});

export const initialValues = {
  message: '',
};
