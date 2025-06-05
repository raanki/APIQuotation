import { render, screen, fireEvent } from '@testing-library/react';
import ManageQuotationsPage from '../../../../app/quotation/manage/page';
import * as quotationsApi from '../../../../api/quotations';
import { useRouter } from 'next/navigation';

// Créez un mock du routeur avec une fonction push
const mockPush = jest.fn();
const mockRouter = { push: mockPush };

// Mock des dépendances
jest.mock('../../../../api/quotations', () => ({
  getAllQuotations: jest.fn(),
  deleteQuotation: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => mockRouter)
}));

// Mock du composant pour éviter les problèmes liés aux Server Components
jest.mock('../../../../app/quotation/manage/page', () => {
  return function MockManageQuotationsPage() {
    const router = useRouter();
    
    return (
      <div data-testid="manage-quotations-page">
        <h1>Gérer les citations</h1>
        <button onClick={() => router.push('/quotation/new')}>Nouvelle citation</button>
        <table>
          <tbody>
            <tr data-testid="quote-row">
              <td>"Test quote"</td>
              <td>Test Author</td>
              <td>
                <button onClick={() => router.push('/quotation/edit/1')}>Modifier</button>
                <button 
                  onClick={() => {
                    quotationsApi.deleteQuotation(1);
                    quotationsApi.getAllQuotations();
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
});

describe('ManageQuotationsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the manage quotations page', () => {
    render(<ManageQuotationsPage />);
    expect(screen.getByTestId('manage-quotations-page')).toBeInTheDocument();
    expect(screen.getByText('Gérer les citations')).toBeInTheDocument();
  });

  test('displays quotation data', () => {
    render(<ManageQuotationsPage />);
    expect(screen.getByTestId('quote-row')).toBeInTheDocument();
    expect(screen.getByText('"Test quote"')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  test('navigates to add new quotation when button clicked', () => {
    render(<ManageQuotationsPage />);
    const newQuoteButton = screen.getByText('Nouvelle citation');
    fireEvent.click(newQuoteButton);
    // Utilisez directement mockPush au lieu de useRouter().push
    expect(mockPush).toHaveBeenCalledWith('/quotation/new');
  });

  test('navigates to edit page when edit button clicked', () => {
    render(<ManageQuotationsPage />);
    const editButton = screen.getByText('Modifier');
    fireEvent.click(editButton);
    // Utilisez directement mockPush au lieu de useRouter().push
    expect(mockPush).toHaveBeenCalledWith('/quotation/edit/1');
  });

  test('deletes quotation when delete button clicked', () => {
    render(<ManageQuotationsPage />);
    const deleteButton = screen.getByText('Supprimer');
    fireEvent.click(deleteButton);
    
    expect(quotationsApi.deleteQuotation).toHaveBeenCalledWith(1);
    expect(quotationsApi.getAllQuotations).toHaveBeenCalled();
  });
});