package com.example.mainapp.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

// import com.example.mainapp.models.Satellite;
// import com.example.mainapp.repo.SatelliteRepository;

@RestController
// @RequestMapping("/satellites")
public class SatelliteController {
	  // @Autowired
    // private SatelliteRepository satelliteRepository;

    @GetMapping
    public String getAllSatellites() {
        return "Hello!!";
    }

    // @GetMapping("/title/{satelliteName}")
    // public List<Satellite> findByTitle(@PathVariable String satelliteName) {
    //     // return satelliteRepository.findByTitle(satelliteName);
		// 		return "Hello, World!";
    // }

		@GetMapping("/satellites")
    public String hello() {
      return String.format("Satellite");
    }

    // @PutMapping("/{id}")
    // public Satellite updateSatellite(@RequestBody Satellite satellite, @PathVariable Long id) {
    //     if (satellite.getId() != id) {
    //       throw new SatelliteIdMismatchException();
    //     }
    //     satelliteRepository.findById(id)
    //       .orElseThrow(SatelliteNotFoundException::new);
    //     return satelliteRepository.save(satellite);
    // }

		// @PostMapping
    // @ResponseStatus(HttpStatus.CREATED)
    // public Satellite create(@RequestBody Satellite satellite) {
    //     return satelliteRepository.save(satellite);
    // }

		// @DeleteMapping("/satellites/{satellite-id}")
    // public void delete(@PathVariable Long id) {
    //     satelliteRepository.findById(id)
    //       .orElseThrow(SatelliteNotFoundException::new);
    //     satelliteRepository.deleteById(id);
    // }
}