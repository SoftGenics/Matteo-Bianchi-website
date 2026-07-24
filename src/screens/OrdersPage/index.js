import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { SERVER_API_URL } from '../../server/server';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Noproduct from '../../Assets/images/NoProduct.jpg'
import Header from "../../components/Header";
import "./index.css";

const OrdersPage = () => {
    const [mobile_num, setMobile_num] = useState("");
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwtDecode(token);
            const mobile = decodedToken.mobile_num;

            setMobile_num(mobile);
            fetchProducts(mobile); // ✅ direct value pass karo
        }
    }, []);


    const fetchProducts = async (mobile) => {
        try {
            const response = await axios.post(`${SERVER_API_URL}/api/cashfree/all/UserOder`,
                {
                    mobile_number: mobile
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Fetched products:", response.data);

            setOrders(response.data);

        } catch (error) {
            console.error(error);
        }
    };


    // Filter orders based on search (id, title, price)
    const filteredOrders = orders.filter((order) => {
        const searchLower = search.toLowerCase();

        return (
            String(order.product_id).includes(searchLower) ||
            (order.product_title || "").toLowerCase().includes(searchLower) ||
            String(order.selected_Lens_Or_ProductPrice || "").includes(searchLower)
        );
    });



    return (
        <>
            <Header />

            {mobile_num ? (
                <div className="orders">
                    <main className="orders__list">

                        {/* search oders*/}
                        <div className="orders__search">
                            <input
                                type="text"
                                className="orders__search-input"
                                placeholder="Search your orders here"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="orders__search-btn">Search Orders</button>
                        </div>

                        <ul className="orders-table-header">
                            <li className="orders-col orders-col-img">Product Image</li>
                            <li className="orders-col orders-col-title">Product Title</li>
                            <li className="orders-col orders-col-quantity">Quantity</li>
                            <li className="orders-col orders-col-price">Price</li>
                            <li className="orders-col orders-col-status">Status</li>
                        </ul>

                        {filteredOrders.map((order, index) => {

                            return (
                                <Link className="navigate-traking" to={`/tracking-status/${order.id}`}>
                                    <div key={index} className="order-card">
                                        {order.product_image ? (
                                            <img
                                                src={`${SERVER_API_URL}/${order.product_image}`}
                                                alt={order.product_title}
                                                className="order-card__img"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                        <div className="order-card__details">
                                            <h4 className="order-card__title">{order.product_title}</h4>
                                            <p className="order-card__quantity"><span className="qty">Qty: </span>{order.product_quantity ? order.product_quantity : "1"}</p>
                                            <p className="order-card__price">
                                                ₹{order.selected_Lens_Or_ProductPrice}
                                            </p>

                                            <div>
                                                {order.delivery_status === "pending" ? (
                                                    <>
                                                        <span className="order-card__status order-card__status--red">
                                                            ● Processing
                                                        </span>
                                                        <p className="order-card__message">
                                                            Your item has been shipped.
                                                        </p>
                                                    </>
                                                ) : order.delivery_status === "Delivered" ? (
                                                    <>
                                                        <span className="order-card__status order-card__status--green">
                                                            ● Delivered
                                                        </span>
                                                        <p className="order-card__message">
                                                            Item delivered on{" "}
                                                            {new Date(
                                                                new Date(order.updatedAt).setDate(
                                                                    new Date(order.updatedAt).getDate() + 7
                                                                )
                                                            ).toLocaleDateString()}
                                                        </p>

                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="order-card__status order-card__status--orange">
                                                            ● {order.delivery_status === "rto" ? "Undelivered" : order.delivery_status}
                                                        </span>

                                                        <p className="order-card__message">
                                                            Item is on {order.delivery_status}.

                                                        </p>
                                                    </>

                                                )}
                                                <span className="order-date"  >
                                                    {new Date(order.createdAt).toLocaleString()}
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </main>
                </div>
            ) : (
                <img src={Noproduct} />
            )}

        </>
    );
};

export default OrdersPage;
