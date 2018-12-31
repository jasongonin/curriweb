package pw.jgo.curriculumweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Competence.
 */
@Entity
@Table(name = "competence")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Competence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "comp_name", nullable = false)
    private Integer compName;

    @Column(name = "comp_desc")
    private String compDesc;

    @ManyToOne
    @JsonIgnoreProperties("comptences")
    private CompetenceAplication competenceAplication;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCompName() {
        return compName;
    }

    public Competence compName(Integer compName) {
        this.compName = compName;
        return this;
    }

    public void setCompName(Integer compName) {
        this.compName = compName;
    }

    public String getCompDesc() {
        return compDesc;
    }

    public Competence compDesc(String compDesc) {
        this.compDesc = compDesc;
        return this;
    }

    public void setCompDesc(String compDesc) {
        this.compDesc = compDesc;
    }

    public CompetenceAplication getCompetenceAplication() {
        return competenceAplication;
    }

    public Competence competenceAplication(CompetenceAplication competenceAplication) {
        this.competenceAplication = competenceAplication;
        return this;
    }

    public void setCompetenceAplication(CompetenceAplication competenceAplication) {
        this.competenceAplication = competenceAplication;
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
        Competence competence = (Competence) o;
        if (competence.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), competence.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Competence{" +
            "id=" + getId() +
            ", compName=" + getCompName() +
            ", compDesc='" + getCompDesc() + "'" +
            "}";
    }
}
