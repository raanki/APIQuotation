import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EditQuotationPage from '../../../../../app/quotation/edit/[id]/page';
import * as quotationsApi from '../../../../../api/quotations';
import * as categoriesApi from '../../../../../api/categories';
import { useParams, useRouter } from 'next/navigation';

// Mock des dépendances
jest.mock('../../../../../api/quotations', () => ({
  getQuotationById: jest.fn(),
  updateQuotation: jest.fn()
}));
jest.mock('../../../../../api/categories', () => ({
  getAllCategories: jest.fn()
}));
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock du composant pour simplifier les tests
jest.mock('../../../../../app/quotation/edit/[id]/page', () => {
  // La vraie mise en œuvre de la fonction EditQuotationPage
  const RealEditQuotationPage = jest.requireActual('../../../../../app/quotation/edit/[id]/page').default;
  return RealEditQuotationPage;
});

describe('EditQuotationPage', () => {
  const mockRouter = { push: jest.fn() };
  const mockCategories = [
    { id: 1, name: 'Philosophy' },
    { id: 2, name: 'Motivation' }
  ];
  const mockQuotation = {
    id: 5,
    content: 'Test Quote',
    author: 'Test Author',
    category: { id: 1, name: 'Philosophy' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: '5' });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (categoriesApi.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
    (quotationsApi.getQuotationById as jest.Mock).mockResolvedValue(mockQuotation);
    (quotationsApi.updateQuotation as jest.Mock).mockResolvedValue(mockQuotation);
  });

  test('should load quotation data and categories on mount', async () => {
    await act(async () => {
      render(<EditQuotationPage />);
    });
    
    await waitFor(() => {
      expect(quotationsApi.getQuotationById).toHaveBeenCalledWith(5);
      expect(categoriesApi.getAllCategories).toHaveBeenCalled();
    });
    
    // Ajoutez un délai pour s'assurer que les états sont mis à jour
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Contenu')).toHaveValue('Test Quote');
      expect(screen.getByPlaceholderText('Auteur')).toHaveValue('Test Author');
    }, { timeout: 3000 });
  });

  test('should update inputs when user types', async () => {
    await act(async () => {
      render(<EditQuotationPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Contenu')).toHaveValue('Test Quote');
    }, { timeout: 3000 });
    
    const contentInput = screen.getByPlaceholderText('Contenu');
    const authorInput = screen.getByPlaceholderText('Auteur');
    
    await act(async () => {
      fireEvent.change(contentInput, { target: { value: 'Updated Quote' } });
      fireEvent.change(authorInput, { target: { value: 'Updated Author' } });
    });
    
    expect(screen.getByPlaceholderText('Contenu')).toHaveValue('Updated Quote');
    expect(screen.getByPlaceholderText('Auteur')).toHaveValue('Updated Author');
  });

  test('should call updateQuotation when saving', async () => {
    await act(async () => {
      render(<EditQuotationPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Contenu')).toHaveValue('Test Quote');
    }, { timeout: 3000 });
    
    const contentInput = screen.getByPlaceholderText('Contenu');
    const authorInput = screen.getByPlaceholderText('Auteur');
    
    await act(async () => {
      fireEvent.change(contentInput, { target: { value: 'Updated Quote' } });
      fireEvent.change(authorInput, { target: { value: 'Updated Author' } });
    });
    
    const saveButton = screen.getByText('Enregistrer');
    
    await act(async () => {
      fireEvent.click(saveButton);
    });
    
    await waitFor(() => {
      expect(quotationsApi.updateQuotation).toHaveBeenCalledWith(5, {
        content: 'Updated Quote',
        author: 'Updated Author',
        categoryId: 1
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/quotation/manage');
    });
  });

  test('should navigate back when back button is clicked', async () => {
    await act(async () => {
      render(<EditQuotationPage />);
    });
    
    const backButton = screen.getByText('← Retour');
    
    await act(async () => {
      fireEvent.click(backButton);
    });
    
    expect(mockRouter.push).toHaveBeenCalledWith('/quotation/manage');
  });
});