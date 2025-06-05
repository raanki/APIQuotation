import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../../components/ui/input';

describe('Input Component', () => {
  test('renders input element', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('applies placeholder text', () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  test('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input value="test" onChange={handleChange} />);
    const inputElement = screen.getByDisplayValue('test');
    
    fireEvent.change(inputElement, { target: { value: 'updated' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('applies custom className', () => {
    render(<Input className="custom-input" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-input');
  });

  test('passes through additional props', () => {
    render(<Input data-testid="test-input" aria-label="Test input" />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toHaveAttribute('aria-label', 'Test input');
  });
});