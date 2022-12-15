import './EditProductPage.css'
import ProductApi from '../../../services/product.service'
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import { Row } from 'react-bootstrap';

const Register = () => {
    const navigate = useNavigate();
    const [Product, setProduct] = useState({})
    const [UpdateProduct, setUpdateProduct] = useState(Product)

    const { id } = useParams()
    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log(id)
        ProductApi.getOneProduct(id)
            .then(product => setProduct(product))
    }, [])

    const updateNewProduct = (event) => {
        event.preventDefault()
        UpdateProduct.sellerUser = user._id
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
        <Row className='updateproduct-form-container'>
            <div id="Updateproduct-form-container">
                <h1>Update Product</h1>
                <form id="Updateproduct-form" onSubmit={updateNewProduct} >
                    <label htmlFor="">Name</label>
                    <input className='editproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='name'
                        placeholder='name'
                        value={Product.name}>
                    </input>
                    <label htmlFor="">Image</label>
                    <input className='editproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='imgUrl'
                        placeholder='imgUrl'
                        value={Product.imgUrl}>
                    </input>
                    <label htmlFor="">Description</label>
                    <input className='editproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='description'
                        placeholder='description'
                        value={Product.description}>
                    </input>
                    <label htmlFor="">Price</label>
                    <input className='editproductInput'
                        onChange={updateNewProductState}
                        type='text'
                        name='price'
                        placeholder='price'
                        value={Product.price}>
                    </input>
                    <label htmlFor="">Category</label>
                    <select onChange={updateNewProduct} name="category" className="editproductInput">
                        <option value=""></option>
                        <option value="breakfast">breakfast</option>
                        <option value="cakes">cakes</option>
                        <option value="tapas">tapas</option>
                        <option value="flowers">flowers</option>
                        <option value="drinks">drinks</option>
                        <option value="objects">objects</option>
                    </select>
                    <label htmlFor="">Chance</label>
                    <select onChange={updateNewProduct} name="chance" className="editproductInput">
                        <option value=""></option>
                        <option value="birthday">birthday</option>
                        <option value="anniversary">anniversary</option>
                        <option value="Valentine">Valentine</option>
                        <option value="graduation">graduation</option>
                    </select>
                    <button type="submit" id="registerBoton">Update Product</button>
                </form>
                <form id="Updateproduct-form" onSubmit={deleteProduct}>
                    <button type="submit" id="registerBoton">Delete Product</button>
                </form>
            </div>
        </Row>
    );

}

export default Register;