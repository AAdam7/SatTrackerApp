package com.example.mainapp;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

@Service
public class SatelliteService {

    private List<Satellite> satelliteList = new ArrayList<>(Arrays.asList(
						new Satellite( UUID.randomUUID(), "satellite 1", Float.valueOf(Double.valueOf(70.10911).toString()), Float.valueOf(Double.valueOf(30.54987).toString()), "ownerName 1"),
						new Satellite( UUID.randomUUID(), "satellite 2", Float.valueOf(Double.valueOf(20.56922).toString()), Float.valueOf(Double.valueOf(-20.76945).toString()), "ownerName 2"),
						new Satellite( UUID.randomUUID(), "satellite 3", Float.valueOf(Double.valueOf(10.43983).toString()), Float.valueOf(Double.valueOf(-1.10989).toString()), "ownerName 3")
    ));

		public List<Satellite> getAllSatelliteList() {
				return satelliteList;
		}

			public Satellite getSatellite(String id) {
				return satelliteList.stream().filter(satellite -> satellite.getId().equals(id)).findFirst().get();
			}

			public void updateSatellite(Satellite satellite, UUID id) {
				int counter = 0;
				for (Satellite satellite1 : satelliteList) {
					if (satellite1.getId().equals(id)) {
						satellite.setId(id);
						satellite.setOwner(satellite1.getOwner());
						satelliteList.set(counter, satellite);
					}
					counter++;
				}
			}

			public void addSatellite(Satellite satellite) {
				UUID uuid = UUID.randomUUID();
				satellite.setId(uuid);
				satelliteList.add(satellite);
			}

			public void deleteSatellite(UUID id) {
				satelliteList.removeIf(satellite -> satellite.getId().equals(id));
			}
}
