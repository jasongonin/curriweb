package pw.jgo.curriculumweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Experience.
 */
@Entity
@Table(name = "experience")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "inicial", nullable = false)
    private LocalDate inicial;

    @Column(name = "jhi_end")
    private LocalDate end;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "city")
    private String city;

    @OneToOne    @JoinColumn(unique = true)
    private Company company;

    @OneToMany(mappedBy = "experience")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Company> companies = new HashSet<>();
    @OneToMany(mappedBy = "experience")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Role> roles = new HashSet<>();
    @OneToMany(mappedBy = "experience")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CompetenceAplication> comptenceAplications = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getInicial() {
        return inicial;
    }

    public Experience inicial(LocalDate inicial) {
        this.inicial = inicial;
        return this;
    }

    public void setInicial(LocalDate inicial) {
        this.inicial = inicial;
    }

    public LocalDate getEnd() {
        return end;
    }

    public Experience end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public String getCountryName() {
        return countryName;
    }

    public Experience countryName(String countryName) {
        this.countryName = countryName;
        return this;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getCity() {
        return city;
    }

    public Experience city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Company getCompany() {
        return company;
    }

    public Experience company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public Experience companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public Experience addCompany(Company company) {
        this.companies.add(company);
        company.setExperience(this);
        return this;
    }

    public Experience removeCompany(Company company) {
        this.companies.remove(company);
        company.setExperience(null);
        return this;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Experience roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Experience addRole(Role role) {
        this.roles.add(role);
        role.setExperience(this);
        return this;
    }

    public Experience removeRole(Role role) {
        this.roles.remove(role);
        role.setExperience(null);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<CompetenceAplication> getComptenceAplications() {
        return comptenceAplications;
    }

    public Experience comptenceAplications(Set<CompetenceAplication> competenceAplications) {
        this.comptenceAplications = competenceAplications;
        return this;
    }

    public Experience addComptenceAplication(CompetenceAplication competenceAplication) {
        this.comptenceAplications.add(competenceAplication);
        competenceAplication.setExperience(this);
        return this;
    }

    public Experience removeComptenceAplication(CompetenceAplication competenceAplication) {
        this.comptenceAplications.remove(competenceAplication);
        competenceAplication.setExperience(null);
        return this;
    }

    public void setComptenceAplications(Set<CompetenceAplication> competenceAplications) {
        this.comptenceAplications = competenceAplications;
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
        Experience experience = (Experience) o;
        if (experience.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), experience.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Experience{" +
            "id=" + getId() +
            ", inicial='" + getInicial() + "'" +
            ", end='" + getEnd() + "'" +
            ", countryName='" + getCountryName() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
