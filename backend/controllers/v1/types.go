package v1

import "time"


type PostCreateRequest struct {
	Title    string `json:"title" binding:"required,min=20" example:"This is a long title..."`
	Category string `json:"category" binding:"required,min=3" example:"Tech"`
	Content  string `json:"content" binding:"required,min=200" example:"Long content here..."`
	Status   string `json:"status" binding:"required,oneof=publish draft trash" example:"publish"`
}


type PostUpdateRequest struct {
	Title    string `json:"title" binding:"omitempty,min=20" example:"Updated article title"`
	Category string `json:"category" binding:"omitempty,min=3" example:"Tech"`
	Content  string `json:"content" binding:"omitempty,min=200" example:"Updated article content..."`
	Status   string `json:"status" binding:"omitempty,oneof=publish draft trash" example:"draft"`
}


type PostResponse struct {
	ID        uint           `json:"id" example:"1"`
	Title  string         `json:"title" example:"article"`
	Content     string        `json:"content" example:"article technology"`
	Category  string         `json:"category" example:"technology"`
	Status  string         `json:"status" example:"published"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

// ErrorResponse represents the error response structure
type ErrorResponse struct {
	Error   string `json:"error" example:"Invalid request parameters"`
	Message string `json:"message,omitempty" example:"Title is required"`
}


// ListUserResponse represents the paginated response for user listing
type ListPostResponse struct {
	Posts      []PostResponse `json:"posts"`
	TotalCount int64          `json:"total_count" example:"100"`
	Limit      int            `json:"limit" example:"10"`
	Offset     int            `json:"offset" example:"0"`
}