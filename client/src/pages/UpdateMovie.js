import { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function UpdateMovie() {
  const { movieId } = useParams();
  const [formValues, setFormValues] = useState({});
  const history = useHistory();

  const onChangeFormField = (event) => {
    const { value, name, type } = event.target;

    setFormValues({
      ...formValues,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const onClickSubmit = async () => {
    try {
      await axios({
        url: `http://localhost:4000/api/movies/${movieId}`,
        method: "PATCH",
        data: formValues,
      });
      history.push("/");
    } catch (e) {
      alert("update Movie Failed!");
    }
  };

  return (
    <Card>
      <Card.Header>
        <h4>UPDATE MOVIE</h4>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control type="text" name="title" onChange={onChangeFormField} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Movie Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            onChange={onChangeFormField}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="poster">
          <Form.Label>Movie Poster</Form.Label>
          <Form.Control
            type="text"
            name="poster"
            onChange={onChangeFormField}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={onClickSubmit}>
          Submit
        </Button>
      </Card.Body>
    </Card>
  );
}
