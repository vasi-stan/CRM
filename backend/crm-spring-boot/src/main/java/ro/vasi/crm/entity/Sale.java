package ro.vasi.crm.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;



@Entity
@Table(name = "sale")
@Data
public class Sale {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "data_sale")
    private LocalDate data_sale;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "contact_id")
    private Contact contact;

    @Column(name = "produse")
    private String produse;

    @Column(name = "valoare_fara_tva")
    private Float valoare_fara_tva;

    @Column(name = "valoare_cu_tva")
    private Float valoare_cu_tva;

    @Column(name = "procent_comision")
    private Float procent_comision;

    @Column(name = "data_livrare")
    private LocalDate data_livrare;

    @Column(name = "data_plata")
    private LocalDate data_plata;

    @Column(name = "luna_comision")
    private LocalDate luna_comision;

    @Column(name = "platit")
    private Boolean platit;

    @Column(name = "zile_plata")
    private Integer zile_plata;

    @Column(name = "tichete")
    private Integer tichete;

    @Column(name = "note_sale")
    private String note_sale;

}