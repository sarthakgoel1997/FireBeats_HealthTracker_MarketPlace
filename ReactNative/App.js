import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { styles } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ProductCards from './ProductCards';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckoutPage from './CheckoutPage';
import CustomDialog from './CustomDialog'

const Tabs = ["Today's Deals", "Wishlist", "Cart"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productData: [],
      cartValue: 0,
      currentTab: 0,

      displayCheckoutPage: false,
      paymentConfirmation: false,

      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      country: '',
      cardNumber: '',
      expiry: '',
      emptyFieldsError: '',

      shareProductModal: false,
      emailAddresses: '',
      message: ''
    };
  }

  componentDidMount() {
    this.fetchData(1);
  }

  refreshData = () => {
    this.fetchData(1);
  };
  

  fetchData = async (userId) => {
    const { currentTab } = this.state;
    
    try {
      const response = await axios.get(`http://192.168.1.77:8000/products?userId=${userId}&currentTab=${Tabs[currentTab]}`);
      this.setState({ productData: response.data.Products, cartValue: response.data.CartValue, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  verifyPaymentDetails = () => {
    const { name, email, address, city, state, country, cardNumber, expiry } = this.state;
    if (name === '' || email === '' || city === '' || address === '' || state === '' || country === '' || cardNumber === '' || expiry === '') {
      this.setState({emptyFieldsError: 'Check empty fields'});
      return false;
    } else {
      this.setState({emptyFieldsError: ''});
    }

    return true
  }

  cartAction = async () => {
    const { currentTab, displayCheckoutPage } = this.state;

    if (displayCheckoutPage) {
      paymentData = this.verifyPaymentDetails();
      if(!paymentData) {
        return;
      }

      this.purchaseCart();
      this.setState({paymentConfirmation: true});
    } else if(currentTab === 2) {
      this.setState({displayCheckoutPage: true});
    } else {
      this.setState({currentTab: 2}, () => {this.fetchData(1)});
    }
  };

  changeTab = async () => {
    const { currentTab, displayCheckoutPage } = this.state;
    if (displayCheckoutPage) {
      this.setState({displayCheckoutPage: false}, () => {this.refreshData()});
    } else {
      this.setState({currentTab: (currentTab+1)%3}, () => {this.fetchData(1)});
    }
  };

  paymentConfirmed = async () => {
    this.setState({paymentConfirmation: false, displayCheckoutPage: false, currentTab: 0}, () => {this.fetchData(1)});
  };

  updatePaymentDetails = async (field, value) => {
    this.setState({[field] : value});
  }

  purchaseCart = async () => {
    const { name, email, address, city, state, country, cardNumber, expiry } = this.state;

    const payload = {
      UserId: 1,
      Name: name,
      Email: email,
      Address: address,
      City: city,
      State: state,
      Country: country,
      CardNumber: cardNumber,
      Expiry: expiry
    }

    const response = await axios.post(`http://192.168.1.77:8000/purchaseCart`, payload);
    console.log('cart purchased', response);
  };

  getCustomDialogBoxBody = () => {
    const {paymentConfirmation, shareProductModal, emailAddresses, message} = this.state;

    if (paymentConfirmation) {
      return (
        <Text style={styles.dialogText}>Your payment has been received. Thank you!</Text>
      );
    }

    if (shareProductModal) {
      return (
        <View>
          <Text style={[styles.center, styles.mb5]}>Share</Text>
          <TextInput
            style={[styles.shareTexts]}
            multiline={true}
            placeholder="Enter email addresses of your friends (seperated by comma)"
            onChangeText={(text) => this.setState({emailAddresses: text})}
            value={emailAddresses}
          />

          <TextInput
            style={[styles.shareTexts]}
            multiline={true}
            placeholder="Enter your message (optional)"
            onChangeText={(text) => this.setState({message: text})}
            value={message}
          />
        </View>
      );
    }
  }

  displayShareProductModal = () => {
    this.setState({shareProductModal: true});
  }

  shareProduct = async () => {
    this.setState({shareProductModal: false, emailAddresses: '', message: ''});
  };

  render() {
    const { loading, productData, cartValue, currentTab, displayCheckoutPage, paymentConfirmation, name, email, address, city, state, country, cardNumber, expiry, emptyFieldsError, shareProductModal } = this.state;

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }

    return (
      <View style={[styles.appContainer]}>
        <CustomDialog 
          visible={paymentConfirmation || shareProductModal} 
          submit={paymentConfirmation ? this.paymentConfirmed : this.shareProduct} 
          body={this.getCustomDialogBoxBody()} 
        />
        
        <View style={[styles.flexDirectionRow, styles.spaceBetween, styles.m10]}>

          <View style={[styles.flexDirectionRow, styles.flexStart]}>
            <FontAwesome name="user" size={30} color="gray" />

            <View style={[styles.flexDirectionColumn, styles.ml5]}>
              <Text>Good Morning!</Text>
              <Text>Sarthak Goel</Text>
            </View>
          </View>

          <View style={[styles.flexDirectionRow]}>
            <FontAwesome name="shopping-cart" size={30} color="green" />
            <Feather name="info" size={30} color="gray" style={styles.ml10} />
            <MaterialIcons name="contact-mail" size={30} color="gray" style={styles.ml10} />
            <FontAwesome name="bell" size={30} color="gray" style={styles.ml10} />
          </View>
        </View>

        <View style={[styles.flexDirectionRow, styles.spaceBetween, styles.m10]}>

          <TouchableOpacity onPress={() => this.changeTab()}>
            <Feather name="chevron-left" size={30} color="gray" />
          </TouchableOpacity>

          <Text>{displayCheckoutPage ? 'Checkout' : Tabs[currentTab]}</Text>
          <FontAwesome name="list-alt" size={30} color="gray"/>

        </View>

        {
          displayCheckoutPage ?
          <CheckoutPage
            name={name}
            email={email}
            address={address}
            city={city}
            state={state}
            country={country}
            cardNumber={cardNumber}
            expiry={expiry}
            updatePaymentDetails={this.updatePaymentDetails}
          /> :
          <ProductCards 
            data={productData}
            refreshData={this.refreshData}
            displayShareProductModal={this.displayShareProductModal}
          />
        }
        
        <TouchableOpacity 
          onPress={() => this.cartAction()}
          disabled={cartValue === 0}
          style={[styles.flexDirectionRow, styles.flexCenter, styles.center, styles.viewCartButton, styles.width90, cartValue > 0 ? styles.greenBackground : styles.grayBackground]}
        >
          <Text style={[styles.whiteColor]}>
            {cartValue === 0 ? 'Your cart is empty' : currentTab === 2 ? `${displayCheckoutPage ? 'Make Payment' : 'Checkout'} (Total: $${cartValue})` : 'View cart'}
          </Text>
        </TouchableOpacity>

        {emptyFieldsError && <Text style={[styles.redColor, styles.center, styles.mb5]}>{emptyFieldsError}</Text>}

      </View>
    );
  }
}

export default App;