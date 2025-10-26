import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useMemo, type FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { formHandler } from '../../../shared/lib/forms';
import { getMessageFromError } from '../../../shared/lib/common';
import { createInitialsValues, validationSchema, type FormValues } from '../model';
import { clearLS, loadFromLS } from '../../../shared/lib/localStorage';
import { FORMS_LS_KEY } from '../../../shared/configs/constants';
import { FORM_LS_KEY } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const RHFForm: FC = () => {
    const initialValues = useMemo(() => {
        const valuesFromLS = loadFromLS<FormValues>({
            key: FORMS_LS_KEY,
            subTitle: FORM_LS_KEY,
        });

        return createInitialsValues(valuesFromLS);
    }, []);

    const form = useForm<FormValues>({
        defaultValues: initialValues,
        mode: 'onChange',
        resolver: zodResolver(validationSchema),
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting },
    } = form;

    const {
        fields: mediaValues,
        append: mediaAppend,
        remove: mediaRemove,
    } = useFieldArray({
        control,
        name: 'media',
    });

    const submitHandler = async (formValues: FormValues) => {
        try {
            await formHandler(formValues);
            toast.success('Success');

            clearLS({
                key: FORMS_LS_KEY,
                subTitle: FORM_LS_KEY,
            });
        } catch (error) {
            console.log(getMessageFromError(error))
            toast.error(getMessageFromError(error));
        }
    };

    return (
        <FormProvider {...form}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexFlow: 'column',
                }}
                component="form"
                onSubmit={handleSubmit(submitHandler)}
            >
                <Typography variant="h4" sx={{ mb: 4 }}>
                    RHF form
                </Typography>
                <Container maxWidth="sm">
                    <Controller
                        name="username"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                sx={{ mb: 2 }}
                                fullWidth
                                label="Имя пользователя"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                sx={{ mb: 2 }}
                                fullWidth
                                label="Почта"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                sx={{ mb: 2 }}
                                fullWidth
                                label="Пароль"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password2"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                sx={{ mb: 2 }}
                                fullWidth
                                label="Повторите пароль"
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Divider variant="middle" sx={{ mb: 4 }} />
                    {mediaValues.map((media, index) => (
                        <Box key={media.id} sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Controller
                                name={`media.${index}.value` as const}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        sx={{ mb: 2 }}
                                        fullWidth
                                        label={`Социальная сеть ${index + 1}`}
                                        variant="outlined"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />

                            {!!index && (
                                <IconButton
                                    onClick={() => mediaRemove(index)}
                                    sx={{ ml: 2, mt: '12px' }}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}

                    <Button
                        onClick={() => mediaAppend({ value: '' })}
                        color="primary"
                        sx={{ mb: 4 }}
                        startIcon={<AddIcon />}
                        disabled={Array.isArray(errors.media) && !!errors.media.length}
                    >
                        Добавить ссылку
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            sx={{ mb: 2 }}
                            disabled={!isValid}
                            loading={isSubmitting}
                            variant="contained"
                            type="submit"
                        >
                            Отправить
                        </Button>
                    </Box>
                </Container>
            </Box>
        <ToastContainer />
        </FormProvider>
    );
};
