package healthTracker

import (
	"database/sql"
	"encoding/json"
	"myapp/model"
	"net/http"
	"strconv"
)

func GetProducts(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var userIdInt int
	var currentTab string

	userIdStr := r.URL.Query().Get("userId")
	if len(userIdStr) == 0 {
		http.Error(w, "User Id cannot be empty", http.StatusBadRequest)
		return
	}
	userIdInt, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if userIdInt == 0 {
		http.Error(w, "User Id cannot be 0", http.StatusBadRequest)
		return
	}

	currentTab = r.URL.Query().Get("currentTab")

	req := model.GetProductsRequest{
		UserId:     userIdInt,
		CurrentTab: currentTab,
	}

	resp := getProductsForTab(req, db, w)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func AddToWishlist(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	// Parse the incoming JSON data from the request body
	var requestData model.AddToWishlistRequest

	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if requestData.UserId == 0 {
		http.Error(w, "User Id cannot be 0", http.StatusBadRequest)
		return
	}

	if requestData.ProductId == 0 {
		http.Error(w, "Product Id cannot be 0", http.StatusBadRequest)
		return
	}

	// Run query
	_, err = db.Exec("INSERT INTO wishlist (UserId, ProductId) VALUES (?, ?)", requestData.UserId, requestData.ProductId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Product added to wishlist successfully"))
}

func DeleteWishlist(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	// Parse the incoming JSON data from the query params
	wishlistIdStr := r.URL.Query().Get("wishlistId")
	if len(wishlistIdStr) == 0 {
		http.Error(w, "Wishlist Id cannot be empty", http.StatusBadRequest)
		return
	}

	wishlistIdInt, err := strconv.Atoi(wishlistIdStr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if wishlistIdInt == 0 {
		http.Error(w, "Wishlist Id cannot be 0", http.StatusBadRequest)
		return
	}

	// Run Query
	_, err = db.Exec("DELETE FROM wishlist WHERE Id = ?", wishlistIdInt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Product removed from wishlist successfully"))
}

func AddToCart(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	// Parse the incoming JSON data from the request body
	var requestData model.AddToCartRequest

	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if requestData.UserId == 0 {
		http.Error(w, "User Id cannot be 0", http.StatusBadRequest)
		return
	}
	if requestData.ProductId == 0 {
		http.Error(w, "Product Id cannot be 0", http.StatusBadRequest)
		return
	}

	// Run Query
	_, err = db.Exec("INSERT INTO cart (UserId, ProductId) VALUES (?, ?)", requestData.UserId, requestData.ProductId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Product added to cart successfully"))
}

func RemoveFromCart(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	// Parse the incoming JSON data from the query params
	cartIdStr := r.URL.Query().Get("cartId")
	if len(cartIdStr) == 0 {
		http.Error(w, "Cart Id cannot be empty", http.StatusBadRequest)
		return
	}

	cartIdInt, err := strconv.Atoi(cartIdStr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if cartIdInt == 0 {
		http.Error(w, "Cart Id cannot be 0", http.StatusBadRequest)
		return
	}

	// Run query
	_, err = db.Exec("DELETE FROM cart WHERE Id = ?", cartIdInt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Product removed from cart successfully"))
}

func PurchaseCart(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	// Parse the incoming JSON data from the request body
	var request model.PurchaseCartRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if request.UserId == 0 {
		http.Error(w, "User Id cannot be 0", http.StatusBadRequest)
		return
	}

	// Get Products in Cart
	getProductsReq := model.GetProductsRequest{
		UserId:     int(request.UserId),
		CurrentTab: model.CURRENT_TAB_CART,
	}
	getProductsResp := getProductsForTab(getProductsReq, db, w)
	if len(getProductsResp.Products) == 0 {
		http.Error(w, "Cart is empty", http.StatusBadRequest)
		return
	}

	// Create order
	_, err = db.Exec("INSERT INTO orders (UserId, TotalPrice, Name, Email, Address, City, State, Country, CardNumber, Expiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		request.UserId, getProductsResp.CartValue, request.Name, request.Email, request.Address, request.City, request.State, request.Country, request.CardNumber, request.Expiry)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Clear cart
	_, err = db.Exec("DELETE FROM cart WHERE UserId = ?", request.UserId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Cart purchased successfully"))
}
