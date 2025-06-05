import { render, screen } from '@testing-library/react';

describe('Sample Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
  
  it('can render a simple component', () => {
    render(<div data-testid="test">Hello Test</div>);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});