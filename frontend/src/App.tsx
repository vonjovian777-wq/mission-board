import { useEffect, useState } from 'react'
import Header from './components/Header'
import MissionCard from './components/MissionCard'
import MissionForm from './components/MissionForm'
import type { Mission } from './types/mission'
import './App.css'

function App() {
  const [missions, setMissions] = useState<Mission[]>([])

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [editingMissionId, setEditingMissionId] =
  useState<number | null>(null)

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/missions',
        )

        if (!response.ok) {
          throw new Error(`API取得エラー: ${response.status}`)
        }

        const data: Mission[] = await response.json()

        setMissions(data)
      } catch (error) {
        console.error('ミッションの取得に失敗しました:', error)
      }
    }

    fetchMissions()
  }, [])

  // ミッションの完了状態を切り替える関数
  const toggleMission = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/missions/${id}/toggle`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        throw new Error("ミッションの状態変更に失敗しました");
      }

      const updatedMission: Mission = await response.json();

      setMissions((currentMissions) =>
        currentMissions.map((mission) =>
          mission.id === id ? updatedMission : mission,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ミッションを追加する関数
  const addMission = async (
    title: string,
    category: string,
    rewardExp: number,
  ) => {
    try {
      const response = await fetch("http://localhost:8080/api/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          rewardExp,
          completed: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`ミッションの追加に失敗しました: ${response.status}`)
      }

      const newMission: Mission = await response.json()

      setMissions((currentMissions) => [
        ...currentMissions,
        newMission,
      ])
    } catch (error) {
      console.error(error)
    }
  }

  // ミッションを削除する関数
  const deleteMission = async (missionId: number) => {
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

    try {
      const response = await fetch(
        `http://localhost:8080/api/missions/${missionId}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        throw new Error(
          `ミッションの削除に失敗しました: ${response.status}`,
        )
      }

      // 編集中のミッションが削除対象の場合は、編集状態を解除
      setEditingMissionId((currentMissionId) =>
        currentMissionId === missionId
          ? null
          : currentMissionId,
      )

      // APIでの削除成功後、画面上からも対象を削除
      setMissions((currentMissions) =>
        currentMissions.filter(
          (mission) => mission.id !== missionId,
        ),
      )
    } catch (error) {
      console.error(error)
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
      const response = await fetch(
        `http://localhost:8080/api/missions/${missionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            category,
            rewardExp,
            completed: targetMission.completed,
          }),
        },
      )

      if (!response.ok) {
        throw new Error(
          `ミッションの更新に失敗しました: ${response.status}`,
        )
      }

      const savedMission: Mission = await response.json()

      // APIで更新された内容を画面にも反映
      setMissions((currentMissions) =>
        currentMissions.map((mission) =>
          mission.id === savedMission.id
            ? savedMission
            : mission,
        ),
      )

      setEditingMissionId(null)
    } catch (error) {
      console.error(error)
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