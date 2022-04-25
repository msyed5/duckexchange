import React from 'react';

function CartButtons ( {signedIn} ) {
    const handleButtonAddCart = e => {
        e.preventDefault()
        props.addToCart(props.product.id, variantInfo)
    }

    <Button fluid className='add-button' onClick={handleButtonAddCart}>
        Add to Cart
        <Icon name='arrow right' />
    </Button>
}

export default CartButtons;