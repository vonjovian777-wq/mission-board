import { useState, type FormEvent } from 'react'

type MissionFormProps = {
  onAdd: (
    title: string,
    category: string,
    rewardExp: number,
  ) => Promise<boolean>
}

function MissionForm({ onAdd }: MissionFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('開発')
  const [rewardExp, setRewardExp] = useState('10')

  const resetForm = () => {
    setTitle('')
    setCategory('開発')
    setRewardExp('10')
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const parsedRewardExp = Number(rewardExp)

    if (
      !trimmedTitle ||
      parsedRewardExp <= 0 ||
      Number.isNaN(parsedRewardExp)
    ) {
      return
    }

    // 確認ダイアログを表示
    const confirmed = window.confirm(
        `以下のミッションを追加しますか？\n\n` +
            `ミッション名：${trimmedTitle}\n` +
            `カテゴリ：${category}\n` +
            `報酬EXP：${parsedRewardExp}`,
    )

    if (!confirmed) {
        return
    }

    const wasAdded = await onAdd(
      trimmedTitle,
      category,
      parsedRewardExp,
    )

    if (wasAdded) {
      resetForm()
    }
  }

  return (
    <form
      id="mission-form"
      className="mission-form"
      onSubmit={handleSubmit}
    >
      <div className="form-field form-field-wide">
        <label htmlFor="mission-title">
          ミッション名
        </label>

        <input
          id="mission-title"
          type="text"
          value={title}
          placeholder="例：Reactのフォームを実装する"
          required
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />
      </div>

      <div className="form-field">
        <label htmlFor="mission-category">
          カテゴリ
        </label>

        <select
          id="mission-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          <option value="開発">開発</option>
          <option value="生活">生活</option>
          <option value="健康">健康</option>
          <option value="配信">配信</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="mission-reward">
          報酬EXP
        </label>

        <input
          id="mission-reward"
          type="number"
          value={rewardExp}
          min="1"
          step="1"
          required
          onChange={(event) =>
            setRewardExp(event.target.value)
          }
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="reset-button"
          onClick={resetForm}
        >
          入力をリセット
        </button>

        <button
          type="submit"
          className="submit-button"
        >
          ミッションを登録
        </button>
      </div>
    </form>
  )
}

export default MissionForm