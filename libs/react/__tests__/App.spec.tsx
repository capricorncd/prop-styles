import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('@prop-styles/react App component', () => {
  it('renders children and applies computed styles', () => {
    render(<App width={10}>Hello World</App>);

    const el = screen.getByText('Hello World');
    // element should be a div with computed inline style
    expect(el).toBeTruthy();
    // style.width should be set to 10px by createPropStyles via usePropStyles
    // Note: style is applied as inline style object
    // @ts-ignore -- DOM style typing in test environment
    expect(el.style.width).toBe('10px');
  });
});
