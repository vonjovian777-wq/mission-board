import MissionEditForm from './MissionEditForm'
import type { Mission } from '../types/mission'

type MissionCardProps = {
  mission: Mission
  isEditing: boolean
  onToggle: (missionId: number) => void
  onStartEdit: (missionId: number) => void
  onCancelEdit: () => void
  onSave: (
    missionId: number,
    title: string,
    category: string,
    rewardExp: number,
  ) => void
  onDelete: (missionId: number) => void
}

function MissionCard({
  mission,
  isEditing,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onSave,
  onDelete,
}: MissionCardProps) {
  return (
    <article
      className={`mission-card ${
        mission.completed ? 'completed' : ''
      }`}
    >
      <div className="mission-action">
        <span className="mission-status">
          {mission.completed ? '達成済み' : '進行中'}
        </span>

        <button
          type="button"
          className="toggle-button"
          aria-pressed={mission.completed}
          disabled={isEditing}
          title={
            isEditing
              ? '編集を終了してから変更してください'
              : undefined
          }
          onClick={() => onToggle(mission.id)}
        >
          {mission.completed
            ? '未達成に戻す'
            : '達成にする'}
        </button>
      </div>

      <div className="mission-body">
        <h3>{mission.title}</h3>
        <p>カテゴリ：{mission.category}</p>
      </div>

      <div className="mission-side">
        <div className="mission-reward">
          <span>REWARD</span>
          <strong>{mission.rewardExp} EXP</strong>
        </div>

        {!isEditing && (
          <div className="mission-controls">
            <button
              type="button"
              className="edit-button"
              disabled={mission.completed}
              title={
                mission.completed
                  ? '未達成に戻すと編集できます'
                  : 'ミッションを編集'
              }
              onClick={() => onStartEdit(mission.id)}
            >
              編集
            </button>

            <button
              type="button"
              className="delete-button"
              disabled={mission.completed}
              title={
                mission.completed
                  ? '未達成に戻すと削除できます'
                  : 'ミッションを削除'
              }
              onClick={() => onDelete(mission.id)}
            >
              削除
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <MissionEditForm
          mission={mission}
          onSave={onSave}
          onCancel={onCancelEdit}
          onDelete={onDelete}
        />
      )}

    </article>
  )
}

export default MissionCard