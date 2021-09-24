import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [ProductSize, setProductSize] = useState(0)

    useEffect(() => {
        const body = { skip: Skip, limit: Limit }
        getProducts(body)
    }, [])

    const getProducts = (body) => {
        Axios.post('/api/product/products', body)
            .then(res => {
                if (res.data.success) {
                    if (body.loadMore) setProducts([...Products, ...res.data.info])
                    else setProducts(res.data.info)
                    setProductSize(res.data.productSize)
                } else alert('상품 정보 가져오기 실패')
            })
    }
    const loadMoreHandler = () => {
        const skip = Skip + Limit
        const body = { skip, limit: Limit, loadMore: true }
        getProducts(body)
        setSkip(skip)
    }
    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={<ImageSlider images={product.images} />}
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
            {ProductSize >= Limit &&
                <div style={{ textAlign: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
