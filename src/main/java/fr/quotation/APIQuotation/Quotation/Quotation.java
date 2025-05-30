package fr.quotation.APIQuotation.Quotation;

import fr.quotation.APIQuotation.Category.Category;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
public class Quotation
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;

    private String author;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Instant createdAt;

    @PrePersist
    public void onCreate()
    {
        createdAt = Instant.now();
    }
}
