import { useState } from "react";
import HeaderAfterLogin from '../Components/HeaderAfterLogin'; 
import TodoList from '../Components/TodoList';
import AddTodo from '../Components/AddTodo';
//import "../Styling/listing.css";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import TodoDataService	 from '../services/todoServices';

function ListProductPage(){
    const [todoId, setTodoId] = useState("");

  const getTodoIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setTodoId(id);
  };
    return(
        
        <div>
            <HeaderAfterLogin/>
            <h1>List a product</h1>
            {/* <AddTodo/>
            <TodoList/> */}
            {/* <TodoDataService/> */}
            <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddTodo id={todoId} setTodoId={setTodoId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <TodoList getTodoId={getTodoIdHandler} />
          </Col>
        </Row>
      </Container>
      
        </div>

    )
}

export default ListProductPage;
