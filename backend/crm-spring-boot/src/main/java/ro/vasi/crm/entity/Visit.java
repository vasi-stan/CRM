package ro.vasi.crm.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "visit")
@Data
public class Visit {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "data_creare_activity")
    private LocalDate data_creare_activity;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "contact_id")
    private Contact contact;


    @Column(name = "tip_activitate")
    private String tip_activitate;

    @Column(name = "note_activity")
    private String note_activity;

    @Column(name = "promotionale")
    private String promotionale;

    @Column(name = "recontactare")
    private LocalDate recontactare;

}
