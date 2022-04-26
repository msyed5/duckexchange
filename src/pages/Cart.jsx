import React, { useState, useEffect } from 'react';



function Cart () {
    const commerce = new Commerce(process.env)
    const [cart, setCart] = useState()
    const addToCart = (productId, variantInfo) => {
        if (variantInfo) {
            commerce.cart.add(productId, 1, variantInfo).then(res => {
                setCart(res.cart)
            })
        }
        else {
            window.alert('Please select a shirt size - temporary')
        }
    }
    
    useEffect(() => {
        commerce.cart.retrieve()
            .then(res => {
                setCart(res)
            })
    }, [])

    return (
        <div className="AddToCart">
            <Nav cart={cart} emptyCart={emptyCart}/>
            <Grid centered stackable padded relaxed>
                <Grid.Column className='left-column' width={5}>
                    <LeftPanel />
                </Grid.Column>
                <Grid.Column width={9}>
                    <ProductContainer   
                        addToCart={addToCart}
                    />
                </Grid.Column>
            </Grid>
            <Footer />
        </div>
    );
}

export default Cart;