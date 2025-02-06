package cgu.im.vethospital;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import cgu.im.vethospital.domain.Doctor;
import cgu.im.vethospital.domain.DoctorRepository;
import cgu.im.vethospital.domain.Reservation;
import cgu.im.vethospital.domain.ReservationRepository;



@SpringBootApplication
public class VethospitalApplication implements CommandLineRunner {

	DoctorRepository drepository;
	ReservationRepository rrepository;

	public VethospitalApplication(DoctorRepository drepository, ReservationRepository rrepository) {
		super();
		this.drepository = drepository;
		this.rrepository = rrepository;
	}
	
	private static final Logger logger =
            LoggerFactory.getLogger(VethospitalApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(VethospitalApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		Doctor doctor1 = new Doctor("HMJ", "犬科");
		Doctor doctor2 = new Doctor("CYC", "貓科");
		Doctor doctor3 = new Doctor("WSC", "犬科");
		Doctor doctor4 = new Doctor("HYN", "鳥科");
		drepository.save(doctor1);
		drepository.save(doctor2);
		drepository.save(doctor3);
		drepository.save(doctor4);
		
		rrepository.save(new Reservation("2024-05-20", "10:00", "Lufy", "Claire", "0959637193", doctor1));
		rrepository.save(new Reservation("2024-05-20", "15:00", "Dana", "Amanda", "0912345678", doctor3));
		rrepository.save(new Reservation("2024-05-21", "11:30", "Max", "Daniel", "0981740926", doctor4));
		rrepository.save(new Reservation("2024-05-22", "16:30", "Cleo", "Eric", "0993781647", doctor2));
		rrepository.save(new Reservation("2024-05-23", "20:00", "Molly", "Bob", "0903948175", doctor1));
	}


}
