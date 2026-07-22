package com.vonjovian.missionboard.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "http://localhost:5173")
public class MissionController {

    @GetMapping
    public List<Map<String, Object>> getMissions() {
        return List.of(
                Map.of(
                        "id", 1,
                        "title", "Spring Boot APIを作成する",
                        "category", "開発",
                        "rewardExp", 100,
                        "completed", false
                )
        );
    }
}