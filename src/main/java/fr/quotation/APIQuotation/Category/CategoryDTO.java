package fr.quotation.APIQuotation.Category;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryDTO
{
    @NotBlank(message = "name can't be null")
    private String name;
}

