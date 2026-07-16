import './App.css'

type Mission = {
  id: number
  title: string
  category: string
  rewardExp: number
  completed: boolean
}

const missions: Mission[] = [
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
  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="header-label">DAILY QUEST SYSTEM</p>
          <h1>Mission Board</h1>
        </div>

        <div className="status-panel">
          <div>
            <span className="status-label">LEVEL</span>
            <strong>1</strong>
          </div>

          <div className="exp-status">
            <span className="status-label">EXP</span>
            <strong>20 / 100</strong>
            <div className="exp-bar">
              <div className="exp-bar-value" />
            </div>
          </div>
        </div>
      </header>

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
            <article
              key={mission.id}
              className={`mission-card ${
                mission.completed ? 'completed' : ''
              }`}
            >
              <div className="mission-status">
                {mission.completed ? '達成済み' : '進行中'}
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
          ))}
        </section>
      </main>
    </div>
  )
}

export default App