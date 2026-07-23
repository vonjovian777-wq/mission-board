package com.vonjovian.missionboard;

public class Mission {

    private Long id;
    private String title;
    private String category;
    private int rewardExp;
    private boolean completed;

    public Mission() {
    }

    public Mission(
            Long id,
            String title,
            String category,
            int rewardExp,
            boolean completed
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.rewardExp = rewardExp;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getRewardExp() {
        return rewardExp;
    }

    public void setRewardExp(int rewardExp) {
        this.rewardExp = rewardExp;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}