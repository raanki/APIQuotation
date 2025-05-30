package fr.quotation.APIQuotation.Category;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/categories")
public class CategoryController
{
    private final CategoryService service;

    public CategoryController(CategoryService service)
    {
        this.service = service;
    }

    @GetMapping
    public List<CategoryDTO> getAll()
    {
        return service.findAll().stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public CategoryDTO create(@Valid @RequestBody CategoryDTO dto)
    {
        Category saved = service.save(CategoryMapper.toEntity(dto));
        return CategoryMapper.toDTO(saved);
    }

    @GetMapping("/{id}")
    public CategoryDTO get(@PathVariable Integer id)
    {
        return service.findById(id)
                .map(CategoryMapper::toDTO)
                .orElse(null);
    }

    @PutMapping("/{id}")
    public CategoryDTO update(@PathVariable Integer id, @Valid @RequestBody CategoryDTO dto)
    {
        Category updated = service.update(id, dto);
        return CategoryMapper.toDTO(updated);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id)
    {
        service.deleteById(id);
    }
}
