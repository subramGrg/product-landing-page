import React from "react";
import Modal from "react-modal";
import style from "../styles/Modal.scss";

class ModalForm extends React.Component {

    componentWillMount() {
        Modal.setAppElement("body");
    }

    render() {
        const {
            bool,
            closeModal,
            name,
            id,
            submitForm,
            status,
        } = this.props;

        return (
            <Modal
                isOpen={bool}
                className="product-modal"
                overlayClassName= "modal-overlay" >

                <div className="modal-wrapper">
                    <button onClick={closeModal}>
                        X
                    </button>

                    <label>
                        Product: {name}
                    </label>

                    <div className='modal-status'>
                        Status:
                        <span
                            className={`indicator ${status}`}>
                        </span>
                    </div>

                    <form
                        id="edit_product"
                        action=""
                        onSubmit={submitForm}>

                        <input
                            name="_method"
                            type="hidden"
                            value="put" />

                        <input
                            name="product[id]"
                            type="hidden"
                            value={id} />

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
        );
    }
};

export default ModalForm;
