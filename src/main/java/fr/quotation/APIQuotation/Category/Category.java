package fr.quotation.APIQuotation.Category;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
public class Category
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Instant createdAt;

    @PrePersist
    public void onCreate()
    {
        createdAt = Instant.now();
    }

}

