package cgu.im.vethospital.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import cgu.im.vethospital.domain.Doctor;
import cgu.im.vethospital.domain.DoctorRepository;
import cgu.im.vethospital.domain.Reservation;
import cgu.im.vethospital.domain.ReservationRepository;



@RestController
public class Controller {

	private final DoctorRepository drepository;
	private final ReservationRepository rrepository;
	
	public Controller(DoctorRepository drepository, ReservationRepository rrepository) {
		super();
		this.drepository = drepository;
		this.rrepository = rrepository;
	}

	@GetMapping("/doctors")
    public Iterable<Doctor> getDoctors() {
    	
    	//Fetch and return cars
    	return drepository.findAll();
    }
	
	@GetMapping("/reservations")
    public Iterable<Reservation> getReservations() {
    	
    	//Fetch and return cars
    	return rrepository.findAll();
    }
}
