type HeaderProps = {
  level: number
  currentExp: number
}

function Header({ level, currentExp }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <p className="header-label">DAILY QUEST SYSTEM</p>
        <h1>Mission Board</h1>
      </div>

      <div className="status-panel">
        <div>
          <span className="status-label">LEVEL</span>
          <strong>{level}</strong>
        </div>

        <div className="exp-status">
          <span className="status-label">EXP</span>
          <strong>{currentExp} / 100</strong>

          <div className="exp-bar">
            <div
              className="exp-bar-value"
              style={{ width: `${currentExp}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header