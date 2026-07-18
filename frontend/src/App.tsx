import { useState } from 'react'
import Header from './components/Header'
import MissionCard from './components/MissionCard'
import type { Mission } from './types/mission'
import './App.css'

const initialMissions: Mission[] = [
  {
    id: 1,
    title: 'Reactの開発環境を構築する',
    category: '開発',
    rewardExp: 30,
    completed: false,
  },
  {
    id: 2,
    title: 'READMEと基本設計書を更新する',
    category: '開発',
    rewardExp: 10,
    completed: true,
  },
]

function App() {
  const [missions, setMissions] = useState<Mission[]>(initialMissions)

  const toggleMission = (missionId: number) => {
    setMissions((currentMissions) =>
      currentMissions.map((mission) =>
        mission.id === missionId
          ? {
              ...mission,
              completed: !mission.completed,
            }
          : mission,
      ),
    )
  }

  const totalExp = missions.reduce(
    (sum, mission) =>
      mission.completed ? sum + mission.rewardExp : sum,
    0,
  )

  const level = Math.floor(totalExp / 100) + 1
  const currentExp = totalExp % 100

  return (
    <div className="app">
      <Header level={level} currentExp={currentExp} />

      <main className="main-content">
        <section className="mission-header">
          <div>
            <p className="section-label">CURRENT MISSIONS</p>
            <h2>ミッション一覧</h2>
          </div>

          <button type="button" className="add-button">
            ＋ ミッションを追加
          </button>
        </section>

        <section className="mission-list">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onToggle={toggleMission}
            />
          ))}
        </section>
      </main>
    </div>
  )
}

export default App