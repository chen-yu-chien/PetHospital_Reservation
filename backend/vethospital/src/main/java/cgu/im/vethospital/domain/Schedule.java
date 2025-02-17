package cgu.im.vethospital.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Schedule {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long timeid;
	
	private String startTime, endTime;
	private Date date;
	
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="doctor")
	private Doctor doctor;
	
	public Schedule() {
		// TODO Auto-generated constructor stub
		super();
	}
	
	public Schedule(Date date, String startTime, String endTime, cgu.im.vethospital.domain.Doctor doctor) {
		super();
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.doctor = doctor;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
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
