import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom'; 
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Container, Row, Col } from 'react-bootstrap';
import Background from "../Components/Background";
import Logo from "../Components/Logo";
import "../Styling/Homepage.css";

function Homepage() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const updatedCart = [...cartItems, item];
        setCartItems(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return(
        <>
            <div className='absolute right-6 mr-6 pt-4 transition-shadow duration-150 ease-in-out' title='Admin Login'>
                <Link to='/AdminDashboard'>
                    <MdOutlineAdminPanelSettings className='text-4xl'/>
                </Link>
            </div>
            <Container className="d-flex h-100">
                <Row className="align-self-center w-200 rounded-lg">
                    <Col xs={12} md={4} className="d-flex justify-content-center">
                        <h3 className="homepageCard shadow">
                            <Link to='/Login' style={{ textDecoration: 'none', color:'#64007D' }}>
                                I'm Selling..
                            </Link>
                        </h3>
                    </Col>
                    <Col xs={12} md={4} className="d-flex justify-content-center">
                        <h3 className="homepageCard shadow">
                            <Link to='/Login' style={{ textDecoration: 'none', color:'#64007D' }}>
                                I'm Buying..
                            </Link>
                        </h3>
                    </Col>
                    <Col xs={12} md={4} className="d-flex justify-content-center">
                        <h3 className="homepageCard shadow">
                            <Link to='/GuestPage' style={{ textDecoration: 'none' , color:'#64007D'}}>
                                Have a peek..
                            </Link>
                        </h3>
                    </Col>
                    {/* <Col xs={12} md={4} className="d-flex justify-content-center">
                        <h3 className="homepageCard shadow">
                            <Link to='/Cart' style={{ textDecoration: 'none' , color:'#64007D'}} onClick={() => addToCart({ name: 'Product', category: 'Category', region: 'Region', price: 10, description: 'Description' })}>
                                View Cart
                            </Link>
                        </h3>
                    </Col> */}
                </Row>
            </Container>
            <Background/>
            <Logo/>
        </>
    );
}

export default Homepage;
