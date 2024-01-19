package com.example.mainapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods={RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class SatelliteController {
		@Autowired
		private SatelliteService satelliteService;

			@RequestMapping("/satellites")
			public List<Satellite> all_satellites() {
				return satelliteService.getAllSatelliteList();
			}

			@RequestMapping("/satellites/{id}")
			public Satellite getSatellite(@PathVariable("id") String id) {
				return satelliteService.getSatellite(id);
			}

			@RequestMapping(method = RequestMethod.PUT, value = "/satellites/{id}") //OK
			public void updateSatellite(@RequestBody Satellite satellite, @PathVariable("id") String id) {
				UUID uid = UUID.fromString(id);
				satelliteService.updateSatellite(satellite, uid);
			}
			
			@RequestMapping(method = RequestMethod.POST, value = "/satellites") //OK
			public void addSatellite(@RequestBody Satellite satellite) {
				satelliteService.addSatellite(satellite);
			}

			@RequestMapping(method = RequestMethod.DELETE, value = "/satellites/{id}") //OK
			public void deleteSatellite(@PathVariable("id") String id) {
				UUID uid = UUID.fromString(id);
				satelliteService.deleteSatellite(uid);
			}
}
