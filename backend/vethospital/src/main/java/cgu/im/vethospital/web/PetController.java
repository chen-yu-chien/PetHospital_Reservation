package cgu.im.vethospital.web;

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
import cgu.im.vethospital.domain.ReservationRepository;

@RestController
@RequestMapping("/api/pets")
public class PetController {

	private final PetRepository prepository;
	private final OwnerRepository orepository;

	public PetController(PetRepository prepository, OwnerRepository orepository) {
		super();
		this.prepository = prepository;
		this.orepository = orepository;
	}
	
	@GetMapping("")
	public Iterable<Pet> getPets() {
		return prepository.findAll();
    }
	
	@GetMapping("/owner")
	public Iterable<Pet> getPetsByIdentifyId(@RequestParam(name="identifyId") String identifyId) {
		System.out.println("identifyId:" + identifyId);
		Owner owner = orepository.findByIdentifyId(identifyId).get(0);
		
		List<Pet> pets = prepository.findAllByOwner(owner);
		
		for(int i = 0; i < pets.size(); i++) {
			System.out.println(pets.get(i).getName());
		}
		return pets;
    }
}
