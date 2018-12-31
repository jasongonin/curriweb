package pw.jgo.curriculumweb.service;

import pw.jgo.curriculumweb.domain.Competence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Competence.
 */
public interface CompetenceService {

    /**
     * Save a competence.
     *
     * @param competence the entity to save
     * @return the persisted entity
     */
    Competence save(Competence competence);

    /**
     * Get all the competences.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Competence> findAll(Pageable pageable);


    /**
     * Get the "id" competence.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Competence> findOne(Long id);

    /**
     * Delete the "id" competence.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
