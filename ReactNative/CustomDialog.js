import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styles } from './styles';

class CustomDialog extends Component {
    render() {
      const { visible, submit, body } = this.props;
  
      return (
        <Modal visible={visible} transparent>
          <View style={styles.dialogContainer}>
            <View style={styles.dialogBox}>
              {body}

              <TouchableOpacity 
                onPress={() => submit()}
                style={[styles.center, styles.okayButton, styles.greenBackground]}
              >
                <Text style={[styles.whiteColor]}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
}

export default CustomDialog;