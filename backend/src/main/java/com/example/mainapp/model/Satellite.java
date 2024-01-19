package com.example.mainapp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class Satellite { 
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
		@Column(nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Float latitude;

		@Column(nullable = false)
    private Float longitude;

		@Column(nullable = true)
    private String owner;

    public Satellite(UUID id, String name, Float latitude, Float longitude, String owner) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
				this.longitude = longitude;
				this.owner = owner;
    }

		public UUID getId() {
        return id;
    }
		public void setId(UUID id) {
        this.id = id;
    }
		public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
		public Float getLatitude() {
        return latitude;
    }
		public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }
		public Float getLongitude() {
        return longitude;
    }
		public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }
		public String getOwner() {
        return owner;
    }
    public void setOwner(String owner) {
        this.owner = owner;
    }
}
