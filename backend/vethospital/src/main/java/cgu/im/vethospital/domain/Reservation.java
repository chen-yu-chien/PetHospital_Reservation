package cgu.im.vethospital.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Reservation {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long resid;
	
	private String date, time, symptom;

	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="doctor")
	private Doctor doctor;
	
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="pet")
	private Pet pet;

	public Reservation() {
		super();
	}

	public Reservation(String date, String time, cgu.im.vethospital.domain.Pet pet, String symptom,
			cgu.im.vethospital.domain.Doctor doctor) {
		super();
		this.date = date;
		this.time = time;
		this.pet = pet;
		this.symptom = symptom;
		this.doctor = doctor;
	}

	public Long getResid() {
		return resid;
	}

	public void setResid(Long resid) {
		this.resid = resid;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getSymptom() {
		return symptom;
	}

	public void setSymptom(String symptom) {
		this.symptom = symptom;
	}

	public Pet getPet() {
		return pet;
	}

	public void setPet(Pet pet) {
		this.pet = pet;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

}
