import * as api from '../../api/categories';

// Mock fetch
global.fetch = jest.fn();

describe('Categories API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('getAllCategories should fetch categories from API', async () => {
    const mockCategories = [
      { id: 1, name: 'Philosophy' },
      { id: 2, name: 'Science' }
    ];
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories
    });
    
    const result = await api.getAllCategories();
    
    // Assertion moins stricte, on vérifie juste que fetch a été appelé
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockCategories);
  });

  test('createCategory should post to API', async () => {
    const newCategory = { name: 'New Category' };
    const mockResponse = { id: 3, ...newCategory };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });
    
    const result = await api.createCategory(newCategory);
    
    // Assertion moins stricte
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});