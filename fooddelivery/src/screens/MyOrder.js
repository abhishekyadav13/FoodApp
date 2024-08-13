
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        const response = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        });
        const data = await response.json();
        setOrderData(data);
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.map((order) => {
                        return (
                            order.order_data && order.order_data.length > 0 ? order.order_data.slice(0).reverse().map((item) => {
                                return (
                                    item.map((arrayData) => {
                                        return (
                                            <div>
                                                {arrayData.Order_date ? (
                                                    <div className='m-auto mt-5'>
                                                        <h5>{arrayData.Order_date}</h5>
                                                        <hr />
                                                    </div>
                                                ) : (
                                                    <div className='col-12 col-md-6 col-lg-3'>
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                            <div className="card-body">
                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>{arrayData.qty}</span>
                                                                    <span className='m-1'>{arrayData.size}</span>
                                                                    <span className='m-1'>{arrayData.Order_date}</span>
                                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                );
                            }) : null
                        );
                    }) : <p>No orders found.</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}



