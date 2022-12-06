import './EditProductPage.css'
import ProductApi from '../../../services/product.service'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [Product, setProduct] = useState({})
    const [UpdateProduct, setUpdateProduct] = useState({})
    const { id } = useParams()

    useEffect(() => {
        console.log(id)
        ProductApi.getOneProduct(id)
            .then(product => setProduct(product))
    }, [])

    const updateNewProduct = (event) => {
        event.preventDefault()
        ProductApi.updateProduct(UpdateProduct, Product._id)
            .then(navigate('/user/catalog'))
    }
    const updateNewProductState = (event) => {
        const { name, value } = event.target
        setProduct({ ...Product, [name]: value });
        setUpdateProduct({ ...UpdateProduct, [name]: value });
        console.log(UpdateProduct)
        console.log(Product)
    }
    const deleteProduct = (event) => {
        event.preventDefault()
        ProductApi.deleteOneProduct(Product._id)
            .then(navigate('/user/catalog'))
    }



    return (
        <div className='Newproduct-form-container'>
            <div id="Updateproduct-form">
                <h1>Update Product</h1>
                <form onSubmit={updateNewProduct} >
                    <input className='NewproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='name'
                        placeholder='name'
                        value={Product.name}>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='imgUrl'
                        placeholder='imgUrl'
                        value={Product.imgUrl}>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='description'
                        placeholder='description'
                        value={Product.description}>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='price'
                        placeholder='price'
                        value={Product.price}>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='sellerUser'
                        placeholder='sellerUser'
                        value={Product.sellerUser}>
                    </input>
                    <button type="submit" id="registerBoton">Update Product</button>
                </form>
                <form onSubmit={deleteProduct}>
                    <button type="submit" id="registerBoton">Delete Product</button>
                </form>
            </div>
        </div>
    );

}

export default Register;