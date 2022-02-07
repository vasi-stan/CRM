package ro.vasi.crm.dao;


import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ro.vasi.crm.entity.Client;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin
public interface ClientRepository extends CrudRepository<Client, Long> {

//    @Override
//    @RolesAllowed("ROLE_ADMIN")
//    void deleteById(Long aLong);
//
//    @Override
//    @RolesAllowed("ROLE_ADMIN")
//    <S extends Client> S save(S entity);
}
