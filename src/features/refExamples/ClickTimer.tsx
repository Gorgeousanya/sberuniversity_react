import { Box, Button } from '@mui/material';
import { useRef, useEffect, type FC } from 'react';

interface ClickData {
    startTime: number;
    clickCount: number;
}

export const ClickTimer: FC = () => {
    const clickDataRef = useRef<ClickData>({
        startTime: 0,
        clickCount: 0,
    });

    const clickHandler = () => {
        if (clickDataRef.current.startTime === 0) {
            clickDataRef.current.startTime = Date.now();
        }
        clickDataRef.current.clickCount += 1;
        console.log("ClickTimer ", clickDataRef.current.clickCount, Date.now() - clickDataRef.current.startTime);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                onClick={() => clickHandler()}
                color="primary"
                sx={{ mb: 4 }}
            >
                ClickTimer
            </Button>
        </Box>
    );
};