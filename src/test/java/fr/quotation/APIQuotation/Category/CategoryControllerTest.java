package fr.quotation.APIQuotation.Category;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.quotation.APIQuotation.Configuration.TestSecurityConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CategoryController.class)
@Import(TestSecurityConfig.class)
class CategoryControllerTest
{
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService service;

    private ObjectMapper mapper;
    private CategoryDTO dto;
    private Category entity;

    @BeforeEach
    void setup()
    {
        mapper = new ObjectMapper();
        dto = new CategoryDTO();
        dto.setName("Inspiration");

        entity = new Category();
        entity.setId(1);
        entity.setName("Inspiration");
    }

    @Test
    void shouldReturnAllCategories() throws Exception
    {
        Mockito.when(service.findAll()).thenReturn(List.of(entity));

        mockMvc.perform(get("/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Inspiration"));
    }

    @Test
    void shouldReturnOneCategory() throws Exception
    {
        Mockito.when(service.findById(1)).thenReturn(Optional.of(entity));

        mockMvc.perform(get("/categories/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Inspiration"));
    }

    @Test
    void shouldCreateCategory() throws Exception
    {
        Mockito.when(service.save(any())).thenReturn(entity);

        mockMvc.perform(post("/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Inspiration"));
    }

    @Test
    void shouldUpdateCategory() throws Exception
    {
        Mockito.when(service.update(Mockito.eq(1), any())).thenReturn(entity);

        mockMvc.perform(put("/categories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Inspiration"));
    }

    @Test
    void shouldDeleteCategory() throws Exception
    {
        mockMvc.perform(delete("/categories/1"))
                .andExpect(status().isOk());
    }
}
