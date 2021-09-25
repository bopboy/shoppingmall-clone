import React from 'react'
import { Button, Descriptions } from 'antd'

function ProductInfo(props) {
    const clickHandler = () => {

    }
    return (
        <div>
            <Descriptions title="상품 정보" bordered>
                <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="판매여부">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="상품 설명">{props.detail.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="roudn" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
