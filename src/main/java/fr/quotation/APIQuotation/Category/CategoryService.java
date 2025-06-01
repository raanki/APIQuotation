package fr.quotation.APIQuotation.Category;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService
{
    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository)
    {
        this.repository = repository;
    }

    public List<Category> findAll()
    {
        return repository.findAll();
    }

    public Optional<Category> findById(Integer id)
    {
        return repository.findById(id);
    }

    public Category save(Category category)
    {
        return repository.save(category);
    }

    public void deleteById(Integer id)
    {
        repository.deleteById(id);
    }

    public Category update(Integer id, CategoryCreateDTO dto)
    {
        Category category = repository.findById(id).orElseThrow();
        category.setName(dto.getName());
        return repository.save(category);
    }

}
