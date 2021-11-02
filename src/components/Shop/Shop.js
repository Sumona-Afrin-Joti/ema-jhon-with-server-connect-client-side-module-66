import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [searchedProducts, SetSearchedProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const size = 10;


    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                SetSearchedProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);

            })
    }, [page]);

    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = []
        if (exists) {
            exists.quantity = exists.quantity + 1;
            const rest = cart.filter(pd => pd.key !== product.key);
            newCart = [...rest, exists];

        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDb(product.key)
    }

    const handleSearchedProduct = (event) => {
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

                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()].map(number => <button
                                key={number}
                                onClick={() => setPage(number)}
                                className={number===page ? 'selected' : ''}
                            >{number+1}</button>)
                        }
                    </div>

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