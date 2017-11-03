import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchProduct from '../store/product';

class SingleProduct extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCurrentProduct();
    }

    render() {
    const { product } = this.props;

    let actualQuantity = product.quantityAvailable || 0;
    let displayedQuantity;
    (actualQuantity < 25) ? displayedQuantity = actualQuantity : displayedQuantity = 25;

    let select = <select className="single-product-quantity" />
    for (let i = 1; i < displayedQuantity; i++){
        select.appendChild(<option value={i}>i</option>)
    }

    if (!actualQuantity) {
        return (
            <div className="single-product">
                <h1>Hello</h1>
                <img src={product.photo} />
                <div className="-single-product-title">{product.title}</div>
                <div className="single-product-description">{product.description}</div>
                <div className="single-product-price">${product.price}</div>
                <div className="single-product-none">Sorry, this product is out of stock.</div>
            </div>
        );
    } else {
        return (
            <div className="single-product">
                <img src={product.photo} />
                <div className="-single-product-title">{product.title}</div>
                <div className="single-product-description">{product.description}</div>
                <div className="single-product-price">${product.price}</div>
                <form>
                {select}
                <input type="submit" className="add-cart-button" value="Add to Cart" />
            </form>
            </div>
        );
    }
}
}

const mapStateToProps = function(state) {
    return {
        product: state.product || {photo: '', title: '', description: '', price: 0.00, quantityAvailable: 0}
    }
};

const mapDispatchToProps = function(dispatch, ownProps) {
    const productId = Number(ownProps.match.params.id)
    return {
        getCurrentProduct: function() {
            dispatch(fetchProduct(productId));
        }
    }
}

//need submit handler

const LoadProduct = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default LoadProduct;

