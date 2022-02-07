package ro.vasi.crm.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "contact")
@Getter
@Setter
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "contact")
    private List<Visit> activities;

    @OneToMany(mappedBy = "contact")
    private List<Sale> sales;

    @Column(name = "nume_contact")
    private String nume_contact;

    @Column(name = "functie")
    private String functie;

    @Column(name = "gen")
    private String gen;

    @Column(name = "telefon")
    private String telefon;

    @Column(name = "telefon2")
    private String telefon2;

    @Column(name = "email")
    private String email;

    @Column(name = "email2")
    private String email2;

    @Column(name = "note_contact")
    private String note_contact;


}
