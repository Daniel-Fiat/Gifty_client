import './CreateProduct.css'
import ProductApi from '../../../services/product.service'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';

const CreateProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [Product, setProduct] = useState({})
    const [imageUrl, setImageUrl] = useState("");
    localStorage.setItem("Navbar", true);

    const createNewProduct = (event) => {
        event.preventDefault()
        Product.sellerUser = user._id
        ProductApi.createProduct(Product).then(
            navigate('/user/catalog')
        )
    }
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        ProductApi
            .uploadImage(uploadData)
            .then(response => {
                console.log("response is:" + response.fileUrl)
                setProduct({ ...Product, imgUrl: response.fileUrl })
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };
    const updateNewProduct = (event) => {
        const { name, value } = event.target;
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
                    {/* <input className='NewproductInput'
                        onChange={updateNewProduct}
                        type='text'
                        name='imgUrl'
                        placeholder='imgUrl'>
                    </input> */}
                    <input type="file" name='imgUrl' onChange={(e) => handleFileUpload(e)} />
                    <textarea className='NewproductInput'
                        onChange={updateNewProduct}
                        name='description'
                        rows="4"
                        cols="40"
                        placeholder='description'>
                    </textarea>
                    <input className='NewproductInput'
                        onChange={updateNewProduct}
                        type='text'
                        name='price'
                        placeholder='price'>
                    </input>
                    <label htmlFor="">category</label>
                    <select onChange={updateNewProduct} name="category" id="categorySelect">
                        <option value=""></option>
                        <option value="breakfast">breakfast</option>
                        <option value="cakes">cakes</option>
                        <option value="tapas">tapas</option>
                        <option value="flowers">flowers</option>
                        <option value="drinks">drinks</option>
                        <option value="objects">objects</option>
                    </select> <br />
                    <label htmlFor="">chance</label>
                    <select onChange={updateNewProduct} name="chance" id="categorySelect">
                        <option value=""></option>
                        <option value="birthday">birthday</option>
                        <option value="anniversary">anniversary</option>
                        <option value="Valentine">Valentine</option>
                        <option value="graduation">graduation</option>
                    </select>
                    <button type="submit" id="registerBoton">Create Product</button>
                </form>
            </div>
        </div>
    );

}

export default CreateProduct;