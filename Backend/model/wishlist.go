package model

import "time"

type Wishlist struct {
	Id        uint32    `gorm:"column:Id;primary_key"`
	UserId    uint32    `gorm:"column:UserId"`
	ProductId uint32    `gorm:"column:ProductId"`
	CreatedAt time.Time `gorm:"column:CreatedAt"`
}

func (Wishlist) TableName() string {
	return "wishlist"
}

type AddToWishlistRequest struct {
	UserId    uint32
	ProductId uint32
}
