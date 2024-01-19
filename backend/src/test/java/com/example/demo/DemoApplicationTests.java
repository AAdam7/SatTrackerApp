package com.example.mainapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
class MainApplicationTests {


	@Test
	void contextLoads() {
	}

	private static final String API_ROOT = "http://localhost:1256/satellites";

  private Satellite createSatellite() {
  	Satellite satellite = new Satellite(UUID.randomUUID(), "satellite 1", Float.valueOf(Double.valueOf(70.10911).toString()), Float.valueOf(Double.valueOf(30.54987).toString()), "ownerName 1");
		satellite.setId(UUID.randomUUID());
		satellite.setName("testName");
    satellite.setOwner("testOwne");
    return satellite;
  }

	// private String createSatelliteAsUri(Satellite satellite) {
  //   Response response = RestAssured.given()
  //     .contentType(MediaType.APPLICATION_JSON_VALUE)
  //     .body(satellite)
  //     .post(API_ROOT);
  //   return API_ROOT + "/" + response.jsonPath().get("id");
  // }

	// @Test
	// public void whenCreateNewSatellite_thenCreated() {
	// 		Satellite satellite = addSatellite();
	// 		Response response = RestAssured.given()
	// 			.contentType(MediaType.APPLICATION_JSON_VALUE)
	// 			.body(satellite)
	// 			.post(API_ROOT);
			
	// 		assertEquals(HttpStatus.CREATED.value(), response.getStatusCode());
	// }

	// @Test
	// public void whenGetAllSatellites_thenOK() {
  //   Response response = RestAssured.get(API_ROOT);
  //   assertEquals(HttpStatus.OK.value(), response.getStatusCode());
	// }
}
