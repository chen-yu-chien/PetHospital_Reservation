package cgu.im.vethospital.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
//import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Pet {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long petid;
	
	private String name, type, birthday, waferid, feature, vaccineDate;
	private int gender, sterilize;
	
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="owner")
	private Owner owner;
	
    @OneToMany(cascade=CascadeType.ALL, mappedBy="pet")
	@JsonIgnore
    private List<Reservation> res;
	
	public Pet() {
		super();
	}

	public Pet(String name, int gender, String type, String birthday, String waferid, String feature, int sterilize,
			String vaccineDate, cgu.im.vethospital.domain.Owner owner) {
		super();
		this.name = name;
		this.gender = gender;
		this.type = type;
		this.birthday = birthday;
		this.waferid = waferid;
		this.feature = feature;
		this.sterilize = sterilize;
		this.vaccineDate = vaccineDate;
		this.owner = owner;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getWaferid() {
		return waferid;
	}

	public void setWaferid(String waferid) {
		this.waferid = waferid;
	}

	public String getFeature() {
		return feature;
	}

	public void setFeature(String feature) {
		this.feature = feature;
	}

	public Owner getOwner() {
		return owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	public String getVaccineDate() {
		return vaccineDate;
	}

	public void setVaccineDate(String vaccineDate) {
		this.vaccineDate = vaccineDate;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public int getSterilize() {
		return sterilize;
	}

	public void setSterilize(int sterilize) {
		this.sterilize = sterilize;
	}

	public Long getPetid() {
		return petid;
	}

	public List<Reservation> getRes() {
		return res;
	}

	public void setRes(List<Reservation> res) {
		this.res = res;
	}

}