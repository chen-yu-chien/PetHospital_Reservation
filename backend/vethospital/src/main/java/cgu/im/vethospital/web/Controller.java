package cgu.im.vethospital.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cgu.im.vethospital.domain.Doctor;
import cgu.im.vethospital.domain.DoctorRepository;
import cgu.im.vethospital.domain.Reservation;
import cgu.im.vethospital.domain.ReservationRepository;
import cgu.im.vethospital.domain.Pet;
import cgu.im.vethospital.domain.PetRepository;
import cgu.im.vethospital.domain.Owner;
import cgu.im.vethospital.domain.OwnerRepository;
import cgu.im.vethospital.domain.Clinic;
import cgu.im.vethospital.domain.ClinicRepository;


@RestController
//@RequestMapping("/api")
public class Controller {

	private final DoctorRepository drepository;
	private final ReservationRepository rrepository;
	private final PetRepository prepository;
	private final OwnerRepository orepository;
	private final ClinicRepository ctrepository;
	
	
	public Controller(DoctorRepository drepository, ReservationRepository rrepository, PetRepository prepository,
			OwnerRepository orepository, ClinicRepository ctrepository) {
		super();
		this.drepository = drepository;
		this.rrepository = rrepository;
		this.prepository = prepository;
		this.orepository = orepository;
		this.ctrepository = ctrepository;
	}

	@GetMapping("/doctors")
    public Iterable<Doctor> getDoctors() {
		
		return drepository.findAll();
    }
	
	@GetMapping("/reservations")
    public Iterable<Reservation> getReservations() {
		
		return rrepository.findAll();
    }
	
	@GetMapping("/pets")
    public Iterable<Pet> getPets() {
    	
		return prepository.findAll();
    }
	
	@GetMapping("/owners")
    public Iterable<Owner> getOwners() {
    	
		return orepository.findAll();
    }
	
	@GetMapping("/clinics")
    public Iterable<Clinic> getClinics() {
    
		return ctrepository.findAll();
    }
}
