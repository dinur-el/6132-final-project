import { createContext, useReducer } from 'react';

export const ItemContext = createContext({
    items: [],
    finalTotal: 0,
    deducted: 0,
    addItem: (item) => { },
    addQuantity: (itemId) => { },
    reduceQuantity: (itemId) => { },
    removeAll: () => { },
})

function itemReducer(state, action) {
    let finalTotal = state.finalTotal;
    let deducted = state.deducted;
    let newItems;

    switch (action.type) {
        case 'ADD':
            const itemId = action.payload.itemId;

            const itemExists = state.items.some((item) => {
                return item.itemId === itemId;
            });

            if (!itemExists) {
                newItems = [...state.items, action.payload];
                finalTotal = finalTotal + action.payload.price;
            }
            else {
                newItems = state.items.map((item) => {
                    if (item.itemId === itemId) {
                        const newItem = {
                            ...item,
                            quantity: item.quantity + 1,
                            total: item.total + item.price
                        };

                        finalTotal = finalTotal + item.price;
                        return newItem;
                    }

                    return item;
                });
            }

            if (finalTotal >= 80 && finalTotal < 100) {
                deducted = finalTotal * 15 / 100;
            } else if (finalTotal >= 100) {
                deducted = finalTotal * 20 / 100;
            }

            return {
                items: newItems,
                finalTotal: finalTotal - deducted,
                deducted: deducted
            }

        case 'INC_QTY':
            newItems = state.items.map((item) => {
                if (item.itemId === action.payload) {
                    const newItem = {
                        ...item,
                        quantity: item.quantity + 1,
                        total: item.total + item.price
                    };

                    finalTotal = finalTotal + item.price;
                    return newItem;
                }

                return item;
            });

            if (finalTotal > 80 && finalTotal < 100) {
                deducted = finalTotal * 15 / 100;
            } else if (finalTotal >= 100) {
                deducted = finalTotal * 20 / 100;
            }

            return {
                items: newItems,
                finalTotal: finalTotal - deducted,
                deducted: deducted
            }

        case 'DEC_QTY':
            newItems = state.items.map((item) => {
                if (item.itemId === action.payload) {
                    const newItem = {
                        ...item,
                        quantity: item.quantity - 1,
                        total: item.total - item.price
                    };

                    finalTotal = finalTotal - item.price;
                    return newItem
                }
                else {
                    return item;
                }
            });

            if (finalTotal > 80 && finalTotal < 100) {
                deducted = finalTotal * 15 / 100;
            } else if (finalTotal >= 100) {
                deducted = finalTotal * 20 / 100;
            }

            return {
                items: newItems.filter((item) => item.quantity > 0),
                finalTotal: finalTotal - deducted,
                deducted: deducted
            }

        case 'REMOVE_ALL':
            return {
                items: [],
                finalTotal: 0,
                deducted: 0,
            };

        default:
            return state;

    }
}

function ItemContextProvider({ children }) {
    const initialState = {
        items: [],
        finalTotal: 0,
        deducted: 0,
    };

    const [cartState, dispatch] = useReducer(itemReducer, initialState);

    function addItem(item) {
        dispatch({ type: 'ADD', payload: item });
    }

    function addQuantity(itemId) {
        dispatch({ type: 'INC_QTY', payload: itemId });
    }

    function reduceQuantity(itemId) {
        dispatch({ type: 'DEC_QTY', payload: itemId });
    }

    function removeAll() {
        dispatch({ type: 'REMOVE_ALL' });
    }

    const value = {
        items: cartState.items,
        finalTotal: cartState.finalTotal,
        deducted: cartState.deducted,
        addItem: addItem,
        addQuantity: addQuantity,
        reduceQuantity: reduceQuantity,
        removeAll: removeAll,
    }

    return <ItemContext.Provider value={value}>
        {children}
    </ItemContext.Provider>
}

export default ItemContextProvider; 