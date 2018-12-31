package pw.jgo.curriculumweb.service;

import pw.jgo.curriculumweb.domain.CompetenceAplication;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CompetenceAplication.
 */
public interface CompetenceAplicationService {

    /**
     * Save a competenceAplication.
     *
     * @param competenceAplication the entity to save
     * @return the persisted entity
     */
    CompetenceAplication save(CompetenceAplication competenceAplication);

    /**
     * Get all the competenceAplications.
     *
     * @return the list of entities
     */
    List<CompetenceAplication> findAll();


    /**
     * Get the "id" competenceAplication.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CompetenceAplication> findOne(Long id);

    /**
     * Delete the "id" competenceAplication.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
