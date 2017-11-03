import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios'


function AllProducts(props) {
    const { products } = props;
    return (
        <div className="main">
            <div className="product-add">
                <Link to="/new-product"><button className="button-main"><span className="glyphicon glyphicon-plus" />Add Product</button></Link>
            </div>
            <h1>HELLO</h1>
            <div className="campus-list">
                {products.map(product => {
                    return (
                    <Link to={`/products/${product.id}`} key={product.id} className="list-link">
                        <div className="product">
                            <div className="product-title">{product.name}</div>
                            {/* <div className="modify">
                                <button value={product.id} onClick={removeCampus} className="glyphicon glyphicon-remove" />
                            </div> */}
                            <img src={producy.imageUrl} />
                        </div>
                    </Link>
                    )
                })}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        products: state.allProducts
    }
}

export default AllProducts;