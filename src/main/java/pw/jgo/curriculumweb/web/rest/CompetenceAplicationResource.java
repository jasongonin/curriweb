package pw.jgo.curriculumweb.web.rest;

import com.codahale.metrics.annotation.Timed;
import pw.jgo.curriculumweb.domain.CompetenceAplication;
import pw.jgo.curriculumweb.service.CompetenceAplicationService;
import pw.jgo.curriculumweb.web.rest.errors.BadRequestAlertException;
import pw.jgo.curriculumweb.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CompetenceAplication.
 */
@RestController
@RequestMapping("/api")
public class CompetenceAplicationResource {

    private final Logger log = LoggerFactory.getLogger(CompetenceAplicationResource.class);

    private static final String ENTITY_NAME = "competenceAplication";

    private final CompetenceAplicationService competenceAplicationService;

    public CompetenceAplicationResource(CompetenceAplicationService competenceAplicationService) {
        this.competenceAplicationService = competenceAplicationService;
    }

    /**
     * POST  /competence-aplications : Create a new competenceAplication.
     *
     * @param competenceAplication the competenceAplication to create
     * @return the ResponseEntity with status 201 (Created) and with body the new competenceAplication, or with status 400 (Bad Request) if the competenceAplication has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/competence-aplications")
    @Timed
    public ResponseEntity<CompetenceAplication> createCompetenceAplication(@Valid @RequestBody CompetenceAplication competenceAplication) throws URISyntaxException {
        log.debug("REST request to save CompetenceAplication : {}", competenceAplication);
        if (competenceAplication.getId() != null) {
            throw new BadRequestAlertException("A new competenceAplication cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompetenceAplication result = competenceAplicationService.save(competenceAplication);
        return ResponseEntity.created(new URI("/api/competence-aplications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /competence-aplications : Updates an existing competenceAplication.
     *
     * @param competenceAplication the competenceAplication to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated competenceAplication,
     * or with status 400 (Bad Request) if the competenceAplication is not valid,
     * or with status 500 (Internal Server Error) if the competenceAplication couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/competence-aplications")
    @Timed
    public ResponseEntity<CompetenceAplication> updateCompetenceAplication(@Valid @RequestBody CompetenceAplication competenceAplication) throws URISyntaxException {
        log.debug("REST request to update CompetenceAplication : {}", competenceAplication);
        if (competenceAplication.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompetenceAplication result = competenceAplicationService.save(competenceAplication);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, competenceAplication.getId().toString()))
            .body(result);
    }

    /**
     * GET  /competence-aplications : get all the competenceAplications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of competenceAplications in body
     */
    @GetMapping("/competence-aplications")
    @Timed
    public List<CompetenceAplication> getAllCompetenceAplications() {
        log.debug("REST request to get all CompetenceAplications");
        return competenceAplicationService.findAll();
    }

    /**
     * GET  /competence-aplications/:id : get the "id" competenceAplication.
     *
     * @param id the id of the competenceAplication to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the competenceAplication, or with status 404 (Not Found)
     */
    @GetMapping("/competence-aplications/{id}")
    @Timed
    public ResponseEntity<CompetenceAplication> getCompetenceAplication(@PathVariable Long id) {
        log.debug("REST request to get CompetenceAplication : {}", id);
        Optional<CompetenceAplication> competenceAplication = competenceAplicationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(competenceAplication);
    }

    /**
     * DELETE  /competence-aplications/:id : delete the "id" competenceAplication.
     *
     * @param id the id of the competenceAplication to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/competence-aplications/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompetenceAplication(@PathVariable Long id) {
        log.debug("REST request to delete CompetenceAplication : {}", id);
        competenceAplicationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
