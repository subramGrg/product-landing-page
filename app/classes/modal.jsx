import React from "react";
import Modal from "react-modal";
import style from "../styles/Modal.scss";

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

    componentWillMount() {
        Modal.setAppElement("body");
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
        const formData = new FormData(form);
        const productId = formData.get("product[id]");
        const api = `http://lvh.me:3000/api/v1/products/${productId}.json`;
        const param = {
            status: formData.get("product[status]"),
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
        const { status, } = this.state;

        return(
            <span className="product-status">

                <Modal
                    isOpen={this.state.bool}
                    className="product-modal">

                    <div className="modal-wrapper">
                        <button onClick={this.closeModal}>
                            X
                        </button>

                        <div className='modal-status'>
                            Status:
                            <span
                                className={`indicator ${status}`}>
                            </span>
                        </div>

                        <label>
                            Product: {item.name}
                        </label>

                        <form
                            id="edit_product"
                            action=""
                            onSubmit={this.submitForm}>

                            <input
                                name="_method"
                                type="hidden"
                                value="put" />

                            <input
                                name="product[id]"
                                type="hidden"
                                value={item.id} />

                            <fieldset>
                                <p>Status:</p>
                                <label>
                                    Printed:
                                    <input type="radio"
                                        name="product[status]"
                                        value="printed" />
                                </label>

                                <label>
                                    Approved:
                                    <input type="radio"
                                        name="product[status]"
                                        value="approved" />
                                </label>
                            </fieldset>

                            <input type="submit" value="submit" />
                        </form>
                    </div>
                </Modal>

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
