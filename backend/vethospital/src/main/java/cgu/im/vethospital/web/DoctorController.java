package cgu.im.vethospital.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cgu.im.vethospital.domain.ScheduleRepository;
import cgu.im.vethospital.domain.Doctor;
import cgu.im.vethospital.domain.DoctorRepository;
import cgu.im.vethospital.domain.PetRepository;
import cgu.im.vethospital.domain.ReservationRepository;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

	private final DoctorRepository drepository;

	public DoctorController(DoctorRepository drepository) {
		super();
		this.drepository = drepository;
	}
	
	@GetMapping("")
    public Iterable<Doctor> getDoctors(@RequestParam(name="doctorid", required = false) Long doctorid) {
		if(doctorid != null) {
			System.out.println("doctorid: " + doctorid);
			return drepository.findByDoctorid(doctorid);
		}
		return drepository.findAll();
    }
	
	@GetMapping("/dept")
	public Iterable<Doctor> getDoctorsByDept(@RequestParam(name="department", required = false) String department) {
		return drepository.findAllByDepartment(department);
    }
}
