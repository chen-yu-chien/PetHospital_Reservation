package cgu.im.vethospital.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cgu.im.vethospital.domain.Owner;
import cgu.im.vethospital.domain.OwnerRepository;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {
	
	private final OwnerRepository orepository;

	public OwnerController(OwnerRepository orepository) {
		super();
		this.orepository = orepository;
	}
	
	@GetMapping("")
    public Iterable<Owner> getOwnerByIdentifyId(@RequestParam(name="identifyId", required=false) String identifyId) {
		if(identifyId != null) {
			System.out.println("identifyId: " + identifyId);
			return orepository.findByIdentifyId(identifyId);
		}
		
		return orepository.findAll();
    }
}
