package fr.quotation.APIQuotation.Quotation;

import fr.quotation.APIQuotation.Category.Category;
import fr.quotation.APIQuotation.Category.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.Random;


import java.util.List;

@Service
public class QuotationService
{
    private final QuotationRepository quotationRepo;
    private final CategoryRepository categoryRepo;

    public QuotationService(QuotationRepository quotationRepo, CategoryRepository categoryRepo)
    {
        this.quotationRepo = quotationRepo;
        this.categoryRepo = categoryRepo;
    }

    public List<Quotation> findAll()
    {
        return quotationRepo.findAll();
    }

    public Quotation findById(Integer id)
    {
        return quotationRepo.findById(id).orElse(null);
    }

    public Quotation create(QuotationDTO dto)
    {
        Category category = categoryRepo.findById(dto.getCategoryId()).orElseThrow();
        Quotation q = QuotationMapper.toEntity(dto, category);
        return quotationRepo.save(q);
    }

    public Quotation update(Integer id, QuotationDTO dto)
    {
        Quotation q = quotationRepo.findById(id).orElseThrow();
        q.setContent(dto.getContent());
        q.setAuthor(dto.getAuthor());
        Category category = categoryRepo.findById(dto.getCategoryId()).orElseThrow();
        q.setCategory(category);
        return quotationRepo.save(q);
    }

    public void delete(Integer id)
    {
        quotationRepo.deleteById(id);
    }


    public Quotation getRandom()
    {
        List<Quotation> list = quotationRepo.findAll();
        if (list.isEmpty()) return null;
        return list.get(new Random().nextInt(list.size()));
    }

    public Quotation getRandomByCategory(Integer categoryId)
    {
        List<Quotation> list = quotationRepo.findAll()
                .stream()
                .filter(q -> q.getCategory().getId().equals(categoryId))
                .toList();

        if (list.isEmpty()) return null;
        return list.get(new Random().nextInt(list.size()));
    }

}
