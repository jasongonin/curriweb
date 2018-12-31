package pw.jgo.curriculumweb.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(pw.jgo.curriculumweb.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Experience.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Experience.class.getName() + ".companies", jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Experience.class.getName() + ".roles", jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Experience.class.getName() + ".comptenceAplications", jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Role.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.Competence.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.CompetenceAplication.class.getName(), jcacheConfiguration);
            cm.createCache(pw.jgo.curriculumweb.domain.CompetenceAplication.class.getName() + ".comptences", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
