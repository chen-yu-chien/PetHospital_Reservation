package cgu.im.vethospital.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface DoctorRepository extends CrudRepository<Doctor, Long> {
	List<Doctor> findByDoctorid(Long doctorid);
	List<Doctor> findAllByDepartment(String department);
}
