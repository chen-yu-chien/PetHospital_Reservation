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
	
	private String date, time, petname, ownername, tel;

	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="doctor")
	private Doctor doctor;

	public Reservation() {
		super();
	}

	public Reservation(String date, String time, String petname, String ownername, String tel,
			cgu.im.vethospital.domain.Doctor doctor) {
		super();
		this.date = date;
		this.time = time;
		this.petname = petname;
		this.ownername = ownername;
		this.tel = tel;
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

	public String getPetname() {
		return petname;
	}

	public void setPetname(String petname) {
		this.petname = petname;
	}

	public String getOwnername() {
		return ownername;
	}

	public void setOwnername(String ownername) {
		this.ownername = ownername;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

}
