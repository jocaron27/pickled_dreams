import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { fetchProducts } from '../store/products'
import {connect} from 'react-redux'


    class AllProducts extends Component {
        constructor(props) {
            super(props)
        }
        render() {
            const {products} = this.props
            console.log(this.props)
            return (
        <div className="main">
            <div className="product-add">
                <Link to="/new-product"><button className="button-main"><span className="glyphicon glyphicon-plus" />Add Product</button></Link>
            </div>
            <div className="campus-list">
                {products.map(product => {
                    return (
                    <Link to={`/products/${product.id}`} key={product.id} className="list-link">
                        <div className="product">
                            <div className="product-title">{product.title}</div>
                            {/* <div className="modify">
                                <button value={product.id} onClick={removeCampus} className="glyphicon glyphicon-remove" />
                            </div> */}
                            <img src={product.photo} width="200px"/>
                        </div>
                    </Link>
                    )
                })}
            </div>
        </div>
    )
}
}





function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AllProducts)