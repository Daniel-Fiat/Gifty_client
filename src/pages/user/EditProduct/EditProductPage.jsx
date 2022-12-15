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
    const [chanceState, setChance] = useState(undefined)
    const [categoryState, setCategory] = useState(undefined)

    const { id } = useParams()
    const { user } = useContext(AuthContext);

    useEffect(() => {

        ProductApi.getOneProduct(id)
            .then(product => {
                setProduct(product)
                setCategory(product.category[0])
                setChance(product.chance[0])
            })


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
    }

    const deleteProduct = (event) => {
        event.preventDefault()
        ProductApi.deleteOneProduct(Product._id)
            .then(navigate('/user/catalog'))
    }

    return (
        <Row className='updateproduct-form-container'>
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
                    {///
                        Product &&
                        <>
                            <label htmlFor="">category</label>
                            <select onChange={updateNewProductState} name="category" id="categorySelect">
                                <option value="breakfast" selected={categoryState === "breakfast"}>breakfast</option>
                                <option value="cakes" selected={categoryState === "cakes"}>cakes</option>
                                <option value="tapas" selected={categoryState === "tapas"}>tapas</option>
                                <option value="flowers" selected={categoryState === "flowers"}>flowers</option>
                                <option value="drinks" selected={categoryState === "drinks"}>drinks</option>
                                <option value="objects" selected={categoryState === "objects"}>objects</option>
                            </select> <br />
                            <label htmlFor="">chance</label>
                            <select onChange={updateNewProductState} name="chance" id="categorySelect">
                                <option value="birthday" selected={chanceState === "birthday"}>birthday</option>
                                <option value="anniversary" selected={chanceState === "anniversary"}>anniversary</option>
                                <option value="Valentine" selected={chanceState === "Valentine"}>Valentine</option>
                                <option value="graduation" selected={chanceState === "graduation"}>graduation</option>
                            </select>
                        </>
                    }
                    <button type="submit" id="registerBoton">Update Product</button>
                </form>
                <form onSubmit={deleteProduct}>
                    <button type="submit" id="registerBoton">Delete Product</button>
                </form>
            </div>
        </Row>
    );

}

export default Register;