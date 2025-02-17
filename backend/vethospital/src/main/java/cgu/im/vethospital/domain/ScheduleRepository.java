package cgu.im.vethospital.domain;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ScheduleRepository extends CrudRepository<Schedule, Long> {
	List<Schedule> findAllByDoctorAndDate(Doctor doctor, Date date);
	List<Schedule> findAllByDoctorAndDateBetween(Doctor doctor, Date startdate, Date enddate);
	List<Schedule> findAllByDateBetween(Date startdate, Date enddate);
}