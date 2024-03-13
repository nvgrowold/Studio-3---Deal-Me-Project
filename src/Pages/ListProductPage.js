import { useState } from "react";
import Header from "../Components/Header";
import TodoList from '../Components/TodoList';
import AddTodo from '../Components/AddTodo';
import { Container, Navbar, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function ListProductPage(){
    const [todoId, setTodoId] = useState("");

  const getTodoIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setTodoId(id);
  };
    return(
        
        <div>
            <Header/> 
            <h1>List a product</h1>
            
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
