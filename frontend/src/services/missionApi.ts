import type { Mission } from '../types/mission'

const MISSION_API_URL = 'http://localhost:8080/api/missions'

// ミッション一覧をAPIから取得する関数
export const fetchMissions = async (): Promise<Mission[]> => {
  const response = await fetch(MISSION_API_URL)

  if (!response.ok) {
    throw new Error(`API取得エラー: ${response.status}`)
  }

  const data: Mission[] = await response.json()

  return data
}

// ミッションの完了状態をAPIで切り替える関数
export const toggleMissionStatus = async (
  id: number,
): Promise<Mission> => {
  const response = await fetch(`${MISSION_API_URL}/${id}/toggle`, {
    method: 'PATCH',
  })

  if (!response.ok) {
    throw new Error(`API更新エラー: ${response.status}`)
  }

  const updatedMission: Mission = await response.json()

  return updatedMission
}

// ミッションをAPIへ追加する関数
export const createMission = async (
  title: string,
  category: string,
  rewardExp: number,
): Promise<Mission> => {
  const response = await fetch(MISSION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      category,
      rewardExp,
      completed: false,
    }),
  })

  if (!response.ok) {
    throw new Error(`API追加エラー: ${response.status}`)
  }

  const newMission: Mission = await response.json()

  return newMission
}

// ミッションをAPI経由で削除する関数
export const deleteMissionById = async (
  id: number,
): Promise<void> => {
  const response = await fetch(`${MISSION_API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`API削除エラー: ${response.status}`)
  }
}

// ミッションをAPIで更新する関数
export const updateMissionById = async (
  id: number,
  title: string,
  category: string,
  rewardExp: number,
  completed: boolean,
): Promise<Mission> => {
  const response = await fetch(`${MISSION_API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      category,
      rewardExp,
      completed,
    }),
  })

  if (!response.ok) {
    throw new Error(`API更新エラー: ${response.status}`)
  }

  const updatedMission: Mission = await response.json()

  return updatedMission
}