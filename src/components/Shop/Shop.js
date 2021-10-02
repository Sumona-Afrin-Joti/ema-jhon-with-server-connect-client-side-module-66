import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchedProducts,SetSearchedProducts] = useState([]);
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                SetSearchedProducts(data);
            })
    }, []);

    useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                console.log(addedProduct)
                storedCart.push(addedProduct);
                
                
                
            }
            setCart(storedCart);
        }

    }, [products])
    
    const handleAddToCart = (product) => {
        const exists = cart.find(pd=>pd.key===product.key);
        let newCart = []
        if(exists){
            exists.quantity = exists.quantity + 1;
            const rest =cart.filter(pd=>pd.key!==product.key);
            newCart = [...rest,exists];

        }
        else{
            product.quantity = 1;
            newCart = [...cart,product]
        }
        setCart(newCart);
        addToDb(product.key)
    }
    
    const handleSearchedProduct = (event) =>{
        const searchedText = event.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchedText.toLowerCase()));
        searchedProducts(matchedProduct);
        console.log(matchedProduct.length)
    }

    return (
        <div>
            <div className="searchBoxContainer">
                <input onChange={handleSearchedProduct} type="text" />
            </div>

            <div className="shop-container">
                <div className="product-container">

                    {
                        searchedProducts.map(product => <Product
                            key={product.key}
                            product={product} handleAddToCart={handleAddToCart}>
                        </Product>)
                    }
                </div>

                <div className="order-container">
                    <Cart cart={cart}>
                        <Link to="/reviews">
                            <button className="btn-regular" >Review Your Order</button></Link>
                    </Cart>
                </div>
            </div>
        </div>

    );
};

export default Shop;