package fr.quotation.APIQuotation.Category;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryCreateDTO
{
    @NotBlank(message = "name can't be null")
    private String name;
}

