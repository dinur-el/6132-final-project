import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from "react-native-vector-icons/FontAwesome";

const CartItem = props => {
    return (
        <View style={styles.listItem}>
            <Text>{props.item.name}   *   {props.item.quantity}  =  ${props.item.total}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.rmvBtn} onPress={props.onAddQuantity.bind(this, props.id)}>
                    <Icon name='plus-circle' size={20} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rmvBtn} onPress={props.onReduceQuantity.bind(this, props.id)}>
                    <Icon name='minus-circle' size={20} color='#fff' />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default CartItem;