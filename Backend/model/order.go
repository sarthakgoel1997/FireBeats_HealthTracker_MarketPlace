package model

import "time"

type Order struct {
	Id         uint32    `gorm:"column:Id;primary_key"`
	UserId     uint32    `gorm:"column:UserId"`
	TotalPrice float64   `gorm:"column:TotalPrice"`
	Name       string    `gorm:"column:Name"`
	Email      string    `gorm:"column:Email"`
	Address    string    `gorm:"column:Address"`
	City       string    `gorm:"column:City"`
	State      string    `gorm:"column:State"`
	Country    string    `gorm:"column:Country"`
	CardNumber string    `gorm:"column:CardNumber"`
	Expiry     string    `gorm:"column:Expiry"`
	CreatedAt  time.Time `gorm:"column:CreatedAt"`
}

func (Order) TableName() string {
	return "order"
}
