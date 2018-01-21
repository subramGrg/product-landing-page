import React from "react";
import Orders from "./Orders.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.postForm = this.postForm.bind(this);
        this.orders = null;
        // this.postForm();
    }

    postForm() {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        fetch(
            "http://lvh.me:3000/api/v1/orders.json",
            {
                method: "POST",
                headers,
                body: JSON.stringify({title: "example",}),
                mode: "cors",
            }
        ).then((response) => {
                console.log(response.json());
            }
        );
    }

    render() {
        return(
            <Orders />
        );
    }
}

export default App;
