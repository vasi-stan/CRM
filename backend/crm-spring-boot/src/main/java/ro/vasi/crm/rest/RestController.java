package ro.vasi.crm.rest;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ro.vasi.crm.dao.ClientRepository;
import ro.vasi.crm.dao.ContactRepository;
import ro.vasi.crm.dao.SalesRepository;
import ro.vasi.crm.dao.VisitRepository;
import ro.vasi.crm.entity.Client;
import ro.vasi.crm.entity.Contact;
import ro.vasi.crm.entity.Sale;
import ro.vasi.crm.entity.Visit;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private SalesRepository saleRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/getAllVisits")
    public String sayHello() {
        return visitRepository.getVisitDTO();
    }

    @GetMapping("/getAllSales")
    public String getAllSales() {
        return saleRepository.getSalesDTO();
    }

    @PutMapping("/sales/{saleId}/{clientId}/{contactId}")
    private void updateSale(@PathVariable Long saleId,
                            @PathVariable Long clientId,
                            @PathVariable Long contactId) {
        Sale sale = saleRepository.findById(saleId).get();
        if(clientId != 0) {
            Client client = clientRepository.findById(clientId).get();
            sale.setClient(client);
        }
        if(contactId != 0) {
            Contact contact = contactRepository.findById(contactId).get();
            sale.setContact(contact);
        }
        saleRepository.save(sale);
    }

    @PutMapping("/visits/{visitId}/{clientId}/{contactId}")
    private void updateVisit(@PathVariable Long visitId,
                            @PathVariable Long clientId,
                            @PathVariable Long contactId) {
        Visit visit = visitRepository.findById(visitId).get();
        if(clientId != 0) {
            Client client = clientRepository.findById(clientId).get();
            visit.setClient(client);
        }
        if(contactId != 0) {
            Contact contact = contactRepository.findById(contactId).get();
            visit.setContact(contact);
        }
        visitRepository.save(visit);
    }

    @PostMapping("/sales/{clientId}/{contactId}")
    private void saveSaleAll(@RequestBody Sale sale,
                            @PathVariable Long clientId,
                            @PathVariable Long contactId) {
        if(clientId != 0) {
            Client client = clientRepository.findById(clientId).get();
            sale.setClient(client);
        }
        if(contactId != 0) {
            Contact contact = contactRepository.findById(contactId).get();
            sale.setContact(contact);
        }
        saleRepository.save(sale);
    }

    @PostMapping("/visits/{clientId}/{contactId}")
    private void saveVisitAll(@RequestBody Visit visit,
                             @PathVariable Long clientId,
                             @PathVariable Long contactId) {
        if(clientId != 0) {
            Client client = clientRepository.findById(clientId).get();
            visit.setClient(client);
        }
        if(contactId != 0) {
            Contact contact = contactRepository.findById(contactId).get();
            visit.setContact(contact);
        }
        visitRepository.save(visit);
    }
}
