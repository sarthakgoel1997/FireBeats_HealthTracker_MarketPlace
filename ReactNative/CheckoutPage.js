import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { styles } from './styles';

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { name, email, address, city, state, country, cardNumber, expiry, updatePaymentDetails } = this.props;

    return (
      <View style={[styles.appContainer]}>
        <ScrollView>
          <Text>Shipping Information</Text>
          
          <View style={[styles.shadowContainer, styles.mb50]}>
            <View style={styles.shippingDetailsContainer}>

            <View style={[styles.flexDirectionColumn, styles.flexStart]}>

              <View style={[styles.flexDirectionRow]}>
                <Text style={[styles.bold]}>Name</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter your name"
                  onChangeText={(text) => updatePaymentDetails('name', text)}
                  value={name}
                />
              </View>

              <View style={[styles.flexDirectionRow, styles.mt20]}>
                <Text style={[styles.bold]}>Email</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter email"
                  onChangeText={(text) => updatePaymentDetails('email', text)}
                  value={email}
                />
              </View>

              <View style={[styles.flexDirectionRow, styles.mt20]}>
                <Text style={[styles.bold]}>Address</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter address"
                  onChangeText={(text) => updatePaymentDetails('address', text)}
                  value={address}
                />
              </View>

              <View style={[styles.flexDirectionRow, styles.mt20]}>
                <Text style={[styles.bold]}>City</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter city"
                  onChangeText={(text) => updatePaymentDetails('city', text)}
                  value={city}
                />
              </View>

              <View style={[styles.flexDirectionRow, styles.mt20]}>
                <Text style={[styles.bold]}>State</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter state"
                  onChangeText={(text) => updatePaymentDetails('state', text)}
                  value={state}
                />
              </View>

              <View style={[styles.flexDirectionRow, styles.mt20]}>
                <Text style={[styles.bold]}>Country</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter country"
                  onChangeText={(text) => updatePaymentDetails('country', text)}
                  value={country}
                />
              </View>

            </View>

            </View>
          </View>



          <Text>Payment Information</Text>
          
          <View style={styles.shadowContainer}>
            <View style={styles.shippingDetailsContainer}>

            <View style={[styles.flexDirectionColumn, styles.flexStart]}>

              <View style={[styles.flexDirectionRow]}>
                <Text style={[styles.bold]}>Card Number</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter card number"
                  onChangeText={(text) => updatePaymentDetails('cardNumber', text)}
                  value={cardNumber}
                />
              </View>

              <View style={[styles.flexDirectionRow, styles.mt20]}>
                <Text style={[styles.bold]}>Expiry</Text>
                <TextInput
                  style={[styles.ml10]}
                  placeholder="Enter Expiry"
                  onChangeText={(text) => updatePaymentDetails('expiry', text)}
                  value={expiry}
                />
              </View>

            </View>

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CheckoutPage;
