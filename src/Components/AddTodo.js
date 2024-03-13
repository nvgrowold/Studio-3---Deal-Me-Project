import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import TodoDataService from "../services/todoServices"; 

function AddTodo ({ id, setTodoId }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productid, setProductid] =useState("")
  const [region, setRegion ] =useState("")
  const [flag, setFlag] = useState(1);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || category === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newTodo = {
      name,
      category,
      region,
      price,
      description,
      productid,
    };
    console.log(newTodo);

    try {
      if (id !== undefined && id !== "") {
        await TodoDataService.updateTodo(id, newTodo);
        setTodoId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await TodoDataService.addTodo(newTodo);
        setMessage({ error: false, msg: "New Todo added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setCategory("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await TodoDataService.getTodo(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setCategory(docSnap.data().category);
      setPrice(docSnap.data().price);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTodoName">
            <InputGroup>
              <InputGroup.Text id="formTodoName">N</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTodoCategory">
            <InputGroup>
              <InputGroup.Text id="formTodoCategory">C</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTodoRegion">
            <InputGroup>
              <InputGroup.Text id="formTodoRegion">R</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTodoPrice">
            <InputGroup>
              <InputGroup.Text id="formTodoPrice">P</InputGroup.Text>
              <Form.Control
                type= "number"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTodoDescription">
            <InputGroup>
              <InputGroup.Text id="formTodoDescription">D</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTodoProductid">
            <InputGroup>
              <InputGroup.Text id="formTodoProductid">ID</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="productid"
                value={productid}
                onChange={(e) => setProductid(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

             <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              List/Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddTodo;
