import React from 'react';
import './ReviewItem.css';
const ReviewItem = (props) => {
    const { name, price, seller, quantity,key} = props.product;
    const {handleRemove}= props;
    return (
        <div className="review-product">
            <h3 className="product-name">{name}</h3>
            <div className="cart-item-container">
                <div className="cart-item-description">
                    <p>Price: {price} </p>
                    <p>Sold by: {seller}</p>
                    <p>Quantity: {quantity} </p>
                    <button className="btn-regular" onClick={()=>handleRemove(key)}>Remove</button>
                </div>
                <div className="shipping-options">
                    <h5>Shipping options</h5>
                    <div>
                        <input type="radio" />
                        <span>
                            <span className="delivery-option">8-10 business days</span><br/>
                            <span className="secondary-text">$0 - Free Shipping</span>
                        </span>
                    </div>


                    <div>
                        <input type="radio" />
                        <span>
                            <span className="delivery-option" >5-7 business days</span><br/>
                            <span className="secondary-text">$3.99 - Regular Shipping</span>
                        </span>
                    </div>
                    <div>
                        <input type="radio" />
                        <span>
                            <span className="delivery-option">2-4 business days</span><br/>
                            <span className="secondary-text">$7.99 - Standard Shipping</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;