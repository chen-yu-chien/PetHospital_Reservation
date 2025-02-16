package cgu.im.vethospital.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cgu.im.vethospital.domain.ScheduleRepository;
import cgu.im.vethospital.domain.DoctorRepository;
import cgu.im.vethospital.domain.Owner;
import cgu.im.vethospital.domain.OwnerRepository;
import cgu.im.vethospital.domain.Pet;
import cgu.im.vethospital.domain.PetRepository;
import cgu.im.vethospital.domain.Reservation;
import cgu.im.vethospital.domain.ReservationRepository;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	
	private final ReservationRepository rrepository;
	private final OwnerRepository orepository;
	private final PetRepository prepository;
	
	public ReservationController(ReservationRepository rrepository, OwnerRepository orepository, PetRepository prepository) {
		super();
		this.rrepository = rrepository;
		this.orepository = orepository;
		this.prepository = prepository;
	}
	
	@GetMapping("")
    public Iterable<Reservation> getReservations() {
		
		return rrepository.findAll();
    }
	
	@GetMapping("/owner")
	public Iterable<Reservation> getPetsByIdentifyId(@RequestParam(name="identifyId") String identifyId) {
		System.out.println("identifyId:" + identifyId);
		Owner owner = orepository.findByIdentifyId(identifyId).get(0);
		
		List<Pet> petList = prepository.findAllByOwner(owner);
		List<Reservation> resList = new ArrayList();
		for(int i = 0; i < petList.size(); i++) {
			List<Reservation> res = petList.get(i).getRes();
			resList.addAll(res);
		}
		
		return resList;
   }
}
