
package fr.quotation.APIQuotation.Quotation;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.quotation.APIQuotation.Category.Category;
import fr.quotation.APIQuotation.Configuration.TestSecurityConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(QuotationController.class)
@Import(TestSecurityConfig.class)
class QuotationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuotationService service;

    private ObjectMapper mapper;
    private QuotationCreateDTO dto;
    private Quotation entity;
    private Category category;

    @BeforeEach
    void setup() {
        mapper = new ObjectMapper();
        dto = new QuotationCreateDTO();
        dto.setContent("Quote");
        dto.setAuthor("Author");
        dto.setCategoryId(1);

        category = new Category();
        category.setId(1);
        category.setName("Inspiration");

        entity = new Quotation();
        entity.setId(1);
        entity.setContent("Quote");
        entity.setAuthor("Author");
        entity.setCategory(category);
    }

    @Test
    void shouldGetAll() throws Exception {
        Mockito.when(service.findAll()).thenReturn(List.of(entity));
        mockMvc.perform(get("/quotations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Quote"));
    }

    @Test
    void shouldGetById() throws Exception {
        Mockito.when(service.findById(1)).thenReturn(entity);
        mockMvc.perform(get("/quotations/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.author").value("Author"));
    }

    @Test
    void shouldCreate() throws Exception {
        Mockito.when(service.create(any())).thenReturn(entity);
        mockMvc.perform(post("/quotations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Quote"));
    }

    @Test
    void shouldUpdate() throws Exception {
        Mockito.when(service.update(Mockito.eq(1), any())).thenReturn(entity);
        mockMvc.perform(put("/quotations/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Quote"));
    }

    @Test
    void shouldDelete() throws Exception {
        mockMvc.perform(delete("/quotations/1"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldGetRandom() throws Exception {
        Mockito.when(service.getRandom()).thenReturn(entity);
        mockMvc.perform(get("/quotations/random"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.author").value("Author"));
    }

    @Test
    void shouldGetRandomByCategory() throws Exception {
        Mockito.when(service.getRandomByCategory(1)).thenReturn(entity);
        mockMvc.perform(get("/quotations/random/category/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Quote"));
    }
}
