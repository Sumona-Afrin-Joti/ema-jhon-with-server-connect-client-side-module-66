import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth'

const Orders = () => {

    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else if (res.status === 401) {
                    history.push('/login')
                }
            })
            .then(data => setOrders(data))
    }, []);
    console.log('orders',orders)
    return (
        <div>

            {
                orders.map(order =>
                    <div key={order._id} >
                        <h5>Total Order : {orders.length} </h5>
                        <h2>User Email: {order.email} </h2>


                    </div>
                )
            }
        </div>
    );
};

export default Orders;