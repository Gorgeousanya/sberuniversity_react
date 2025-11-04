import { Box, TextField, Typography } from '@mui/material';
import { useRef, useState, type FC } from 'react';

export const PreviousInput: FC = () => {
    const [value, setValue] = useState('');
    const prevValueRef = useRef<string | null>(null);

    const handleChange = (newValue: string) => {
        prevValueRef.current = value;
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    onChange={(e) => handleChange(e.target.value)}
                    value={value}
                    label="Текст 1"
                    variant="outlined"
                />
            </Box>
            <Typography variant="body2" align="center" sx={{ mb: 6 }}>
                Предыдущее состояние: {prevValueRef.current}
            </Typography>
        </Box>
    );
};