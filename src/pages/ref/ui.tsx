import { ClickTimer,FocusTracker, PreviousInput } from '../../features/refExamples';
import type { FC } from 'react';

export const ref: FC = () => {
    return (
        <div>
            <ClickTimer />
            <PreviousInput />
            <FocusTracker />
        </div>
    );
};
