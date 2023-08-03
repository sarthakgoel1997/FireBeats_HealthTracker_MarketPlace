package model

import "time"

type Cart struct {
	Id        uint32    `gorm:"column:Id;primary_key"`
	UserId    uint32    `gorm:"column:UserId"`
	ProductId uint32    `gorm:"column:ProductId"`
	CreatedAt time.Time `gorm:"column:CreatedAt"`
}

func (Cart) TableName() string {
	return "cart"
}

type AddToCartRequest struct {
	UserId    uint32
	ProductId uint32
}

type PurchaseCartRequest struct {
	UserId     uint32
	Name       string
	Email      string
	Address    string
	City       string
	State      string
	Country    string
	CardNumber string
	Expiry     string
}
