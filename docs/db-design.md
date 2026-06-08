# DB設計書

## mission_categories

ミッションカテゴリ管理テーブル

| カラム名          | 型           | PK | NULL | 説明      |
| ------------- | ----------- | -- | ---- | ------- |
| id            | BIGINT      | ○  | ×    | カテゴリID  |
| category_name | VARCHAR(50) |    | ×    | カテゴリ名   |
| sort_order    | INT         |    | ×    | 表示順     |
| is_deleted    | BOOLEAN     |    | ×    | 論理削除フラグ |
| created_at    | DATETIME    |    | ×    | 作成日時    |
| updated_at    | DATETIME    |    | ×    | 更新日時    |

---

## missions

ミッション管理テーブル

| カラム名          | 型            | PK | NULL | 説明         |
| ------------- | ------------ | -- | ---- | ---------- |
| id            | BIGINT       | ○  | ×    | ミッションID    |
| category_id   | BIGINT       |    | ×    | カテゴリID(FK) |
| mission_name  | VARCHAR(100) |    | ×    | ミッション名     |
| description   | TEXT         |    | ○    | 説明         |
| target_value  | INT          |    | ×    | 目標値        |
| current_value | INT          |    | ×    | 現在値        |
| reward_exp    | INT          |    | ×    | 報酬EXP      |
| is_completed  | BOOLEAN      |    | ×    | 達成状態       |
| is_deleted    | BOOLEAN      |    | ×    | 論理削除フラグ    |
| created_at    | DATETIME     |    | ×    | 作成日時       |
| updated_at    | DATETIME     |    | ×    | 更新日時       |

---

## テーブル関連図

mission_categories

↓

missions.category_id
