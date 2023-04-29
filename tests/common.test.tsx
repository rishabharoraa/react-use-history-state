import React from 'react';
import { render } from '@testing-library/react';
import 'jest-canvas-mock';

import useHistoryState from '../src/useHistoryState';

describe('Common render', () => {
    it('renders without crashing', () => {
        const BasicComponent = () => {
            const [_state, _setState, _history] = useHistoryState<any>(5);
            return <></>;
        };
        render(<BasicComponent />);
    });
});
