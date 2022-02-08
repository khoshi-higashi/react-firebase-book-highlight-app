import "./App.css";
import React, { useState } from "react";
import { Input, FormControl, InputLabel, Button } from "@mui/material";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([
    "Take dogs for a walk",
    "Take the rubbish out",
  ]);
  const [input, setInput] = useState("");
  const [titles, setTitles] = useState([]);
  const [author, setAuthor] = useState([]);
  const [body, setBody] = useState([]);

  // console.log("🔫", input);

  const addTodo = (event) => {
    event.preventDefault(); // will stop the REFRESH
    console.log("👽", "I'm working");
    setTodos([...todos, input]);
    setInput(""); // clear up the input after clicking add todo button
    console.log(todos);
  };

  const addTitle = (event) => {
    event.preventDefault(); // will stop the REFRESH
    console.log("👽", "I'm working");
    setTitles([...titles, input]);
    setInput(""); // clear up the input after clicking add todo button
    console.log(titles);
  };

  const addAuthor = (event) => {
    event.preventDefault(); // will stop the REFRESH
    console.log("👽", "I'm working");
    setAuthor([...author, input]);
    setInput(""); // clear up the input after clicking add todo button
    console.log(author);
  };

  const addBody = (event) => {
    event.preventDefault(); // will stop the REFRESH
    console.log("👽", "I'm working");
    setBody([...body, input]);
    setInput(""); // clear up the input after clicking add todo button
    console.log(body);
  };

  return (
    <div className="App">
      <h1>Hello Clever Programmers 🚀!</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add ToDo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo text={todo} />
        ))}
      </ul>

      <h1>Book highlight submission site 📚</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a Title</InputLabel>
          <Input
            value={titles}
            onChange={(event) => setTitles(event.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTitle}
          disabled={!titles}
        >
          Add Title
        </Button>
        <ul>
          {titles.map((title) => (
            <li>{title}</li>
          ))}
        </ul>

        <FormControl>
          <InputLabel>✅ Write a Author</InputLabel>
          <Input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={addAuthor}
          disabled={!author}
        >
          Add Author
        </Button>

        <FormControl>
          <InputLabel>✅ Write a Body</InputLabel>
          <Input
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={addBody}
          disabled={!body}
        >
          Add Body
        </Button>
      </form>
    </div>
  );
}

export default App;
