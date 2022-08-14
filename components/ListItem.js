import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import Icon from "react-native-vector-icons/FontAwesome";

const ListItem = props => {
    return (

        <View style={styles.listItem}>
            <TouchableOpacity onPress={props.onSelect.bind(this, props.id)}>
                <Text>{props.item.name}                                 ${props.item.price}</Text>
                <Text></Text>
                <Text>{props.item.description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={styles.rmvBtn} onPress={props.onAddItem.bind(this, props.id)}>
                        <Icon name='plus-circle' size={20} color='#fff' />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View >
    )
}

export default ListItem;