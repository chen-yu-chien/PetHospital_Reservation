package cgu.im.vethospital.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PetRepository extends CrudRepository<Pet, Long>{
	List<Pet> findAllByOwner(Owner owner);
}
