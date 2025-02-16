package cgu.im.vethospital.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {
	List<Reservation> findAllByPet(Pet pet);
}
