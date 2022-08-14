
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { styles } from '../styles/styles';
import { data } from '../data.json'
import ListItem from '../components/ListItem';
import { ItemContext } from '../context/item-context'

const HomeScreen = (props) => {
    const itemCtx = useContext(ItemContext);

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        setItemList(data)
    }, []);


    const addItemHandler = (item) => {
        const cartItem = {
            itemId: item.itemId,
            name: item.name,
            price: item.price,
            quantity: 1,
            total: item.price
        }
        itemCtx.addItem(cartItem)
        console.log("final total......", itemCtx.finalTotal)
        console.log("deducted......", itemCtx.deducted)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
            onPress={() => props.navigation.navigate('CartScreen')}
            >
                <Text style={styles.buttonText}>View Cart</Text>
            </TouchableOpacity>
            <FlatList
                data={itemList}
                renderItem={
                    (itemData) => (
                        <ListItem
                            id={itemData.item.itemId}
                            onSelect={() => props.navigation.navigate('ItemDetailScreen',
                                {
                                    item: itemData.item
                                })}
                            onAddItem={() => addItemHandler(itemData.item)}
                            item={itemData.item}
                        />
                    )
                }
            />


        </View>
    )
}

export default HomeScreen