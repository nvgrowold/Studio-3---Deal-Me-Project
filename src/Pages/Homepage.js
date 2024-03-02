import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Background from "../Components/Background";
import Logo from "../Components/Logo";
//styling
import "../Styling/Homepage.css"

function Homepage() {
    return(
        <>
        <div className='h-20 w-40 border-0 shadow-lg justify-items-center ali'>
            <Link to='/AdminDashboard' style={{ textDecoration: 'none', color:'#64007D' }}>
                <h5>Admin</h5>
            </Link>
        </div>
        <Container className="d-flex h-100">
            <Row className="align-self-center w-200">
                <Col xs={12} md={4} className="d-flex justify-content-center">
                    <h3 className="homepageCard shadow">
                        <Link to='/Login'style={{ textDecoration: 'none', color:'#64007D' }}>
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
                        <Link to='/GuestPage'style={{ textDecoration: 'none' , color:'#64007D'}}>
                            Have a peek..
                        </Link>
                    </h3>
                </Col>
            </Row>
        </Container>
        <Background/>
        <Logo/>

        </> 
    )

}

export default Homepage;