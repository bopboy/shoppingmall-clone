import React from 'react'
import './UserCardBlock.css'

function UserCardBlock(props) {
    const renderCartImage = (images) => {
        if (images.length > 0) return `http://localhost:5000/${images[0]}`
    }
    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img src={renderCartImage(product.images)} style={{ width: '70px' }} alt="상품 이미지" />
                </td>
                <td>{product.quantity} EA</td>
                <td>${product.price}</td>
                <td><button onClick={() => props.removeItem(product._id)}>삭제</button></td>
            </tr>
        ))
    )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품 수량</th>
                        <th>상품 가격</th>
                        <th>상품 삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
