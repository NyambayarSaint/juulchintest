import React, { createContext } from 'react';
import { addCart, getCart, setQuantity, setCart, removeCart } from './cart';

export const Ecommerce = createContext();

export class EcommerceProvider extends React.Component {

    state = {
        user: this.props.initialAuth,
        items: [],
        cart: getCart()
    }

    handleSet = (data) => this.setState(data);

    handleAddCart = (product, qty) => {
        addCart(product, qty);
        this.setState({ cart: getCart() });
    }
    handleRemoveCart = (product) => {
        removeCart(product)
        this.setState({ cart: getCart() });
    }
    handleSetQuantity = (product, qty) => {
        setQuantity(product, qty);
        this.setState({ cart: getCart() });
    }

    handleEmptyCart = () => {
        setCart([]);
        this.setState({cart: []});
    }

    render() {
        return (
            <Ecommerce.Provider value={{
                ...this.state,
                set: this.handleSet,
                handleAddCart: this.handleAddCart,
                handleSetQuantity: this.handleSetQuantity,
                handleEmptyCart: this.handleEmptyCart,
                handleRemoveCart: this.handleRemoveCart
            }}>
                {this.props.children}
            </Ecommerce.Provider>
        )
    }
}