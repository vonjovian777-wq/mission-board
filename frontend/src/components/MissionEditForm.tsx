import { useState, type FormEvent } from 'react'
import type { Mission } from '../types/mission'

type MissionEditFormProps = {
  mission: Mission
  onSave: (
    missionId: number,
    title: string,
    category: string,
    rewardExp: number,
  ) => void
  onCancel: () => void
  onDelete: (missionId: number) => void
}

function MissionEditForm({
  mission,
  onSave,
  onCancel,
  onDelete,
}: MissionEditFormProps) {
  const [title, setTitle] = useState(mission.title)
  const [category, setCategory] = useState(
    mission.category,
  )
  const [rewardExp, setRewardExp] = useState(
    String(mission.rewardExp),
  )

  const handleSubmit = (
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

    const confirmed = window.confirm(
      `以下の内容へ変更しますか？\n\n` +
        `ミッション名：${trimmedTitle}\n` +
        `カテゴリ：${category}\n` +
        `報酬EXP：${parsedRewardExp}`,
    )

    if (!confirmed) {
      return
    }

    onSave(
      mission.id,
      trimmedTitle,
      category,
      parsedRewardExp,
    )
  }

  return (
    <form
      className="mission-edit-form"
      onSubmit={handleSubmit}
    >
    <div className="form-field">
        <label htmlFor={`edit-title-${mission.id}`}>
            ミッション名
        </label>

        <input
            id={`edit-title-${mission.id}`}
            type="text"
            value={title}
            required
            onChange={(event) =>
                setTitle(event.target.value)
        }
        />
    </div>

    <div className="form-field">
        <label htmlFor={`edit-category-${mission.id}`}>
            カテゴリ
        </label>

        <select
            id={`edit-category-${mission.id}`}
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
        <label htmlFor={`edit-reward-${mission.id}`}>
            報酬EXP
        </label>

    <input
        id={`edit-reward-${mission.id}`}
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
        <div className="edit-actions">
            <button
                type="button"
                className="edit-delete-button"
                onClick={() => onDelete(mission.id)}
            >
                このミッションを削除
            </button>

            <div className="edit-primary-actions">
                <button
                    type="button"
                    className="edit-cancel-button"
                    onClick={onCancel}
                >
                    編集をやめる
                </button>

                <button
                    type="submit"
                    className="edit-save-button"
                >
                    変更を保存
                </button>
            </div>
        </div>
    </form>
  )
}

export default MissionEditForm