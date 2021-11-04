import { useState, useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios(
        `http://localhost:4000/api/movies?searchText=${searchText}`
      );
      setLoading(false);
      setMovies(response.data);
      setError(null);
    } catch (e) {
      setLoading(false);
      setError(`Server Error: ${e.message} ${e.stack}`);
    }
  };

  const onClickViewMovie = ({ id }) => {
    console.log("clicked");
    history.push(`/${id}`);
  };

  const onClickUpdate = ({ id }) => {
    history.push(`/update/${id}`);
  };

  const onClickDelete = async ({ id }) => {
    try {
      setLoading(true);
      const response = await axios(
        `http://localhost:4000/api/movies/delete/${id}`
      );
      setLoading(false);
      setMovies(response.data);
      setError(null);
    } catch (e) {
      setLoading(false);
      setError(`Server Error: ${e.message} ${e.stack}`);
    }
  };

  return (
    <>
      <SearchBar onClickRefresh={fetchMovies} setSearchText={setSearchText} />
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-wrap justify-content-start">
          {movies.map((movie) => {
            const { title, id } = movie;

            return (
              <Card key={id} className="m-3 movie-card">
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => onClickViewMovie(movie)}
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => onClickUpdate(movie)}
                    className="mx-2"
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    className="mx-2"
                    onClick={() => onClickDelete(movie)}
                    variant="danger"
                  >
                    delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Home;
