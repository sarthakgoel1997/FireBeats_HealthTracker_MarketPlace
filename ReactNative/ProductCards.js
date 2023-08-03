import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import CollapsibleDataField from './CollapsibleDataField';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

class ProductCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  updateCart = async (product) => {
    if(product.CartId === 0) {
      const payload = {
        UserId: 1,
        ProductId: product.Id
      }

      const response = await axios.post(`http://192.168.1.77:8000/addToCart`, payload);
      console.log('add product to cart:', response.data);
    } else {
      const response = await axios.delete(`http://192.168.1.77:8000/removeFromCart?cartId=${product.CartId}`);
      console.log('delete cart', response.data);
    }

    const { refreshData } = this.props;
    refreshData();
  };

  updateWishlist = async (product) => {
    // add product to wishlist
    if (product.WishlistId === 0) {
      const payload = {
        UserId: 1,
        ProductId: product.Id
      }

      const response = await axios.post(`http://192.168.1.77:8000/addToWishlist`, payload);
      console.log('add product to wishlist:', response.data);
    } else {
      const response = await axios.delete(`http://192.168.1.77:8000/deleteWishlist?wishlistId=${product.WishlistId}`);
      console.log('delete wishlist', response.data);
    }

    const { refreshData } = this.props;
    refreshData();
  };

  render() {
    const { data, displayShareProductModal } = this.props;

    return (
        <FlatList
          data={data}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item }) => (
            <View style={styles.shadowContainer}>
              <View style={styles.itemContainer}>

              <View style={[styles.flexDirectionRow, styles.spaceBetween, styles.mb10]}>

                <TouchableOpacity onPress={() => displayShareProductModal(item)}>
                  <Entypo name="share" size={25} color="gray"/>
                </TouchableOpacity>

                { (item.DiscountPercentage === 20 || item.DiscountPercentage === 25) &&
                    <Image
                      source={{ uri: item.DiscountPercentage === 20 ? 'https://dev.hyperpure.com/data/images/assets/discount_20.png' : 'https://dev.hyperpure.com/data/images/assets/discount_25.png' }}
                      style={[styles.discountImage]}
                    />
                }
              </View>

              <TouchableOpacity onPress={() => this.updateWishlist(item)}>
                {item.WishlistId > 0 ? <FontAwesome name="heart" size={25} color="red" /> : <FontAwesome name="heart-o" size={25} color="gray" /> }
              </TouchableOpacity>

                {
                  item.ImageUrl && 
                  <Image
                    source={{ uri: item.ImageUrl }}
                    style={[styles.productImage, styles.center, styles.mb10]}
                  />
                }
                
                <Text style={[styles.bold, styles.center, styles.mb5]}>{item.Name}</Text>
                
                <Text style={[styles.center]}>
                  Regular Price: $
                  <Text style={[styles.strikethrough]}>
                    {item.Price}
                  </Text>
                </Text>


                <Text style={[styles.center, styles.mb10]}>
                  You pay: ${item.DiscountedPrice}
                </Text>

                <TouchableOpacity 
                  onPress={() => this.updateCart(item)}
                  style={[styles.flexDirectionRow, styles.flexCenter, styles.center, styles.addToCartButton, styles.width60, styles.greenBackground, styles.mb20]}
                >
                  <Text style={[styles.whiteColor]}>{item.CartId > 0 ? 'Remove from cart' : 'Add to cart'} </Text>
                  <FontAwesome name="cart-plus" size={20} color="white"/>
                </TouchableOpacity>

                <CollapsibleDataField data={item.Details}/>
                
              </View>
            </View>
          )}
        />
    );
  }
}

export default ProductCards;
