import { z } from 'zod';

export const validationSchema = z
    .object({
        username: z.string().min(1, 'Имя обязательно'),
        password: z.string().min(6, 'Пароль минимум 6 символов'),
        password2: z.string().min(6, 'Пароль минимум 6 символов'),
        email: z.email("Неверная почта"),
        media: z
            .array(z.object({ value: z.url("Некорректный URL") }))
            .min(1, 'Добавьте хотя бы один навык'),
    })
    .superRefine((data, ctx) => {
        // Условная валидация: если isMiddleNameRequired === true, то middleName обязателен
        if (data.password !== data.password2) {
            ctx.addIssue({
                path: ['password2'],
                code: 'custom',
                message: 'Пароли не совпадают',
            });
        }
    });
