import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Data'

const { Meta } = Card;

function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [ProductSize, setProductSize] = useState(0)
    const [Filters, setFilters] = useState({ continents: [], prices: [] })
    const [SearchTerm, setSearchTerm] = useState("")

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
                    cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
                >
                    <Meta
                        title={product.title}
                        description={`가격 ${product.price}`}
                    />
                </Card>
            </Col>
        )
    })
    const showFilteredResult = (filter) => {
        const body = { skip: 0, limit: Limit, filter }
        getProducts(body)
        setSkip(0)
    }
    const handlePrice = (value) => {
        const data = price
        let array = []
        for (let key in data)
            if (data[key]._id === parseInt(value, 10)) array = data[key].array
        return array

    }
    const handleFilters = (filter, category) => {
        const newFilter = { ...Filters }
        newFilter[category] = filter

        if (category === 'price') {
            const priceArr = handlePrice(filter)
            newFilter[category] = priceArr
        }
        showFilteredResult(newFilter)
        setFilters(newFilter)
    }
    const updateSearchTerm = (value) => {
        const body = {
            skip: 0,
            limit: Limit,
            filter: Filters,
            searchTerm: value
        }
        setSkip(0)
        setSearchTerm(value)
        getProducts(body)
    }
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Let's Travel Anywhere</h1>
            </div>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filter => handleFilters(filter, "continent")} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={filter => handleFilters(filter, "price")} />
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            {
                ProductSize >= Limit &&
                <div style={{ textAlign: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
        </div >
    )
}

export default LandingPage
