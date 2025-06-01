package fr.quotation.APIQuotation.Category;

public class CategoryMapper
{
    public static Category toEntity(CategoryCreateDTO dto)
    {
        Category category = new Category();
        category.setName(dto.getName());
        return category;
    }

    public static CategoryCreateDTO toCreateDTO(Category entity)
    {
        CategoryCreateDTO dto = new CategoryCreateDTO();
        dto.setName(entity.getName());
        return dto;
    }

    public static CategoryDTO toDTO(Category entity)
    {
        CategoryDTO dto = new CategoryDTO();
        dto.setName(entity.getName());
        dto.setId(entity.getId());
        return dto;
    }
}

