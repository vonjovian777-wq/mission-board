import type { Mission } from '../types/mission'

const STORAGE_KEY = 'mission-board-missions'

// localStorageからミッションを読み込む
export const loadMissions = (
  initialMissions: Mission[],
): Mission[] => {
  const savedMissions = localStorage.getItem(STORAGE_KEY)

  // 保存データがなければ初期データを使用する
  if (!savedMissions) {
    return initialMissions
  }

  try {
    const parsedMissions: unknown = JSON.parse(savedMissions)

    // 配列でなければ初期データへ戻す
    if (!Array.isArray(parsedMissions)) {
      return initialMissions
    }

    return parsedMissions as Mission[]
  } catch {
    // JSONが壊れていた場合も初期データへ戻す
    return initialMissions
  }
}

// ミッションをlocalStorageへ保存する
export const saveMissions = (missions: Mission[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(missions),
  )
}