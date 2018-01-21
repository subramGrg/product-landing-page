import React from "react";
import ModalStatus from "./modal.jsx";
import style from "../styles/OrderItem.scss";

const item = (props) => {
    const awsLink = "https://s3-ap-southeast-2.amazonaws.com/orders-southeast/";
    const {
        status,
        products,
        agency,
        orderNumber,
    } = props;


    const productList = products.map((item) => {
        let image;

        if(item.image !== null) {
            const src = awsLink + item.image.name;
            image = <span className="product-artwork">
                <a href={src} download >
                    Download artwork
                </a> | &nbsp;
            </span>
            ;
        }

        return(
            <li className="product" key={item.id}>
                <div className='options-wrapper'>
                    <span className='product-name'>
                        {item.name}
                    </span>

                    <div className='options'>
                        {image}

                        <ModalStatus status={item.status}
                            item={item}/>
                    </div>
                </div>
            </li>
        );
    });

    let addressLine;
    if(agency.address) {
        addressLine = agency.address;
    }
    if (agency.suburb) {
        addressLine += `, ${agency.suburb}`;
    }

    return(
        <div key={agency.title} className="orders-wrapper">
            <h2>
                {agency.title} - {addressLine}
            </h2>
            <ul className="order-list">
                {productList}
            </ul>
        </div>
    );
};

export default item;
