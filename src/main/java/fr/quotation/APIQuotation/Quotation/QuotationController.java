package fr.quotation.APIQuotation.Quotation;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quotations")
public class QuotationController
{
    private final QuotationService service;

    public QuotationController(QuotationService service)
    {
        this.service = service;
    }

    @GetMapping
    public List<QuotationDTO> getAll()
    {
        return service.findAll().stream()
                .map(QuotationMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public QuotationDTO get(@PathVariable Integer id)
    {
        Quotation q = service.findById(id);
        return (q != null) ? QuotationMapper.toDTO(q) : null;
    }

    @PostMapping
    public QuotationDTO create(@Valid @RequestBody QuotationDTO dto)
    {
        return QuotationMapper.toDTO(service.create(dto));
    }

    @PutMapping("/{id}")
    public QuotationDTO update(@PathVariable Integer id, @Valid @RequestBody QuotationDTO dto)
    {
        return QuotationMapper.toDTO(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id)
    {
        service.delete(id);
    }

    @GetMapping("/random")
    public ResponseEntity<?> getRandom()
    {
        Quotation q = service.getRandom();
        return (q != null)
                ? ResponseEntity.ok(QuotationMapper.toDTO(q))
                : ResponseEntity.ok().body(new QuotationDTO());
    }


    @GetMapping("/random/category/{categoryId}")
    public ResponseEntity<?> getRandomByCategory(@PathVariable Integer categoryId)
    {
        Quotation q = service.getRandomByCategory(categoryId);
        return (q != null)
                ? ResponseEntity.ok(QuotationMapper.toDTO(q))
                : ResponseEntity.ok(List.of());
    }


}
