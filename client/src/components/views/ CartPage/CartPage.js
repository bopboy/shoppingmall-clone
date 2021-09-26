import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions'
import { removeCartItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Empty } from 'antd'

function CartPage(props) {
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        let cartItems = []
        if (props.user.userData && props.user.userData.cart)
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => { cartItems.push(item.id) })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(res => calculateTotal(res.payload))
            }
    }, [props.user.userData])
    const calculateTotal = (cartDetail) => {
        let total = 0
        cartDetail.map(item => { total += parseInt(item.price, 10) * item.quantity })
        setTotal(total)
        setShowTotal(true)
    }
    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(res => {
                if (res.payload.productInfo.length <= 0) setShowTotal(false)
            })
    }
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>장바구니</h1>
            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart} />
            </div>
            {ShowTotal ?
                <div style={{ marginTop: '3rem' }}>
                    <h2>총 합계: ${Total}</h2>
                </div>
                :
                <>
                    <br />
                    <Empty description={false} />
                </>
            }
        </div>
    )
}

export default CartPage