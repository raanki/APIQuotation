package fr.quotation.APIQuotation.Quotation;

import fr.quotation.APIQuotation.Category.Category;
import fr.quotation.APIQuotation.Category.CategoryRepository;

public class QuotationMapper
{
    public static Quotation toEntity(QuotationDTO dto, Category category)
    {
        Quotation q = new Quotation();
        q.setContent(dto.getContent());
        q.setAuthor(dto.getAuthor());
        q.setCategory(category);
        return q;
    }

    public static QuotationDTO toDTO(Quotation q)
    {
        QuotationDTO dto = new QuotationDTO();
        dto.setContent(q.getContent());
        dto.setAuthor(q.getAuthor());
        dto.setCategoryId(q.getCategory().getId());
        return dto;
    }
}
