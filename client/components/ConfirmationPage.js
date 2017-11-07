import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ConfirmationPage extends Component {
    render(){
        return (
            <div>
                <div>
                    <h1>Thank You - Your Order Has Been Processed</h1>
                </div>
                <div>
                    <h3>Continue shopping and fill up your cart with more jars!</h3>
                    <Link to={'/products'}>
                        <button>Continue Shopping</button>
                    </Link>
                </div>
            </div>
        )
    }
}

