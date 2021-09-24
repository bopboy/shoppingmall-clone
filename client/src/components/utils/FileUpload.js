import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Icon } from 'antd'

function FileUpload() {
    const [Images, setImages] = useState([])
    const dropHandler = (files) => {
        let formData = new FormData()
        const config = { header: { 'content-type': 'multipart/form-data' } }
        formData.append("file", files[0])
        axios.post('/api/product/image', formData, config)
            .then(res => {
                if (res.data.success) {
                    setImages([...Images, res.data.filePath])
                    console.log(res.data)
                } else alert('파일 저장 실패')
            })
    }
    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)
        const newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {
                    ({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()} style={{ width: 300, height: 240, border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '5rem' }} />
                            </div>
                        </section>
                    )
                }
            </Dropzone>
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div key={index} onClick={() => deleteHandler(image)}>
                        <img
                            style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`} alt="image"
                        />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default FileUpload
