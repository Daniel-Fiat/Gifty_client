import './CreateProduct.css'
import ProductApi from '../../../services/product.service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [Product, setProduct] = useState({})

    const createNewProduct = (event) => {
        event.preventDefault()
        ProductApi.createProduct(Product).then(

            navigate('/user/catalog')
        )
    }
    const updateNewProduct = (event) => {
        const { name, value } = event.target
        setProduct({ ...Product, [name]: value });
        console.log(Product)
    }



    return (
        <div className='Newproduct-form-container'>
            <div id="Newproduct-form">
                <h1>New Product</h1>
                <form onSubmit={createNewProduct} >
                    <input className='NewproductInput'
                        onChange={updateNewProduct}
                        type='text'
                        name='name'
                        placeholder='name'>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProduct}
                        type='text'
                        name='imgUrl'
                        placeholder='imgUrl'>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProduct}
                        type='text'
                        name='description'
                        placeholder='description'>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProduct}
                        type='text'
                        name='price'
                        placeholder='price'>
                    </input>
                    <input className='NewproductInput'
                        onChange={updateNewProduct}
                        type='text'
                        name='sellerUser'
                        placeholder='sellerUser'>
                    </input>

                    <button type="submit" id="registerBoton">Create Product</button>
                </form>
            </div>
        </div>
    );

}

export default CreateProduct;