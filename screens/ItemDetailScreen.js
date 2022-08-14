import React from 'react';
import WebView from "react-native-webview";

const ItemDetailScreen = (props) => {

    let { name, price, description, manufacturer, Image } = props.route.params.item

    const view = `
    <html>
        <h1> ${name} </h1>
        <h2> ${price} </h2>
        <h2> ${description} </h2>
        <h2> ${manufacturer} </h2>
        <img src=${Image} alt=${name} width="80%" height="30%">
    </html>
    `

    return (
        <WebView
            source = {{html:view}}
            onLoad = {console.log()}
        />
    )
}

export default ItemDetailScreen