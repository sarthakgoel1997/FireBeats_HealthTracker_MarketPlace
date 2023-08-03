package healthTracker

import (
	"database/sql"
	"fmt"
	"math"
	"myapp/model"
	"net/http"
)

func getUserCartRedisKey(userId int) string {
	return "productCart_userId_" + fmt.Sprint(userId)
}

func AddFloats(f1 float64, f2 float64) float64 {
	f1 = RoundOffFloat(f1, 2)
	f2 = RoundOffFloat(f2, 2)

	return RoundOffFloat(f1+f2, 2)
}

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

func floatToFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(num*output)) / output
}

func RoundOffFloat(num float64, precision float64) float64 {
	multiplier := math.Pow(10, precision)
	num = math.Round(num*multiplier) / multiplier
	num = floatToFixed(num, int(precision))
	return num
}

func getProductsForTab(req model.GetProductsRequest, db *sql.DB, w http.ResponseWriter) (resp model.GetProductsResponse) {
	// redisVal, err := redisService.Get(redisClient, getUserCartRedisKey(userIdInt))
	// if err != nil && err != redis.Nil {
	// 	fmt.Println("Getting error here", err, err.Error())
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	// fmt.Println("redisVal", redisVal)

	// Build Query
	sqlQuery := "SELECT product.*, wishlist.Id as WishlistId, cart.Id as CartId FROM product "
	if req.CurrentTab != model.CURRENT_TAB_WISHLIST {
		sqlQuery += "LEFT "
	}
	sqlQuery += "JOIN wishlist ON product.Id = wishlist.ProductId AND wishlist.UserId = ? "

	if req.CurrentTab != model.CURRENT_TAB_CART {
		sqlQuery += "LEFT "
	}
	sqlQuery += "JOIN cart ON product.Id = cart.ProductId AND cart.UserId = ? "
	sqlQuery += "ORDER BY product.Id"

	fmt.Println("sqlQuery", sqlQuery)

	rows, err := db.Query(sqlQuery, req.UserId, req.UserId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var products []model.Product
	var wishlistId, cartId sql.NullInt32
	var cartValue float64

	for rows.Next() {
		var data model.Product
		err = rows.Scan(&data.Id, &data.Name, &data.ImageUrl, &data.Price, &data.DiscountPercentage, &data.Details, &wishlistId, &cartId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		data.DiscountedPrice = RoundOffFloat(data.Price*(1-data.DiscountPercentage/100), 2)

		data.WishlistId = uint32(wishlistId.Int32)
		data.CartId = uint32(cartId.Int32)
		if data.CartId > 0 {
			cartValue = AddFloats(cartValue, data.DiscountedPrice)
		}

		products = append(products, data)
	}

	resp = model.GetProductsResponse{
		Products:  products,
		CartValue: cartValue,
	}
	return
}
