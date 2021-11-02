import './Cart.css';
import React from 'react';


const Cart = (props) => {
    const { cart } = props;

    let totalQuantity = 0;
    let total = 0;
    for (const product of cart) {
        const productQuantity = !product.quantity ? 1 : product.quantity;
        totalQuantity = totalQuantity + productQuantity;
        total = total + (product.price * productQuantity);
    }
    // const totalReducer = (previous,current) => previous + current.price;
    // const total = cart.reduce(totalReducer,0);

    const Shipping = 15;
    const tax = (total + Shipping) * 0.1;
    const GrandTotal = total + Shipping + tax;

    return (
        <div>
            <div style={{ textAlign: 'center' }} >
                <h2>Order cart</h2>
                <h3>Ordered Item: {totalQuantity} </h3>
            </div>
            <div className="table-container">
                <table>
                    <tr>
                        <td>Items: </td>
                        <td>{totalQuantity} </td>
                    </tr>
                    <tr>
                        <td>Shipping & Handling</td>
                        <td> $<span>{Shipping}</span> </td>
                    </tr>
                    <tr>
                        <td> tax</td>
                        <td>$<span>{tax.toFixed(2)}</span></td>
                    </tr>
                    <tr>
                        <td>Total before tax</td>
                        <td>$<span> {total.toFixed(2)}</span> </td>
                    </tr>
                    <tr className="grand-total">
                        <td>Grand Total</td>
                        <td>$<span>{GrandTotal.toFixed(2)}</span> </td>
                    </tr>
                </table>
            </div>

            <div className="review-button-div">
                 {props.children}
            </div>
           


        </div>
    );
};

export default Cart;