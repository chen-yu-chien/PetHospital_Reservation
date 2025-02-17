package cgu.im.vethospital.web;

import java.util.List;
import java.util.ArrayList;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cgu.im.vethospital.domain.Schedule;
import cgu.im.vethospital.domain.ScheduleRepository;
import cgu.im.vethospital.domain.Doctor;
import cgu.im.vethospital.domain.DoctorRepository;
import cgu.im.vethospital.domain.PetRepository;
import cgu.im.vethospital.domain.ReservationRepository;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

	private final ScheduleRepository srepository;
	private final DoctorRepository drepository;
	
	public ScheduleController(ScheduleRepository srepository, DoctorRepository drepository) {
		super();
		this.srepository = srepository;
		this.drepository = drepository;
	}
	
	@GetMapping("")
    public Iterable<Schedule> getSchedules() {
    
		return srepository.findAll();
    }
	
	@GetMapping("/search")
	public Iterable<Schedule> getSchedulesByDoctorAndDate(@RequestParam(name="doctorid") Long doctorid,  
			@RequestParam(name="date") String dateStr) throws ParseException {
	    System.out.println("doctorid: " + doctorid);
	    System.out.println("date: " + dateStr);
	    
	    Doctor doctor = drepository.findByDoctorid(doctorid).get(0);
	    Date date = changeDateFormat(dateStr);
	    List<Schedule> scheList = srepository.findAllByDoctorAndDate(doctor,date);
	    
		return scheList;
    }
	
	@GetMapping("/doctor")
	public Iterable<Schedule> getSchedulesByDoctorAndDateBetween(@RequestParam(name="doctorid") Long doctorid, @RequestParam(name="startdate") String startdate, 
			@RequestParam(name="enddate") String enddate) throws ParseException {
	    System.out.println("doctorid: " + doctorid);
	    System.out.println("startdate: " + startdate);
	    System.out.println("enddate: " + enddate);
	    
	    Doctor doctor = drepository.findByDoctorid(doctorid).get(0);
	    Date start = changeDateFormat(startdate);
	    Date end = changeDateFormat(enddate);
	    List<Schedule> scheList = srepository.findAllByDoctorAndDateBetween(doctor, start, end);
	    
		return scheList;
    }
	
	@GetMapping("/dates")
	public Iterable<Schedule> getSchedulesByDateBetween(@RequestParam(name="startdate") String startdate, 
			@RequestParam(name="enddate") String enddate) throws ParseException {
	    System.out.println("startdate: " + startdate);
	    System.out.println("enddate: " + enddate);
	    
	    Date start = changeDateFormat(startdate);
	    Date end = changeDateFormat(enddate);
	    List<Schedule> scheList = srepository.findAllByDateBetween(start, end);
	    
		return scheList;
    }
	
	@GetMapping("/dept")
	public Iterable<Schedule> getSchedulesByDeptartmentAndDateBetween(@RequestParam(name="dept") String department, 
			@RequestParam(name="startdate") String startdate, @RequestParam(name="enddate") String enddate) 
					throws ParseException {
	    System.out.println("dept: " + department);
	    System.out.println("startdate: " + startdate);
	    System.out.println("enddate: " + enddate);
	    
	    List<Doctor> docList = drepository.findAllByDepartment(department);
	    Date start = changeDateFormat(startdate);
	    Date end = changeDateFormat(enddate);
	    
	    List<Schedule> schedules = new ArrayList();
	    for(int i = 0; i < docList.size(); i++) {
	    	List<Schedule> scheList = srepository.findAllByDoctorAndDateBetween(docList.get(i), start, end);
	    	schedules.addAll(scheList);	
	    }	    
		return schedules;
    }
	
	public Date changeDateFormat(String dateStr) {
		LocalDate localDate = LocalDate.parse(dateStr);
		Date date = Date.valueOf(localDate);
		return date;
	}
}
