package com.vonjovian.missionboard.controller;

import com.vonjovian.missionboard.Mission;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "http://localhost:5173")
public class MissionController {

    private final List<Mission> missions = new ArrayList<>();

    private long nextId = 2L;

    public MissionController() {
        missions.add(
                new Mission(
                        1L,
                        "Spring Boot APIを作成する",
                        "開発",
                        100,
                        false
                )
        );
    }

    @GetMapping
    public List<Mission> getMissions() {
        return missions;
    }

    @PostMapping
    public Mission createMission(@RequestBody Mission mission) {
        mission.setId(nextId++);
        mission.setCompleted(false);

        missions.add(mission);

        return mission;
    }
}