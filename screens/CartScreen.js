import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../styles/styles';
import { ItemContext } from '../context/item-context'
import CartItem from '../components/CartItem';

const CartScreen = (props) => {
    const itemCtx = useContext(ItemContext);

    const purchaseHandler = () => {
        itemCtx.removeAll();
        console.log("final total......", itemCtx.finalTotal)
        console.log("deducted......", itemCtx.deducted)
    }

    const addQuantityHandler = (itemId) => {
        itemCtx.addQuantity(itemId);
        console.log("final total......", itemCtx.finalTotal)
        console.log("deducted......", itemCtx.deducted)
    }
    const reduceQuantityHandler = (itemId) => {
        itemCtx.reduceQuantity(itemId);
        console.log("final total......", itemCtx.finalTotal)
        console.log("deducted......", itemCtx.deducted)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={purchaseHandler}
            >
                <Text style={styles.buttonText}>Purchase</Text>
            </TouchableOpacity>
            <FlatList
                data={itemCtx.items}
                // keyExtractor={itemId}
                renderItem={
                    (itemData) => (
                        <CartItem
                            id={itemData.item.itemId}
                            onAddQuantity={() => addQuantityHandler(itemData.item.itemId)}
                            onReduceQuantity={() => reduceQuantityHandler(itemData.item.itemId)}
                            item={itemData.item}
                        />
                    )
                }
            />

            <View style={styles.listItem}>
                <Text>Discount</Text>
                <Text>80 or more: 15%</Text>
                <Text>100 or more: 20%</Text>
            </View>


            <Text>FINAL TOTAL: {itemCtx.finalTotal}</Text>
            <Text>Deducted: {itemCtx.deducted}</Text>
        </View>
    )
}

export default CartScreen