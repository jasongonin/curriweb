package pw.jgo.curriculumweb.repository;

import pw.jgo.curriculumweb.domain.CompetenceAplication;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompetenceAplication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompetenceAplicationRepository extends JpaRepository<CompetenceAplication, Long> {

}
