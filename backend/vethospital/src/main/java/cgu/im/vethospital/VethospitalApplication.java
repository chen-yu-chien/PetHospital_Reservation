package cgu.im.vethospital;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import cgu.im.vethospital.domain.Doctor;
import cgu.im.vethospital.domain.DoctorRepository;
import cgu.im.vethospital.domain.Reservation;
import cgu.im.vethospital.domain.ReservationRepository;
import cgu.im.vethospital.domain.Pet;
import cgu.im.vethospital.domain.PetRepository;
import cgu.im.vethospital.domain.Owner;
import cgu.im.vethospital.domain.OwnerRepository;
import cgu.im.vethospital.domain.Schedule;
import cgu.im.vethospital.domain.ScheduleRepository;



@SpringBootApplication
@ComponentScan(basePackages = "cgu.im.vethospital")
public class VethospitalApplication implements CommandLineRunner {

	DoctorRepository drepository;
	ReservationRepository rrepository;
	PetRepository prepository;
	OwnerRepository orepository;
	ScheduleRepository srepository;

	public VethospitalApplication(DoctorRepository drepository, ReservationRepository rrepository, PetRepository prepository,
			OwnerRepository orepository, ScheduleRepository srepository) {
		super();
		this.drepository = drepository;
		this.rrepository = rrepository;
		this.prepository = prepository;
		this.orepository = orepository;
		this.srepository = srepository;
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

		Owner owner1 = new Owner("Claire", "1985-03-15", "A223456789", "0959637193", "台北市中正區和平東路一段1號", 1);
		Owner owner2 = new Owner("Amanda", "1990-07-10", "B287654321", "0912345678", "新北市板橋區文化路二段123號", 1);
		Owner owner3 = new Owner("Daniel", "1982-11-25", "C112233445", "0981740926", "台中市西區建國路五段45號", 0);
		Owner owner4 = new Owner("Eric", "1995-01-30", "D156677889", "0993781647", "高雄市苓雅區中華路二段456號", 0);
		Owner owner5 = new Owner("Bob", "1988-05-12", "E123344556", "0903948175", "台南市北區中華路一段789號", 0);
		orepository.save(owner1);
		orepository.save(owner2);
		orepository.save(owner3);
		orepository.save(owner4);
		orepository.save(owner5);
		
		Pet pet1 = new Pet("Lufy", 0, "狗", "2020-05-10", "991234567890123", "短毛，黑色", 1, "2023-03-10", owner1);
		Pet pet2 = new Pet("Dana", 1, "貓", "2022-07-15", "991987654321001", "毛茸茸，白色", 0, "2023-08-20", owner2);
		Pet pet3 = new Pet("Max", 0, "狗", "2021-02-18", "991876543210456", "棕色，中型", 1, "", owner3);
		Pet pet4 = new Pet("Cleo", 1, "鳥", "2021-11-05", "991564738291234", "灰色，小型", 1, "2023-06-25", owner4);
		Pet pet5 = new Pet("Molly", 1, "狗", "2020-04-02", "991102938475672", "黑色有白色斑點", 1, "2023-09-30", owner5);
		
		prepository.save(pet1);
		prepository.save(pet2);
		prepository.save(pet3);
		prepository.save(pet4);
		prepository.save(pet5);
		
		
		rrepository.save(new Reservation("2025-02-17", "10:00", pet1, "食慾不振，寵物不願意進食", doctor1));
		rrepository.save(new Reservation("2025-02-20", "11:00", pet2, "嘔吐", doctor3));
		rrepository.save(new Reservation("2025-02-18", "15:30", pet3, "排便異常，持續腹瀉", doctor4));
		rrepository.save(new Reservation("2025-02-21", "16:30", pet4, "皮膚過敏，發紅，癢，輕微脫毛", doctor2));
		rrepository.save(new Reservation("2025-02-21", "10:00", pet5, "出現咳嗽、呼吸急促", doctor1));
		
		srepository.save(new Schedule("2025-02-17", "09:00", "12:00", doctor1));
		srepository.save(new Schedule("2025-02-17", "13:00", "16:00", doctor2));
		srepository.save(new Schedule("2025-02-18", "10:00", "12:00", doctor3));
		srepository.save(new Schedule("2025-02-18", "14:00", "17:00", doctor4));
		srepository.save(new Schedule("2025-02-19", "08:00", "11:00", doctor1));
		srepository.save(new Schedule("2025-02-19", "13:00", "15:00", doctor2));
		srepository.save(new Schedule("2025-02-20", "09:00", "11:30", doctor3));
		srepository.save(new Schedule("2025-02-20", "14:00", "17:00", doctor4));
		srepository.save(new Schedule("2025-02-21", "08:30", "12:00", doctor1));
		srepository.save(new Schedule("2025-02-21", "13:30", "16:30", doctor2));
		
		System.out.println(orepository.findByIdentifyId("A223456789").get(0).getName());
	}


}
