package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"

	"myapp/healthTracker"
)

func main() {
	// Redis Connection
	// redisHosts := []string{"hp-unify_redis_1:38000", "hp-unify_redis_2:38001", "hp-unify_redis_3:38002"}
	// redisClient := redis.NewClusterClient(&redis.ClusterOptions{
	// 	Addrs:         redisHosts,
	// 	PoolSize:      50,
	// 	ReadOnly:      true,
	// 	RouteRandomly: false,
	// })

	// MySQL database configuration
	db, err := sql.Open("mysql", "Username:Password@tcp(Hostname:Port)/Database")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// GET API endpoint to fetch products
	http.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
		healthTracker.GetProducts(w, r, db)
	})

	// POST API endpoint to add product to wishlist
	http.HandleFunc("/addToWishlist", func(w http.ResponseWriter, r *http.Request) {
		healthTracker.AddToWishlist(w, r, db)
	})

	// DELETE API endpoint to remove product from wishlist
	http.HandleFunc("/deleteWishlist", func(w http.ResponseWriter, r *http.Request) {
		healthTracker.DeleteWishlist(w, r, db)
	})

	// POST API endpoint to add product to cart
	http.HandleFunc("/addToCart", func(w http.ResponseWriter, r *http.Request) {
		healthTracker.AddToCart(w, r, db)
	})

	// DELETE API endpoint to remove product from cart
	http.HandleFunc("/removeFromCart", func(w http.ResponseWriter, r *http.Request) {
		healthTracker.RemoveFromCart(w, r, db)
	})

	// POST API endpoint to purchase cart
	http.HandleFunc("/purchaseCart", func(w http.ResponseWriter, r *http.Request) {
		healthTracker.PurchaseCart(w, r, db)
	})

	fmt.Println("Server is running on http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
