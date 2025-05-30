package fr.quotation.APIQuotation.Category;

public class CategoryMapper
{
    public static Category toEntity(CategoryDTO dto)
    {
        Category category = new Category();
        category.setName(dto.getName());
        return category;
    }

    public static CategoryDTO toDTO(Category entity)
    {
        CategoryDTO dto = new CategoryDTO();
        dto.setName(entity.getName());
        return dto;
    }
}

