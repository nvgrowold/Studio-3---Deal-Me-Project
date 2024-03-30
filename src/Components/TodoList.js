import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import TodoDataService from "../services/todoServices"; //../services/todoSrvices"";

function TodoList({ getTodoId }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const data = await TodoDataService.getAllTodo();
    console.log(data.docs);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await TodoDataService.deleteTodo(id);
    getTodos();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getTodos}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Category</th>
            <th>Description</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((doc, index) => {
            return (
              <tr key={doc.id}>
                {/* <td>{index + 1}</td> */}
                <td>{doc.category}</td>
                <td>{doc.description}</td>
                <td>{doc.productid}</td>
                <td>{doc.name}</td>
                <td>{doc.price}</td>
                <td>{doc.region}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getTodoId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TodoList;
