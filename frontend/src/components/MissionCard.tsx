import type { Mission } from '../types/mission'

type MissionCardProps = {
  mission: Mission
  onToggle: (missionId: number) => void
}

function MissionCard({
  mission,
  onToggle,
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
          onClick={() => onToggle(mission.id)}
        >
          {mission.completed ? '未達成に戻す' : '達成にする'}
        </button>
      </div>

      <div className="mission-body">
        <h3>{mission.title}</h3>
        <p>カテゴリ：{mission.category}</p>
      </div>

      <div className="mission-reward">
        <span>REWARD</span>
        <strong>{mission.rewardExp} EXP</strong>
      </div>
    </article>
  )
}

export default MissionCard