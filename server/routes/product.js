const { response } = require('express')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const { reset } = require('nodemon')
const { Product } = require('../models/Product')

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/') },
    filename: (req, file, cb) => { cb(null, `${Date.now()}_${file.originalname}`) },
})
const upload = multer({ storage }).single("file")

router.post("/image", (req, res) => {
    upload(req, res, err => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})

router.post('/', (req, res) => {
    const product = new Product(req.body)
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.post('/products', (req, res) => {
    const limit = req.body.limit ? parseInt(req.body.limit) : 20
    const skip = req.body.skip ? parseInt(req.body.skip) : 0
    const term = req.body.searchTerm
    const findArgs = {}
    for (let key in req.body.filter)
        if (req.body.filter[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filter[key][0],
                    $lte: req.body.filter[key][1]
                }
            } else {
                findArgs[key] = req.body.filter[key]
            }
        }
    console.log('findArgs', findArgs)
    if (term)
        Product.find(findArgs).find({ $text: { $search: term } })
            .populate('writer').skip(skip).limit(limit).exec((err, info) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, info, productSize: info.length })
            })
    else
        Product.find(findArgs).populate('writer').skip(skip).limit(limit).exec((err, info) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, info, productSize: info.length })
        })
})
router.get('/products_by_id', (req, res) => {
    const type = req.query.type
    let productIds = req.query.id

    if (type === 'array') {
        let ids = req.query.id.split(',')
        productIds = ids.map(item => { return item }) // 이게 왜 필요하지?
    }

    Product.find({ _id: { $in: productIds } }).populate('writer').exec((err, product) => {
        if (err) return res.status(400).send(err)
        return res.status(200).send(product)
    })
})
module.exports = router