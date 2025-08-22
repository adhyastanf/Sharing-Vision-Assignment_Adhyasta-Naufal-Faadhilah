package post

import "time"

type PostResponse struct {
	ID        uint           `json:"id" example:"1"`
	Title  string         `json:"title" example:"article"`
	Content     string        `json:"content" example:"article technology"`
	Category  string         `json:"category" example:"technology"`
	Status  string         `json:"status" example:"published"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

// ListUserResponse represents the paginated response for user listing
type ListPostResponse struct {
	Posts      []PostResponse `json:"posts"`
	TotalCount int64          `json:"total_count" example:"100"`
	Limit      int            `json:"limit" example:"10"`
	Offset     int            `json:"offset" example:"0"`
}
