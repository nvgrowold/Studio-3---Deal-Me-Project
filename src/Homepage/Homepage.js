import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Background from "../Background/Background";
import Logo from "../Logo/Logo";
//styling
import "./Homepage.css"

function Homepage() {
    return(
        <>
        <Container className="d-flex h-100">
            <Row className="align-self-center w-200">
                <Col xs={12} md={4} className="d-flex justify-content-center">
                    <h3 className="homepageCard shadow">
                        <Link to='/LoginPage/Login'style={{ textDecoration: 'none', color:'#64007D' }}>
                            I'm Selling..
                        </Link>
                    </h3>
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-center">
                    <h3 className="homepageCard shadow">
                    <Link to='/LoginPage/Login' style={{ textDecoration: 'none', color:'#64007D' }}>
                        I'm Buying..
                    </Link>
                    </h3>
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-center">
                    <h3 className="homepageCard shadow">
                        <Link to='/ProductPage/ProductPage'style={{ textDecoration: 'none' , color:'#64007D'}}>
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