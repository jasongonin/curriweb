package pw.jgo.curriculumweb.service.impl;

import pw.jgo.curriculumweb.service.CompetenceService;
import pw.jgo.curriculumweb.domain.Competence;
import pw.jgo.curriculumweb.repository.CompetenceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Competence.
 */
@Service
@Transactional
public class CompetenceServiceImpl implements CompetenceService {

    private final Logger log = LoggerFactory.getLogger(CompetenceServiceImpl.class);

    private final CompetenceRepository competenceRepository;

    public CompetenceServiceImpl(CompetenceRepository competenceRepository) {
        this.competenceRepository = competenceRepository;
    }

    /**
     * Save a competence.
     *
     * @param competence the entity to save
     * @return the persisted entity
     */
    @Override
    public Competence save(Competence competence) {
        log.debug("Request to save Competence : {}", competence);
        return competenceRepository.save(competence);
    }

    /**
     * Get all the competences.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Competence> findAll(Pageable pageable) {
        log.debug("Request to get all Competences");
        return competenceRepository.findAll(pageable);
    }


    /**
     * Get one competence by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Competence> findOne(Long id) {
        log.debug("Request to get Competence : {}", id);
        return competenceRepository.findById(id);
    }

    /**
     * Delete the competence by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Competence : {}", id);
        competenceRepository.deleteById(id);
    }
}
