
package fr.quotation.APIQuotation.Quotation;

import fr.quotation.APIQuotation.Category.Category;
import fr.quotation.APIQuotation.Category.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuotationServiceTest {

    @Mock
    private QuotationRepository quotationRepo;

    @Mock
    private CategoryRepository categoryRepo;

    @InjectMocks
    private QuotationService service;

    private Quotation entity;
    private Category category;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        category = new Category();
        category.setId(1);
        category.setName("Inspiration");

        entity = new Quotation();
        entity.setId(1);
        entity.setContent("Quote");
        entity.setAuthor("Author");
        entity.setCategory(category);
    }

    @Test
    void shouldFindAll() {
        when(quotationRepo.findAll()).thenReturn(List.of(entity));
        assertEquals(1, service.findAll().size());
    }

    @Test
    void shouldFindById() {
        when(quotationRepo.findById(1)).thenReturn(Optional.of(entity));
        assertNotNull(service.findById(1));
    }

    @Test
    void shouldCreate() {
        QuotationDTO dto = new QuotationDTO();
        dto.setContent("Quote");
        dto.setAuthor("Author");
        dto.setCategoryId(1);

        when(categoryRepo.findById(1)).thenReturn(Optional.of(category));
        when(quotationRepo.save(any())).thenReturn(entity);

        Quotation result = service.create(dto);
        assertEquals("Quote", result.getContent());
    }

    @Test
    void shouldUpdate() {
        QuotationDTO dto = new QuotationDTO();
        dto.setContent("Updated");
        dto.setAuthor("Changed");
        dto.setCategoryId(1);

        when(quotationRepo.findById(1)).thenReturn(Optional.of(entity));
        when(categoryRepo.findById(1)).thenReturn(Optional.of(category));
        when(quotationRepo.save(any())).thenReturn(entity);

        Quotation updated = service.update(1, dto);
        assertEquals("Updated", updated.getContent());
    }

    @Test
    void shouldDelete() {
        service.delete(1);
        verify(quotationRepo, times(1)).deleteById(1);
    }

    @Test
    void shouldReturnRandom() {
        when(quotationRepo.findAll()).thenReturn(List.of(entity));
        assertNotNull(service.getRandom());
    }

    @Test
    void shouldReturnRandomByCategory() {
        when(quotationRepo.findAll()).thenReturn(List.of(entity));
        assertNotNull(service.getRandomByCategory(1));
    }
}
