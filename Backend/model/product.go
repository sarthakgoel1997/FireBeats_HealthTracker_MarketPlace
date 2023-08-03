package model

type Product struct {
	Id                 uint32  `gorm:"column:Id;primary_key"`
	Name               string  `gorm:"column:Name"`
	ImageUrl           string  `gorm:"column:ImageUrl"`
	Price              float64 `gorm:"column:Price"`
	DiscountPercentage float64 `gorm:"column:DiscountPercentage"`
	Details            string  `gorm:"column:Details"`
	WishlistId         uint32  `gorm:"-"`
	CartId             uint32  `gorm:"-"`
	DiscountedPrice    float64 `gorm:"-"`
}

func (Product) TableName() string {
	return "product"
}

const (
	CURRENT_TAB_DEALS    string = "Today's Deals"
	CURRENT_TAB_WISHLIST string = "Wishlist"
	CURRENT_TAB_CART     string = "Cart"
)

type GetProductsRequest struct {
	UserId     int
	CurrentTab string
}

type GetProductsResponse struct {
	Products  []Product
	CartValue float64
}
