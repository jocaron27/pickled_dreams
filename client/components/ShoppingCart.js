import React, { Component } from 'react';

import {connect} from 'react-redux'

export function ShoppingCart (props){

    // NEED FROM STORE: 
            // 1) ARRAY OF ITEMS THAT ARE IN USER'S CART
            // 2) INDIVIDUAL ITEM'S TITLE
            // 3) INDIVIDUAL ITEM'S QUANTITY THAT'S INSIDE ShoppingCart
            // 4) TOTAL PRICE OF ALL ITEMS COMBINED IN CART COMES FROM ORDERS.TOTAL


    return (
        <div>
            <h1>Shopping Cart</h1>

            <div id="shoppingcart-all-items">
                <h3>All Items In Cart:</h3>    
                <ul>
                {/****** MAP OVER EACH ITEM IN CART *******/}
                    { orderListOfItems.map(item => {
                            return (
                                <li className="shoppingcart-single-item">
                                    <a href="#">
                                        <img className="media-object" src={ item.photo }/>
                                    </a>
                                    <h3>{ item.title }</h3>
                                    <p>Qty: { item.quantity }</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div>
                <h3>Subtotal: $ {orderListOfItems.totalPrice}</h3>
                <button onClick={move.to.shoppingcart.page}>Proceed to Checkout</button>
            </div>
        </div>
    )
}

