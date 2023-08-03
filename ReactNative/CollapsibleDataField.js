import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';

class CollapsibleDataField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  toggleCollapsible = () => {
    this.setState((prevState) => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  };

  render() {
    const { isCollapsed } = this.state;
    const { data } = this.props;

    return (
      <View>
        {!isCollapsed && <View style={[styles.line, styles.mb10]} />}

        <TouchableOpacity onPress={this.toggleCollapsible}>
          <View style={[styles.flexDirectionRow, isCollapsed ? styles.flexEnd : styles.spaceBetween ]}>
            <Text style={[styles.grayColor]}>{isCollapsed ? 'See ' : ''}Details</Text>

            <Icon
              name= {isCollapsed ? 'chevron-down' : 'chevron-up'}
              size={20}
              color="gray"
            />
          </View>
        </TouchableOpacity>

        {isCollapsed ? null : (
          <View>
            <Text style={[styles.grayColor]}>{data}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default CollapsibleDataField;
