import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import MissionCard from './components/MissionCard'
import MissionForm from './components/MissionForm'
import {
  createMission,
  deleteMissionById,
  fetchMissions,
  toggleMissionStatus,
  updateMissionById,
} from './services/missionApi'
import type { Mission } from './types/mission'
import './App.css'

function App() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [editingMissionId, setEditingMissionId] =
  useState<number | null>(null)

  const loadMissions = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const data = await fetchMissions()

      setMissions(data)
    } catch (error) {
      console.error('ミッションの取得に失敗しました:', error)
      setErrorMessage('ミッションの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMissions()
  }, [loadMissions])

  // ミッションの完了状態を切り替える関数
  const toggleMission = async (id: number) => {
    try {
      const updatedMission = await toggleMissionStatus(id)

      setMissions((currentMissions) =>
        currentMissions.map((mission) =>
          mission.id === id ? updatedMission : mission,
        ),
      )
    } catch (error) {
      console.error('ミッションの更新に失敗しました:', error)
    }
  }

  // ミッションを追加する関数
  const addMission = async (
    title: string,
    category: string,
    rewardExp: number,
  ) => {
    try {
      const newMission = await createMission(
        title,
        category,
        rewardExp,
      )

      setMissions((currentMissions) => [
        ...currentMissions,
        newMission,
      ])
    } catch (error) {
      console.error('ミッションの追加に失敗しました:', error)
    }
  }

  // ミッションを削除する関数
  const deleteMission = async (missionId: number) => {
    const targetMission = missions.find(
      (mission) => mission.id === missionId,
    )

    if (!targetMission) {
      return
    }

    const shouldDelete = window.confirm(
      `「${targetMission.title}」を削除しますか？`,
    )

    if (!shouldDelete) {
      return
    }

    try {
      await deleteMissionById(missionId)

      setMissions((currentMissions) =>
        currentMissions.filter(
          (mission) => mission.id !== missionId,
        ),
      )

      if (editingMissionId === missionId) {
        setEditingMissionId(null)
      }
    } catch (error) {
      console.error('ミッションの削除に失敗しました:', error)
    }
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

  // ミッションを更新する関数
  const updateMission = async (
    missionId: number,
    title: string,
    category: string,
    rewardExp: number,
  ) => {
    const targetMission = missions.find(
      (mission) => mission.id === missionId,
    )

    if (!targetMission || targetMission.completed) {
      return
    }

    try {
      const updatedMission = await updateMissionById(
        missionId,
        title,
        category,
        rewardExp,
        targetMission.completed,
      )

      setMissions((currentMissions) =>
        currentMissions.map((mission) =>
          mission.id === updatedMission.id
            ? updatedMission
            : mission,
        ),
      )

      setEditingMissionId(null)
    } catch (error) {
      console.error('ミッションの更新に失敗しました:', error)
    }
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
          {isLoading ? (
            <p className="mission-state-message">
              ミッションを読み込んでいます…
            </p>
          ) : errorMessage ? (
            <div className="mission-state-message">
              <p>{errorMessage}</p>
              <button
                type="button"
                className="retry-button"
                onClick={loadMissions}
              >
                再読み込み
              </button>
            </div>
          ) : missions.length === 0 ? (
            <p className="mission-state-message">
              まだミッションはありません
            </p>
          ) : (
            missions.map((mission) => (
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
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default App