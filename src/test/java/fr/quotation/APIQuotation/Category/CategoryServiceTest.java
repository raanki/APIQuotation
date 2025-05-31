package fr.quotation.APIQuotation.Category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoryServiceTest
{
    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryService service;

    private Category entity;

    @BeforeEach
    void setup()
    {
        MockitoAnnotations.openMocks(this);
        entity = new Category();
        entity.setId(1);
        entity.setName("Inspiration");
    }

    @Test
    void shouldFindAll()
    {
        when(repository.findAll()).thenReturn(List.of(entity));
        assertEquals(1, service.findAll().size());
    }

    @Test
    void shouldFindById()
    {
        when(repository.findById(1)).thenReturn(Optional.of(entity));
        assertTrue(service.findById(1).isPresent());
    }

    @Test
    void shouldSave()
    {
        when(repository.save(any())).thenReturn(entity);
        Category result = service.save(entity);
        assertEquals("Inspiration", result.getName());
    }

    @Test
    void shouldUpdate()
    {
        when(repository.findById(1)).thenReturn(Optional.of(entity));
        when(repository.save(any())).thenReturn(entity);

        CategoryDTO dto = new CategoryDTO();
        dto.setName("Updated");

        Category result = service.update(1, dto);
        assertEquals("Updated", result.getName());
    }


    @Test
    void shouldDelete()
    {
        service.deleteById(1);
        verify(repository, times(1)).deleteById(1);
    }
}
