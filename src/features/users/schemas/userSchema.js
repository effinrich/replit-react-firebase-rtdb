import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
  zipCode: yup
    .string()
    .required('Zip code is required')
    .matches(/^\d{5}$/, 'Zip code must be exactly 5 digits')
    .trim(),
}).required();
