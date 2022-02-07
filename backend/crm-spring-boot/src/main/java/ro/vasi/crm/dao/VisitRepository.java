package ro.vasi.crm.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ro.vasi.crm.entity.Visit;

import java.util.List;


@CrossOrigin
public interface VisitRepository extends CrudRepository<Visit, Long> {

    @Query(value = "SELECT JSON_ARRAYAGG(\n" +
            "\tJSON_OBJECT(\n" +
            "\t\t\t'id', visit.id, \n" +
            "            'data_creare_activity', data_creare_activity,\n" +
            "            'nume_client', client.nume_client,\n" +
            "            'nume_contact', nume_contact,\n" +
            "            'tip_activitate', visit.tip_activitate,\n" +
            "            'note_activity', note_activity,\n" +
            "            'promotionale', visit.promotionale, \n" +
            "            'recontactare', visit.recontactare)) \n" +
            "            FROM visit\n" +
            "            LEFT JOIN client ON visit.client_id = client.id\n" +
            "            LEFT JOIN contact ON contact.id = visit.contact_id\n" +
            "            ORDER BY data_creare_activity DESC", nativeQuery = true)
    String getVisitDTO();
}
