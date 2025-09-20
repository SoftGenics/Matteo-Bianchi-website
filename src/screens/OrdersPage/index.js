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
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const mobile_num = decodedToken.mobile_num;
            setMobile_num(mobile_num);

            fetchProducts(); // products can be fetched right away
        }
    }, []);

    useEffect(() => {
        if (mobile_num && mobile_num.trim() !== "") {
            fetchOrders();
        }
    }, [mobile_num]); // will run when mobile_num changes

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            const res = await axios.post(
                `${SERVER_API_URL}/api/cashfree/orders/number`,
                { mobile_number: mobile_num },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("res.data.data", res.data.data)
            setOrders(res.data.data || []);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/product`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.result);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Get product image + title
    const getProductDetails = (productId) => {
        const product = products.find(
            (product) => String(product.product_id) === String(productId)
        );
        if (product) {
            return {
                id: product.product_id,
                image: product.product_thumnail_img ? `${SERVER_API_URL}/${product.product_thumnail_img}` : null,
                title: product.product_title || "Product Name"
            };
        }
        return { image: null, title: "Product Name" };
    };

    // Filter orders based on search (id, title, price)
    const filteredOrders = orders.filter((order) => {
        const searchLower = search.toLowerCase();
        const productDetails = getProductDetails(order.product_id);

        return (
            productDetails.id?.toString().includes(searchLower) ||
            productDetails.title.toLowerCase().includes(searchLower) ||
            (order.selected_Lens_Or_ProductPrice &&
                order.selected_Lens_Or_ProductPrice.toString().includes(searchLower))
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
                            const { image, title } = getProductDetails(order.product_id);

                            return (
                                <Link className="navigate-traking" to={`/tracking-status/${order.id}`}>
                                    <div key={index} className="order-card">
                                        {image ? (
                                            <img src={image} alt={title} className="order-card__img" />
                                        ) : (
                                            'No Image'
                                        )}

                                        <div className="order-card__details">
                                            <h4 className="order-card__title">{title}</h4>
                                            <p className="order-card__quantity"><span className="qty">Qty: </span>{order.product_quantity ? order.product_quantity : "1"}</p>
                                            <p className="order-card__price">
                                                ₹{order.selected_Lens_Or_ProductPrice}
                                            </p>

                                            <div>
                                                {order.delivery_status === "Processing" ? (
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
                                                    <span className="order-card__status order-card__status--orange">
                                                        ● {order.delivery_status}
                                                    </span>
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
