package ro.vasi.crm.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "client")
@Data
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "client")
    private List<Visit> activities;

    @OneToMany(mappedBy = "client")
    private List<Sale> sales;

    @Column(name = "nume_client")
    private String nume_client;

    @Column(name = "judet")
    private String judet;

    @Column(name = "localitate")
    private String localitate;

    @Column(name = "note_client")
    private String note_client;

    @Column(name = "industrie")
    private String industrie;

    @Column(name = "modalitate_plata")
    private String modalitate_plata;

    @Column(name = "note_plata")
    private String note_plata;



}
