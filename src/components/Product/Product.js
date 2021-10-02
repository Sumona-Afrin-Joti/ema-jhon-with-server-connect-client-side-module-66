import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';
const Product = (props) => {

    const { img, price, seller, name, stock, star } = props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>

            <div>
                <h3 className="product-name" >{name}</h3>
                <p>By:{seller} </p>
                <h4>{price}</h4>
                <p><small>Only {stock} left in stock - order soon. </small></p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star icon-color"
                    readonly ></Rating> <br />
                <button onClick={() => props.handleAddToCart(props.product)} className="btn-regular" ><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;