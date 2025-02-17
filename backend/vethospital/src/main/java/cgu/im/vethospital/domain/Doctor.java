package cgu.im.vethospital.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Doctor {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long doctorid;
	
	private String name, department;

	@JsonIgnore
	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Schedule> clinicTimes;

	@JsonIgnore
	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Reservation> reservations;
	
	public Doctor() {
		super();
	}
	
	public Doctor(String name, String department) {
		super();
		this.name = name;
		this.department = department;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Long getDoctorid() {
		return doctorid;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	public List<Schedule> getClinicTimes() {
		return clinicTimes;
	}

	public void setClinicTimes(List<Schedule> clinicTimes) {
		this.clinicTimes = clinicTimes;
	}

}
