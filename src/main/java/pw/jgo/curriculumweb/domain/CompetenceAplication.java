package pw.jgo.curriculumweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CompetenceAplication.
 */
@Entity
@Table(name = "competence_aplication")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CompetenceAplication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "comp_apli_name", nullable = false)
    private Integer compApliName;

    @NotNull
    @Column(name = "comp_apli_level", nullable = false)
    private Integer compApliLevel;

    @Column(name = "comp_apli_desc")
    private String compApliDesc;

    @ManyToOne
    @JsonIgnoreProperties("comptenceAplications")
    private Experience experience;

    @OneToMany(mappedBy = "competenceAplication")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Competence> comptences = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCompApliName() {
        return compApliName;
    }

    public CompetenceAplication compApliName(Integer compApliName) {
        this.compApliName = compApliName;
        return this;
    }

    public void setCompApliName(Integer compApliName) {
        this.compApliName = compApliName;
    }

    public Integer getCompApliLevel() {
        return compApliLevel;
    }

    public CompetenceAplication compApliLevel(Integer compApliLevel) {
        this.compApliLevel = compApliLevel;
        return this;
    }

    public void setCompApliLevel(Integer compApliLevel) {
        this.compApliLevel = compApliLevel;
    }

    public String getCompApliDesc() {
        return compApliDesc;
    }

    public CompetenceAplication compApliDesc(String compApliDesc) {
        this.compApliDesc = compApliDesc;
        return this;
    }

    public void setCompApliDesc(String compApliDesc) {
        this.compApliDesc = compApliDesc;
    }

    public Experience getExperience() {
        return experience;
    }

    public CompetenceAplication experience(Experience experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(Experience experience) {
        this.experience = experience;
    }

    public Set<Competence> getComptences() {
        return comptences;
    }

    public CompetenceAplication comptences(Set<Competence> competences) {
        this.comptences = competences;
        return this;
    }

    public CompetenceAplication addComptence(Competence competence) {
        this.comptences.add(competence);
        competence.setCompetenceAplication(this);
        return this;
    }

    public CompetenceAplication removeComptence(Competence competence) {
        this.comptences.remove(competence);
        competence.setCompetenceAplication(null);
        return this;
    }

    public void setComptences(Set<Competence> competences) {
        this.comptences = competences;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CompetenceAplication competenceAplication = (CompetenceAplication) o;
        if (competenceAplication.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), competenceAplication.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompetenceAplication{" +
            "id=" + getId() +
            ", compApliName=" + getCompApliName() +
            ", compApliLevel=" + getCompApliLevel() +
            ", compApliDesc='" + getCompApliDesc() + "'" +
            "}";
    }
}
