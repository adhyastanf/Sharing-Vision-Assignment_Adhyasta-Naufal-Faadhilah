package v1

import (
	"net/http"
	"strconv"

	"github.com/canhbk/golang-gin-starter-kit/config"
	"github.com/canhbk/golang-gin-starter-kit/models"
	_ "github.com/canhbk/golang-gin-starter-kit/types/v1/common"
	_ "github.com/canhbk/golang-gin-starter-kit/types/v1/post"
	"github.com/gin-gonic/gin"
)

type PostController struct{}

func NewPostController() *PostController {
	return &PostController{}
}

// Create godoc
// @Summary      Create post
// @Description  Create a new post
// @Tags         v1/posts
// @Accept       json
// @Produce      json
// @Param        request body     post.CreateRequest true "Post Information"
// @Success      201    {object}  post.Response
// @Failure      400    {object}  common.ErrorResponse
// @Failure      409    {object}  common.ErrorResponse
// @Router       /api/v1/posts [post]
func (uc *PostController) Create(c *gin.Context) {
	var req PostCreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
		})
		return
	}

	post := models.Post{
		Title:    req.Title,
		Content:  req.Content,
		Category: req.Category,
		Status:   req.Status,
	}

	result := config.DB.Create(&post)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Failed to create article",
			Message: result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, PostResponse{
		ID:        post.ID,
		Title:  post.Title,
		Category:     post.Category,
		Content:     post.Content,
		Status:     post.Status,
		CreatedAt: post.CreatedAt,
		UpdatedAt: post.UpdatedAt,
	})
}

// List godoc
// @Summary      List posts
// @Description  Get paginated list of posts
// @Tags         v1/posts
// @Accept       json
// @Produce      json
// @Param        request query    common.PaginationQuery false "Pagination params"
// @Success      200    {object}  post.ListResponse
// @Failure      400    {object}  common.ErrorResponse
// @Router       /api/v1/posts/:limit/:offset [get]
func (uc *PostController) List(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
    offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	var posts []models.Post
	var total int64

	config.DB.Model(&models.Post{}).Count(&total)
	result := config.DB.Offset(offset).Limit(limit).Find(&posts)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Failed to fetch posts",
			Message: result.Error.Error(),
		})
		return
	}

	postResponses := make([]PostResponse, len(posts))
	for i, post := range posts {
		postResponses[i] = PostResponse{
			ID:        post.ID,
			Title:  	post.Title,
			Category:     post.Category,
			Content:     post.Content,
			Status:     post.Status,
			CreatedAt: post.CreatedAt,
			UpdatedAt: post.UpdatedAt,
		}
	}

	c.JSON(http.StatusOK, ListPostResponse{
		Posts:      postResponses,
		TotalCount: total,
		Limit:      limit,
		Offset:     offset,
	})
}

// Get godoc
// @Summary      Get post
// @Description  Get post by ID
// @Tags         v1/posts
// @Accept       json
// @Produce      json
// @Param        id   path      uint  true  "Post ID"
// @Success      200  {object}  PostResponse
// @Failure      404  {object}  ErrorResponse
// @Router       /api/v1/posts/{id} [get]
func (uc *PostController) Get(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Invalid post ID",
			Message: "Post ID must be a positive integer",
		})
		return
	}

	var post models.Post
	result := config.DB.First(&post, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Post not found",
			Message: "No post exists with the provided ID",
		})
		return
	}

	c.JSON(http.StatusOK, PostResponse{
		ID:        post.ID,
		Title:  	post.Title,
		Category:     post.Category,
		Content:     post.Content,
		Status:     post.Status,
		CreatedAt: post.CreatedAt,
		UpdatedAt: post.UpdatedAt,
	})
}

// Update godoc
// @Summary      Update post
// @Description  Update post by ID
// @Tags         v1/posts
// @Accept       json
// @Produce      json
// @Param        id      path    uint              true  "Post ID"
// @Param        request body    PostUpdateRequest true  "Post Information"
// @Success      200     {object} PostResponse
// @Failure      400     {object} ErrorResponse
// @Failure      404     {object} ErrorResponse
// @Router       /api/v1/post/{id} [put]
func (uc *PostController) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Invalid post ID",
			Message: "Post ID must be a positive integer",
		})
		return
	}

	var req PostUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Invalid request",
			Message: err.Error(),
		})
		return
	}

	var post models.Post
	result := config.DB.First(&post, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Post not found",
			Message: "No post exists with the provided ID",
		})
		return
	}

	// Update fields if provided
	if req.Title != "" {
		post.Title = req.Title
	}
	if req.Category != "" {
		post.Category = req.Category
	}
	if req.Content != "" {
		post.Content = req.Content
	}
	if req.Status != "" {
        post.Status = req.Status
    }

	result = config.DB.Save(&post)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Failed to update post",
			Message: result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, PostResponse{
		ID:        post.ID,
		Title:  	post.Title,
		Category:     post.Category,
		Content:     post.Content,
		Status:     post.Status,
		CreatedAt: post.CreatedAt,
		UpdatedAt: post.UpdatedAt,
	})
}

// Delete godoc
// @Summary      Delete post
// @Description  Delete post by ID
// @Tags         v1/posts
// @Accept       json
// @Produce      json
// @Param        id   path      uint  true  "Post ID"
// @Success      204  {object}  nil
// @Failure      404  {object}  ErrorResponse
// @Router       /api/v1/posts/{id} [delete]
func (uc *PostController) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "Invalid post ID",
			Message: "Post ID must be a positive integer",
		})
		return
	}

	result := config.DB.Delete(&models.Post{}, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "Post not found",
			Message: "No post exists with the provided ID",
		})
		return
	}

	c.Status(http.StatusNoContent)
}