package fr.quotation.APIQuotation.Quotation;

import lombok.Data;

@Data
public class QuotationDTO
{
    private Integer id;
    private String content;
    private String author;
    private Integer categoryId;
    private String categoryName;
}
