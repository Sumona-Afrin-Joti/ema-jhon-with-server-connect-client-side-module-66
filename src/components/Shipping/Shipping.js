import userEvent from '@testing-library/user-event';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import './shipping.css'

const Shipping = () => {
    const { user } = useAuth();
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data =>{ 
        console.log(data);
        const savedCart = getStoredCart();
        data.order = savedCart;

        fetch('http://localhost:5000/orders',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(result=>{
           if(result){
               alert('order processed successfully');
               clearTheCart();
               reset();
           };
        })
    };
    return (
        <div className="shipping-field">
            <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue={user.displayName} {...register("name")} />

                <input placeholder="email" defaultValue={user.email} {...register("email", { required: true })} />

                {errors.email && <span className="error">This field is required</span>}

                <input placeholder="address" defaultValue="" {...register("address", { required: true })} />

                <input placeholder="phone" defaultValue=""  {...register("phone", { required: true })} />

                <input placeholder="current location" defaultValue=""  {...register("currentLocation", { required: true })} />

                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;