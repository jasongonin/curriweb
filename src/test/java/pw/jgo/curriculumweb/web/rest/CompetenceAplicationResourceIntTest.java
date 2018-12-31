package pw.jgo.curriculumweb.web.rest;

import pw.jgo.curriculumweb.CurriculumwebApp;

import pw.jgo.curriculumweb.domain.CompetenceAplication;
import pw.jgo.curriculumweb.repository.CompetenceAplicationRepository;
import pw.jgo.curriculumweb.service.CompetenceAplicationService;
import pw.jgo.curriculumweb.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static pw.jgo.curriculumweb.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CompetenceAplicationResource REST controller.
 *
 * @see CompetenceAplicationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CurriculumwebApp.class)
public class CompetenceAplicationResourceIntTest {

    private static final Integer DEFAULT_COMP_APLI_NAME = 1;
    private static final Integer UPDATED_COMP_APLI_NAME = 2;

    private static final Integer DEFAULT_COMP_APLI_LEVEL = 1;
    private static final Integer UPDATED_COMP_APLI_LEVEL = 2;

    private static final String DEFAULT_COMP_APLI_DESC = "AAAAAAAAAA";
    private static final String UPDATED_COMP_APLI_DESC = "BBBBBBBBBB";

    @Autowired
    private CompetenceAplicationRepository competenceAplicationRepository;

    @Autowired
    private CompetenceAplicationService competenceAplicationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCompetenceAplicationMockMvc;

    private CompetenceAplication competenceAplication;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompetenceAplicationResource competenceAplicationResource = new CompetenceAplicationResource(competenceAplicationService);
        this.restCompetenceAplicationMockMvc = MockMvcBuilders.standaloneSetup(competenceAplicationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompetenceAplication createEntity(EntityManager em) {
        CompetenceAplication competenceAplication = new CompetenceAplication()
            .compApliName(DEFAULT_COMP_APLI_NAME)
            .compApliLevel(DEFAULT_COMP_APLI_LEVEL)
            .compApliDesc(DEFAULT_COMP_APLI_DESC);
        return competenceAplication;
    }

    @Before
    public void initTest() {
        competenceAplication = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompetenceAplication() throws Exception {
        int databaseSizeBeforeCreate = competenceAplicationRepository.findAll().size();

        // Create the CompetenceAplication
        restCompetenceAplicationMockMvc.perform(post("/api/competence-aplications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competenceAplication)))
            .andExpect(status().isCreated());

        // Validate the CompetenceAplication in the database
        List<CompetenceAplication> competenceAplicationList = competenceAplicationRepository.findAll();
        assertThat(competenceAplicationList).hasSize(databaseSizeBeforeCreate + 1);
        CompetenceAplication testCompetenceAplication = competenceAplicationList.get(competenceAplicationList.size() - 1);
        assertThat(testCompetenceAplication.getCompApliName()).isEqualTo(DEFAULT_COMP_APLI_NAME);
        assertThat(testCompetenceAplication.getCompApliLevel()).isEqualTo(DEFAULT_COMP_APLI_LEVEL);
        assertThat(testCompetenceAplication.getCompApliDesc()).isEqualTo(DEFAULT_COMP_APLI_DESC);
    }

    @Test
    @Transactional
    public void createCompetenceAplicationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = competenceAplicationRepository.findAll().size();

        // Create the CompetenceAplication with an existing ID
        competenceAplication.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompetenceAplicationMockMvc.perform(post("/api/competence-aplications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competenceAplication)))
            .andExpect(status().isBadRequest());

        // Validate the CompetenceAplication in the database
        List<CompetenceAplication> competenceAplicationList = competenceAplicationRepository.findAll();
        assertThat(competenceAplicationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCompApliNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = competenceAplicationRepository.findAll().size();
        // set the field null
        competenceAplication.setCompApliName(null);

        // Create the CompetenceAplication, which fails.

        restCompetenceAplicationMockMvc.perform(post("/api/competence-aplications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competenceAplication)))
            .andExpect(status().isBadRequest());

        List<CompetenceAplication> competenceAplicationList = competenceAplicationRepository.findAll();
        assertThat(competenceAplicationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCompApliLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = competenceAplicationRepository.findAll().size();
        // set the field null
        competenceAplication.setCompApliLevel(null);

        // Create the CompetenceAplication, which fails.

        restCompetenceAplicationMockMvc.perform(post("/api/competence-aplications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competenceAplication)))
            .andExpect(status().isBadRequest());

        List<CompetenceAplication> competenceAplicationList = competenceAplicationRepository.findAll();
        assertThat(competenceAplicationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCompetenceAplications() throws Exception {
        // Initialize the database
        competenceAplicationRepository.saveAndFlush(competenceAplication);

        // Get all the competenceAplicationList
        restCompetenceAplicationMockMvc.perform(get("/api/competence-aplications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(competenceAplication.getId().intValue())))
            .andExpect(jsonPath("$.[*].compApliName").value(hasItem(DEFAULT_COMP_APLI_NAME)))
            .andExpect(jsonPath("$.[*].compApliLevel").value(hasItem(DEFAULT_COMP_APLI_LEVEL)))
            .andExpect(jsonPath("$.[*].compApliDesc").value(hasItem(DEFAULT_COMP_APLI_DESC.toString())));
    }
    
    @Test
    @Transactional
    public void getCompetenceAplication() throws Exception {
        // Initialize the database
        competenceAplicationRepository.saveAndFlush(competenceAplication);

        // Get the competenceAplication
        restCompetenceAplicationMockMvc.perform(get("/api/competence-aplications/{id}", competenceAplication.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(competenceAplication.getId().intValue()))
            .andExpect(jsonPath("$.compApliName").value(DEFAULT_COMP_APLI_NAME))
            .andExpect(jsonPath("$.compApliLevel").value(DEFAULT_COMP_APLI_LEVEL))
            .andExpect(jsonPath("$.compApliDesc").value(DEFAULT_COMP_APLI_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompetenceAplication() throws Exception {
        // Get the competenceAplication
        restCompetenceAplicationMockMvc.perform(get("/api/competence-aplications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompetenceAplication() throws Exception {
        // Initialize the database
        competenceAplicationService.save(competenceAplication);

        int databaseSizeBeforeUpdate = competenceAplicationRepository.findAll().size();

        // Update the competenceAplication
        CompetenceAplication updatedCompetenceAplication = competenceAplicationRepository.findById(competenceAplication.getId()).get();
        // Disconnect from session so that the updates on updatedCompetenceAplication are not directly saved in db
        em.detach(updatedCompetenceAplication);
        updatedCompetenceAplication
            .compApliName(UPDATED_COMP_APLI_NAME)
            .compApliLevel(UPDATED_COMP_APLI_LEVEL)
            .compApliDesc(UPDATED_COMP_APLI_DESC);

        restCompetenceAplicationMockMvc.perform(put("/api/competence-aplications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompetenceAplication)))
            .andExpect(status().isOk());

        // Validate the CompetenceAplication in the database
        List<CompetenceAplication> competenceAplicationList = competenceAplicationRepository.findAll();
        assertThat(competenceAplicationList).hasSize(databaseSizeBeforeUpdate);
        CompetenceAplication testCompetenceAplication = competenceAplicationList.get(competenceAplicationList.size() - 1);
        assertThat(testCompetenceAplication.getCompApliName()).isEqualTo(UPDATED_COMP_APLI_NAME);
        assertThat(testCompetenceAplication.getCompApliLevel()).isEqualTo(UPDATED_COMP_APLI_LEVEL);
        assertThat(testCompetenceAplication.getCompApliDesc()).isEqualTo(UPDATED_COMP_APLI_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingCompetenceAplication() throws Exception {
        int databaseSizeBeforeUpdate = competenceAplicationRepository.findAll().size();

        // Create the CompetenceAplication

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompetenceAplicationMockMvc.perform(put("/api/competence-aplications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competenceAplication)))
            .andExpect(status().isBadRequest());

        // Validate the CompetenceAplication in the database
        List<CompetenceAplication> competenceAplicationList = competenceAplicationRepository.findAll();
        assertThat(competenceAplicationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompetenceAplication() throws Exception {
        // Initialize the database
        competenceAplicationService.save(competenceAplication);

        int databaseSizeBeforeDelete = competenceAplicationRepository.findAll().size();

        // Get the competenceAplication
        restCompetenceAplicationMockMvc.perform(delete("/api/competence-aplications/{id}", competenceAplication.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompetenceAplication> competenceAplicationList = competenceAplicationRepository.findAll();
        assertThat(competenceAplicationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompetenceAplication.class);
        CompetenceAplication competenceAplication1 = new CompetenceAplication();
        competenceAplication1.setId(1L);
        CompetenceAplication competenceAplication2 = new CompetenceAplication();
        competenceAplication2.setId(competenceAplication1.getId());
        assertThat(competenceAplication1).isEqualTo(competenceAplication2);
        competenceAplication2.setId(2L);
        assertThat(competenceAplication1).isNotEqualTo(competenceAplication2);
        competenceAplication1.setId(null);
        assertThat(competenceAplication1).isNotEqualTo(competenceAplication2);
    }
}
