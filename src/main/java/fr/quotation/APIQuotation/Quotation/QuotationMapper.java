package fr.quotation.APIQuotation.Quotation;

import fr.quotation.APIQuotation.Category.Category;

public class QuotationMapper
{
    public static Quotation toEntity(QuotationCreateDTO dto, Category category)
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
        dto.setId(q.getId());
        dto.setContent(q.getContent());
        dto.setAuthor(q.getAuthor());

        if (q.getCategory() != null)
        {
            dto.setCategoryId(q.getCategory().getId());
            dto.setCategoryName(q.getCategory().getName());
        }

        return dto;
    }

    public static QuotationCreateDTO toCreateDTO(Quotation q)
    {
        QuotationCreateDTO dto = new QuotationCreateDTO();
        dto.setContent(q.getContent());
        dto.setAuthor(q.getAuthor());
        dto.setCategoryId(q.getCategory().getId());
        return dto;
    }
}
