import React from "react";
import OrderItem from "./OrderItem.jsx";

class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.api = "https://online-products-api.herokuapp.com/api/v1/orders.json";
        this.getOrders = this.getOrders.bind(this);
        this.state = { orders: [], mounted: false, };

        this.changeStatus = this.changeStatus.bind(this);
    }

    async getOrders() {
        // await response of fetch call
        const response = await fetch(this.api);
        // only proceed once promise is resolved
        const data = await response.json();
        this.setState({ orders: data, }); // then, call render()
    }

    changeStatus() {

    }

    componentDidMount() {
        this.getOrders();
    }

    render() {
        let items = "";
        if(this.state.orders.length > 0) {
            items = this.state.orders.map(
                item => <OrderItem key={item.order_number}
                                agency={item.agency}
                                orderNumber={item.order_number}
                                products={item.products}
                                status={this.changeStatus} />
            );
        } else {
            items = <div className="loading">
                        Loading
                        <span className="loader"></span>
                    </div>;
        }

        return(
            <div>
                <div className="header-wrapper">
                    <h1 className="main-heading container">Orders</h1>
                </div>
                <div className="container">
                    {items}
                </div>
            </div>
        );
    }
}

export default Orders;
