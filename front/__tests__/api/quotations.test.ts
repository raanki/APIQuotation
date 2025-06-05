import * as api from '../../api/quotations';

// Mock fetch
global.fetch = jest.fn();

describe('Quotations API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('getQuotations should fetch quotations from API', async () => {
    const mockQuotations = [
      { id: 1, content: 'Test quote 1', author: 'Author 1' },
      { id: 2, content: 'Test quote 2', author: 'Author 2' }
    ];
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuotations
    });
    
    const result = await api.getAllQuotations(); // Correction ici
    
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockQuotations);
  });

  test('getQuotationById should fetch a single quotation', async () => {
    const mockQuotation = { id: 1, content: 'Test quote', author: 'Test Author' };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuotation
    });
    
    const result = await api.getQuotationById(1);
    
    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(mockQuotation);
  });

  test('createQuotation should post to API', async () => {
    const newQuotation = { content: 'New quote', author: 'New Author', categoryId: 1 };
    const mockResponse = { id: 3, ...newQuotation };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });
    
    const result = await api.createQuotation(newQuotation);
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('quotations'),
      expect.objectContaining({
        method: 'POST'
      })
    );
    expect(result).toEqual(mockResponse);
  });

  test('updateQuotation should put to API', async () => {
    const updatedQuotation = { content: 'Updated quote', author: 'Updated Author', categoryId: 2 };
    const mockResponse = { id: 1, ...updatedQuotation };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });
    
    const result = await api.updateQuotation(1, updatedQuotation);
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('quotations/1'),
      expect.objectContaining({
        method: 'PUT'
      })
    );
    expect(result).toEqual(mockResponse);
  });

  test('deleteQuotation should send delete request', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });
    
    await api.deleteQuotation(1);
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('quotations/1'),
      expect.objectContaining({
        method: 'DELETE'
      })
    );
  });
});