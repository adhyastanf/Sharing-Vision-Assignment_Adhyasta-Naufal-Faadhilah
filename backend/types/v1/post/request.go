package post

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
