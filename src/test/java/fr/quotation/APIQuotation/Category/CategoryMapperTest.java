package fr.quotation.APIQuotation.Category;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryMapperTest
{
    @Test
    void shouldConvertDtoToEntity()
    {
        CategoryDTO dto = new CategoryDTO();
        dto.setName("Inspiration");

        Category entity = CategoryMapper.toEntity(dto);
        assertEquals("Inspiration", entity.getName());
    }

    @Test
    void shouldConvertEntityToDto()
    {
        Category entity = new Category();
        entity.setName("Inspiration");

        CategoryDTO dto = CategoryMapper.toDTO(entity);
        assertEquals("Inspiration", dto.getName());
    }
}
