package fr.quotation.APIQuotation.Quotation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class QuotationCreateDTO
{
    @NotBlank
    private String content;

    private String author;

    @NotNull
    private Integer categoryId;
}
