package com.example.mainapp;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Repository
public class SatelliteRepository {
    private List<Satellite> satelliteList = new ArrayList<Satellite>();
}
