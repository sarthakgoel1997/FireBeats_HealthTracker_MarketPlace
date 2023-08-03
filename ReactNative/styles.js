import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  appContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: 'white'
  },

  shadowContainer: {
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  itemContainer: {
    borderWidth: 1,
    borderColor: '#979797',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    margin: 10
  },

  shippingDetailsContainer: {
    borderWidth: 1,
    borderColor: '#979797',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  // Images
  productImage: {
    width: 100,
    height: 155,
  },

  discountImage: {
    width: 80,
    height: 30,
  },

  center: {
    alignSelf: 'center',
  },

  bold: {
    fontWeight: 'bold',
  },

  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
  },

  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  flexDirectionColumn: {
    flexDirection: 'column'
  },

  flexEnd: {
    justifyContent: 'flex-end'
  },

  flexStart: {
    justifyContent: 'flex-start'
  },

  spaceBetween: {
    justifyContent: 'space-between'
  },

  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },

  flexCenter: {
    justifyContent: 'center'
  },

  addToCartButton: {
    padding: 5,
  },

  viewCartButton: {
    padding: 10,
    margin: 10
  },

  // Colors
  whiteColor: {
    color: 'white',
  },

  grayColor: {
    color: '#434343B2',
  },

  redColor: {
    color: 'red',
  },

  greenBackground: {
    backgroundColor: '#759D75',
  },

  grayBackground: {
    backgroundColor: '#97979780',
  },

  // Margin Bottom
  mb5: {
    marginBottom: 5
  },

  mb10: {
    marginBottom: 10
  },

  mb20: {
    marginBottom: 20
  },

  mb100: {
    marginBottom: 100
  },

  mb50: {
    marginBottom: 50
  },

  // Margin Left
  ml5: {
    marginLeft: 5
  },

  ml10: {
    marginLeft: 10
  },

  m10: {
    margin: 10
  },

  mt20: {
    marginTop: 20
  },

  width50: {
    width: '50%'
  },

  width60: {
    width: '60%'
  },

  width90: {
    width: '90%'
  },

  // Dialog Box
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  dialogBox: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 100,
    borderRadius: 20,
    alignItems: 'center',
  },

  dialogText: {
    marginBottom: 20,
    textAlign: 'center',
  },

  okayButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },

  shareTexts: {
    width: 250,
    height: 60,
    marginBottom: 5
  }
});
