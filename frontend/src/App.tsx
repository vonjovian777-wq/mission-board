import { useState } from 'react'
import Header from './components/Header'
import MissionCard from './components/MissionCard'
import MissionForm from './components/MissionForm'
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

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [editingMissionId, setEditingMissionId] =
  useState<number | null>(null)

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

  // ミッションを追加する関数
  const addMission = (
    title: string,
    category: string,
    rewardExp: number,
  ) => {
    const newMission: Mission = {
      id: Date.now(),
      title,
      category,
      rewardExp,
      completed: false,
    }

    setMissions((currentMissions) => [
      ...currentMissions,
      newMission,
    ])

  }

  // ミッションを削除する関数
  const deleteMission = (missionId: number) => {
    const targetMission = missions.find(
      (mission) => mission.id === missionId,
    )

    // 対象のミッションが存在しない場合や、すでに完了済みの場合は削除しない
    if (!targetMission || targetMission.completed) {
      return
    }

    const confirmed = window.confirm(
      `「${targetMission.title}」を削除しますか？\n\n` +
        `この操作は元に戻せません。`,
    )

    if (!confirmed) {
      return
    }

    // 編集中のミッションが削除対象の場合は、編集状態を解除
    setEditingMissionId((currentMissionId) =>
      currentMissionId === missionId
        ? null
        : currentMissionId,
    )

    // 対象以外のミッションを残すようにフィルタリングして更新
    setMissions((currentMissions) =>
      currentMissions.filter(
        (mission) => mission.id !== missionId,
      ),
    )
  }

  // ミッションの編集を開始する関数
  const startEditingMission = (missionId: number) => {
    const targetMission = missions.find(
      (mission) => mission.id === missionId,
    )

    if (!targetMission || targetMission.completed) {
      return
    }

    setIsFormOpen(false)
    setEditingMissionId(missionId)
  }

  const cancelEditingMission = () => {
    setEditingMissionId(null)
  }

  const updateMission = (
    missionId: number,
    title: string,
    category: string,
    rewardExp: number,
  ) => {
    setMissions((currentMissions) =>
      currentMissions.map((mission) =>
        mission.id === missionId && !mission.completed
          ? {
              ...mission,
              title,
              category,
              rewardExp,
            }
          : mission,
      ),
    )

    setEditingMissionId(null)
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

          <button
            type="button"
            className="add-button"
            aria-expanded={isFormOpen}
            aria-controls="mission-form"
            onClick={() =>
              setIsFormOpen((currentState) => !currentState)
            }
          >
            {isFormOpen
              ? '× フォームを閉じる'
              : '＋ ミッションを追加'}
          </button>
        </section>

        <div
          className={`mission-form-wrapper ${
            isFormOpen ? 'open' : ''
          }`}
          aria-hidden={!isFormOpen}
          inert={!isFormOpen}
        >
          <div className="mission-form-inner">
            <MissionForm onAdd={addMission} />
          </div>
        </div>

        <section className="mission-list">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              isEditing={editingMissionId === mission.id}
              onToggle={toggleMission}
              onStartEdit={startEditingMission}
              onCancelEdit={cancelEditingMission}
              onSave={updateMission}
              onDelete={deleteMission}
            />
          ))}
        </section>
      </main>
    </div>
  )
}

export default App