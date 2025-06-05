import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../../components/ui/button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveClass('custom-class');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled state correctly', () => {
    render(<Button disabled>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });

  test('applies variant styles', () => {
    render(<Button variant="outline">Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    // Check for outline variant class if your component adds specific classes
    expect(buttonElement).toHaveAttribute('class', expect.stringContaining('outline'));
  });
});