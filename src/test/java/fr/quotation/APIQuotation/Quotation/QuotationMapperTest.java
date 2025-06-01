
package fr.quotation.APIQuotation.Quotation;

import fr.quotation.APIQuotation.Category.Category;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class QuotationMapperTest {

    @Test
    void shouldMapDtoToEntity() {
        QuotationDTO dto = new QuotationDTO();
        dto.setContent("Test");
        dto.setAuthor("Author");
        dto.setCategoryId(1);

        Category cat = new Category();
        cat.setId(1);
        cat.setName("Inspiration");

        Quotation entity = QuotationMapper.toEntity(dto, cat);
        assertEquals("Test", entity.getContent());
        assertEquals("Author", entity.getAuthor());
        assertEquals(cat, entity.getCategory());
    }

    @Test
    void shouldMapEntityToDto() {
        Category cat = new Category();
        cat.setId(1);
        cat.setName("Inspiration");

        Quotation entity = new Quotation();
        entity.setId(1);
        entity.setContent("Test");
        entity.setAuthor("Author");
        entity.setCategory(cat);

        QuotationDTO dto = QuotationMapper.toDTO(entity);
        assertEquals("Test", dto.getContent());
        assertEquals("Author", dto.getAuthor());
        assertEquals(1, dto.getCategoryId());
    }
}
