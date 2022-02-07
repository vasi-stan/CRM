package ro.vasi.crm.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ro.vasi.crm.entity.Sale;


@CrossOrigin
public interface SalesRepository extends CrudRepository<Sale, Long> {

    @Query(value = "SELECT JSON_ARRAYAGG(\n" +
            "\tJSON_OBJECT(\n" +
            "\t\t\t'id', sale.id, \n" +
            "            'nume_client', client.nume_client,\n" +
            "            'nume_contact', nume_contact,\n" +
            "            'data_sale', data_sale,\n" +
            "            'produse', produse,\n" +
            "            'valoare_fara_tva', valoare_fara_tva,\n" +
            "            'valoare_cu_tva', valoare_cu_tva,\n" +
            "            'procent_comision', procent_comision,\n" +
            "            'data_livrare', data_livrare, \n" +
            "            'data_plata', data_plata,\n" +
            "            'luna_comision', luna_comision,\n" +
            "            'platit', platit,\n" +
            "            'zile_plata', zile_plata,\n" +
            "            'tichete', tichete,\n" +
            "            'note_sale', note_sale\n" +
            "            )) \n" +
            "            FROM sale\n" +
            "            LEFT JOIN client ON sale.client_id = client.id\n" +
            "            LEFT JOIN contact ON contact.id = sale.contact_id\n" +
            "            ORDER BY data_sale DESC", nativeQuery = true)
    String getSalesDTO();


}