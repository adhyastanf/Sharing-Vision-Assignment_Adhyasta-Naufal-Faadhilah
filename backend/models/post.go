package models

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	Title  string         `gorm:"size:200;not null;" json:"title"`
	Content     string         `gorm:"type:text;not null;" json:"content"`
	Category  string         `gorm:"size:100;not null" json:"category"`
	Status  string         `gorm:"size:100;not null" json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
