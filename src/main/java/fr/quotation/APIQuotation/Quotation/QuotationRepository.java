package fr.quotation.APIQuotation.Quotation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Integer>
{
}
