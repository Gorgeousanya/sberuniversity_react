import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const focusTransitionCountRef = useRef(0);
  const lastFocusedInputRef = useRef<HTMLInputElement | null>(null);

  const handleFirstInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    lastFocusedInputRef.current = firstInputRef.current;
    if (event.relatedTarget === secondInputRef.current) {
      focusTransitionCountRef.current += 1;
      console.log(`Фокус на первом поле. Переходов между полями: ${focusTransitionCountRef.current}`);
    } 
  };

  const handleSecondInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    lastFocusedInputRef.current = secondInputRef.current;
    if (event.relatedTarget === firstInputRef.current) {
      focusTransitionCountRef.current += 1;
      console.log(`Фокус на втором поле. Переходов между полями: ${focusTransitionCountRef.current}`);
    } 
  };

  const focusOnFirstInput = () => {
    if (lastFocusedInputRef.current === secondInputRef.current) {
      focusTransitionCountRef.current += 1;
      console.log(`Переход по кнопке. Переходов между полями: ${focusTransitionCountRef.current}`);
    }
    
    if (firstInputRef.current) {
      firstInputRef.current.focus();
      lastFocusedInputRef.current = firstInputRef.current;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Focus Tracker</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="firstInput">Первое поле: </label>
        <input
          id="firstInput"
          ref={firstInputRef}
          type="text"
          onFocus={handleFirstInputFocus}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="secondInput">Второе поле: </label>
        <input
          id="secondInput"
          ref={secondInputRef}
          type="text"
          onFocus={handleSecondInputFocus}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      
      <Button
        onClick={focusOnFirstInput}
        color="primary"
        sx={{ mb: 4 }}
      >
        Сфокусировать на первом
      </Button>
    </Box>
  );
};