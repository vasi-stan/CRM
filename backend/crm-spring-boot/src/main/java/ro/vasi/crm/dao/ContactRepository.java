package ro.vasi.crm.dao;



import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ro.vasi.crm.entity.Contact;
import ro.vasi.crm.entity.Contact;

@CrossOrigin
public interface ContactRepository extends CrudRepository<Contact, Long> {
}
