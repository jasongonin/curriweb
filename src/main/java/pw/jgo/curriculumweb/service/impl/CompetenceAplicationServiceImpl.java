package pw.jgo.curriculumweb.service.impl;

import pw.jgo.curriculumweb.service.CompetenceAplicationService;
import pw.jgo.curriculumweb.domain.CompetenceAplication;
import pw.jgo.curriculumweb.repository.CompetenceAplicationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing CompetenceAplication.
 */
@Service
@Transactional
public class CompetenceAplicationServiceImpl implements CompetenceAplicationService {

    private final Logger log = LoggerFactory.getLogger(CompetenceAplicationServiceImpl.class);

    private final CompetenceAplicationRepository competenceAplicationRepository;

    public CompetenceAplicationServiceImpl(CompetenceAplicationRepository competenceAplicationRepository) {
        this.competenceAplicationRepository = competenceAplicationRepository;
    }

    /**
     * Save a competenceAplication.
     *
     * @param competenceAplication the entity to save
     * @return the persisted entity
     */
    @Override
    public CompetenceAplication save(CompetenceAplication competenceAplication) {
        log.debug("Request to save CompetenceAplication : {}", competenceAplication);
        return competenceAplicationRepository.save(competenceAplication);
    }

    /**
     * Get all the competenceAplications.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CompetenceAplication> findAll() {
        log.debug("Request to get all CompetenceAplications");
        return competenceAplicationRepository.findAll();
    }


    /**
     * Get one competenceAplication by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CompetenceAplication> findOne(Long id) {
        log.debug("Request to get CompetenceAplication : {}", id);
        return competenceAplicationRepository.findById(id);
    }

    /**
     * Delete the competenceAplication by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CompetenceAplication : {}", id);
        competenceAplicationRepository.deleteById(id);
    }
}
