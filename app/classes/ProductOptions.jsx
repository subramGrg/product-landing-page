import React from "react";
import Modal from "./Modal.jsx";

class ModalStatus extends React.Component {
    constructor(props) {
        super(props);

        this.bool = false;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.state = {
            bool: false,
            status: this.props.status,
        };
    }

    closeModal() {
        this.setState({
            bool: false,
        });
    }

    openModal() {
        this.setState({
            bool: true,
        });
    }

    submitForm(e) {
        e.preventDefault();

        const form = document.forms.edit_product;
        const productId = form.elements
                            .namedItem("product[id]").value;
        const api = `https://online-products-api.herokuapp.com/api/v1/products/${productId}.json`;
        const param = {
            status: form.elements.namedItem("product[status]").value,
        };

        fetch(
            api,
            {
                method: "PUT",
                body: JSON.stringify(param),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            }
        ).then((response) => {
            if(response.status === 200) {
                this.setState({
                    bool: false,
                    status: param.status,
                });
            }
        });
    }

    render() {
        const {
            id,
            item,
        } = this.props;
        const {
            status,
            bool,
        } = this.state;

        return(
            <span className="product-status">

                <Modal
                    bool={bool}
                    closeModal={this.closeModal}
                    name={item.name}
                    status={status}
                    id={item.id}
                    submitForm={this.submitForm}/>

                <a id="change-status"
                    href="#"
                    onClick={this.openModal}>
                    Change Status
                </a> &nbsp;|&nbsp;

                <span className={`product-detail ${status}`}>
                    {status}
                </span>
            </span>
        );
    }
};

export default ModalStatus;
