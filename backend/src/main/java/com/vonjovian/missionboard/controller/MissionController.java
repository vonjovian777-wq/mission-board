package com.vonjovian.missionboard.controller;

import com.vonjovian.missionboard.Mission;
import com.vonjovian.missionboard.repository.MissionRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "http://localhost:5173")
public class MissionController {

    private final MissionRepository missionRepository;

    public MissionController(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    @GetMapping
    public List<Mission> getMissions() {
        return missionRepository.findAll();
    }

    @PostMapping
    public Mission createMission(@RequestBody Mission mission) {
        mission.setId(null);
        mission.setCompleted(false);

        return missionRepository.save(mission);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mission> updateMission(
            @PathVariable Long id,
            @RequestBody Mission updatedMission
    ) {
        return missionRepository.findById(id)
                .map(mission -> {
                    mission.setTitle(updatedMission.getTitle());
                    mission.setCategory(updatedMission.getCategory());
                    mission.setRewardExp(updatedMission.getRewardExp());
                    mission.setCompleted(updatedMission.isCompleted());

                    return ResponseEntity.ok(
                            missionRepository.save(mission)
                    );
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Mission> toggleMission(@PathVariable Long id) {
        return missionRepository.findById(id)
                .map(mission -> {
                    mission.setCompleted(!mission.isCompleted());

                    return ResponseEntity.ok(
                            missionRepository.save(mission)
                    );
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMission(@PathVariable Long id) {
        if (!missionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        missionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}