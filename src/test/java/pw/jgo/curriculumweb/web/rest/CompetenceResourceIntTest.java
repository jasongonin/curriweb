package pw.jgo.curriculumweb.web.rest;

import pw.jgo.curriculumweb.CurriculumwebApp;

import pw.jgo.curriculumweb.domain.Competence;
import pw.jgo.curriculumweb.repository.CompetenceRepository;
import pw.jgo.curriculumweb.service.CompetenceService;
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
 * Test class for the CompetenceResource REST controller.
 *
 * @see CompetenceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CurriculumwebApp.class)
public class CompetenceResourceIntTest {

    private static final Integer DEFAULT_COMP_NAME = 1;
    private static final Integer UPDATED_COMP_NAME = 2;

    private static final String DEFAULT_COMP_DESC = "AAAAAAAAAA";
    private static final String UPDATED_COMP_DESC = "BBBBBBBBBB";

    @Autowired
    private CompetenceRepository competenceRepository;

    @Autowired
    private CompetenceService competenceService;

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

    private MockMvc restCompetenceMockMvc;

    private Competence competence;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompetenceResource competenceResource = new CompetenceResource(competenceService);
        this.restCompetenceMockMvc = MockMvcBuilders.standaloneSetup(competenceResource)
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
    public static Competence createEntity(EntityManager em) {
        Competence competence = new Competence()
            .compName(DEFAULT_COMP_NAME)
            .compDesc(DEFAULT_COMP_DESC);
        return competence;
    }

    @Before
    public void initTest() {
        competence = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompetence() throws Exception {
        int databaseSizeBeforeCreate = competenceRepository.findAll().size();

        // Create the Competence
        restCompetenceMockMvc.perform(post("/api/competences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competence)))
            .andExpect(status().isCreated());

        // Validate the Competence in the database
        List<Competence> competenceList = competenceRepository.findAll();
        assertThat(competenceList).hasSize(databaseSizeBeforeCreate + 1);
        Competence testCompetence = competenceList.get(competenceList.size() - 1);
        assertThat(testCompetence.getCompName()).isEqualTo(DEFAULT_COMP_NAME);
        assertThat(testCompetence.getCompDesc()).isEqualTo(DEFAULT_COMP_DESC);
    }

    @Test
    @Transactional
    public void createCompetenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = competenceRepository.findAll().size();

        // Create the Competence with an existing ID
        competence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompetenceMockMvc.perform(post("/api/competences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competence)))
            .andExpect(status().isBadRequest());

        // Validate the Competence in the database
        List<Competence> competenceList = competenceRepository.findAll();
        assertThat(competenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCompNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = competenceRepository.findAll().size();
        // set the field null
        competence.setCompName(null);

        // Create the Competence, which fails.

        restCompetenceMockMvc.perform(post("/api/competences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competence)))
            .andExpect(status().isBadRequest());

        List<Competence> competenceList = competenceRepository.findAll();
        assertThat(competenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCompetences() throws Exception {
        // Initialize the database
        competenceRepository.saveAndFlush(competence);

        // Get all the competenceList
        restCompetenceMockMvc.perform(get("/api/competences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(competence.getId().intValue())))
            .andExpect(jsonPath("$.[*].compName").value(hasItem(DEFAULT_COMP_NAME)))
            .andExpect(jsonPath("$.[*].compDesc").value(hasItem(DEFAULT_COMP_DESC.toString())));
    }
    
    @Test
    @Transactional
    public void getCompetence() throws Exception {
        // Initialize the database
        competenceRepository.saveAndFlush(competence);

        // Get the competence
        restCompetenceMockMvc.perform(get("/api/competences/{id}", competence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(competence.getId().intValue()))
            .andExpect(jsonPath("$.compName").value(DEFAULT_COMP_NAME))
            .andExpect(jsonPath("$.compDesc").value(DEFAULT_COMP_DESC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompetence() throws Exception {
        // Get the competence
        restCompetenceMockMvc.perform(get("/api/competences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompetence() throws Exception {
        // Initialize the database
        competenceService.save(competence);

        int databaseSizeBeforeUpdate = competenceRepository.findAll().size();

        // Update the competence
        Competence updatedCompetence = competenceRepository.findById(competence.getId()).get();
        // Disconnect from session so that the updates on updatedCompetence are not directly saved in db
        em.detach(updatedCompetence);
        updatedCompetence
            .compName(UPDATED_COMP_NAME)
            .compDesc(UPDATED_COMP_DESC);

        restCompetenceMockMvc.perform(put("/api/competences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompetence)))
            .andExpect(status().isOk());

        // Validate the Competence in the database
        List<Competence> competenceList = competenceRepository.findAll();
        assertThat(competenceList).hasSize(databaseSizeBeforeUpdate);
        Competence testCompetence = competenceList.get(competenceList.size() - 1);
        assertThat(testCompetence.getCompName()).isEqualTo(UPDATED_COMP_NAME);
        assertThat(testCompetence.getCompDesc()).isEqualTo(UPDATED_COMP_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingCompetence() throws Exception {
        int databaseSizeBeforeUpdate = competenceRepository.findAll().size();

        // Create the Competence

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompetenceMockMvc.perform(put("/api/competences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competence)))
            .andExpect(status().isBadRequest());

        // Validate the Competence in the database
        List<Competence> competenceList = competenceRepository.findAll();
        assertThat(competenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompetence() throws Exception {
        // Initialize the database
        competenceService.save(competence);

        int databaseSizeBeforeDelete = competenceRepository.findAll().size();

        // Get the competence
        restCompetenceMockMvc.perform(delete("/api/competences/{id}", competence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Competence> competenceList = competenceRepository.findAll();
        assertThat(competenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Competence.class);
        Competence competence1 = new Competence();
        competence1.setId(1L);
        Competence competence2 = new Competence();
        competence2.setId(competence1.getId());
        assertThat(competence1).isEqualTo(competence2);
        competence2.setId(2L);
        assertThat(competence1).isNotEqualTo(competence2);
        competence1.setId(null);
        assertThat(competence1).isNotEqualTo(competence2);
    }
}
