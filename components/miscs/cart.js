export const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
    try {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            return cart
        }
    } catch (err) {

    }
    return []
}

// export const getCount = (cartGiven) => {
//     let total = 0;
//     if(cartGiven){ 
//         cartGiven.map(el=>total = total + el.qty);
//         return total;
//     }
//     getCart().map(el=>total = total + el.qty);
//     return total
// }

export const getTotalPrice = (incomingCart) => {

    let totalPrice = 0;

    if(incomingCart){
        incomingCart.map(el=>totalPrice = totalPrice + el.amount);
        return totalPrice
    }

    const cart = getCart();
    cart.map(el=>totalPrice = totalPrice + el.amount);
    return totalPrice
}

export const addCart = (product) => {
    const cart = getCart();

    // If the product is already there
    const indexOfProduct = cart.findIndex((alreadyInCart) =>
        alreadyInCart.schedule_id === product.schedule_id
    )

    if (indexOfProduct !== -1) {
        // Update the quantity
        cart[indexOfProduct] = product
    }
    else {
        // Push the product
        cart.push(product);
    }

    setCart(cart)
}

export const removeCart = (product) => {
    const cart = getCart()
    const indexOfProduct = cart.findIndex((alreadyInCart) =>
        alreadyInCart.schedule_id === product.schedule_id
    )
    cart.splice(indexOfProduct, 1)
    setCart(cart)
}

export const setQuantity = (product, qty) => {
    const cart = getCart();

    // If the product is there
    const indexOfProduct = cart.findIndex((alreadyInCart) =>
        alreadyInCart.schedule_id === product.schedule_id
    )

    if (indexOfProduct !== -1) {
        // Update the quantity
        cart[indexOfProduct].qty = parseInt(qty);

        if (cart[indexOfProduct].qty === 0) {
            // Remove product from the cart
            cart.splice(indexOfProduct, 1)
        }
    }
    setCart(cart);
}
