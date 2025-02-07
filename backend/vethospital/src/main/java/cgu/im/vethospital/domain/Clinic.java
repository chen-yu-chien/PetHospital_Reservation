package cgu.im.vethospital.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Clinic {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long timeid;
	
	private String date, startTime, endTime;
	
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="doctor")
	private Doctor doctor;
	
	public Clinic() {
		// TODO Auto-generated constructor stub
		super();
	}
	
	public Clinic(String date, String startTime, String endTime, cgu.im.vethospital.domain.Doctor doctor) {
		super();
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.doctor = doctor;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public Long getTimeid() {
		return timeid;
	}

}
