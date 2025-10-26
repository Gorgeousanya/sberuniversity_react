import type { FormValues } from './types';

export const createInitialsValues = (values?: FormValues): FormValues => ({
    username: values?.username ?? '',
    password: values?.password ?? '',
    password2: values?.password ?? '',
    email: values?.email ?? '',
    media: values?.media ?? [{ value: '' }],
});
