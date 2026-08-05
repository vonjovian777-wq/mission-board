package com.vonjovian.missionboard.repository;

import com.vonjovian.missionboard.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission, Long> {
}