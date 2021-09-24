import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row } from 'antd'
const { Meta } = Card;

function LandingPage() {
    const [Products, setProducts] = useState([])
    useEffect(() => {
        Axios.post('/api/product/products')
            .then(res => {
                if (res.data.success) {
                    setProducts(res.data.info)
                } else alert('상품 정보 가져오기 실패')
            })
    }, [])
    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={<img src={`http://localhost:5000/${product.images[0]}`} style={{ width: '100%', maxHeight: '150px' }} />}
                >
                    <Meta
                        title={product.title}
                        description={`가격 ${product.price}`}
                    />
                </Card>
            </Col>
        )
    })
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Let's Travel Anywhere</h1>
            </div>
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            <div style={{ textAlign: 'center' }}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
