import "./App.css";
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    "Take dogs for a walk",
    "Take the rubbish out",
  ]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  console.log("🔫", input);

  const addTodo = (event) => {
    console.log("👽", "I'm working");
    setTodos([...todos, input]);
  };

  const addTitle = (event) => {
    console.log("👽", "I'm working");
    setTodos([...todos, input]);
  };

  const addAuthor = (event) => {
    console.log("👽", "I'm working");
    setTodos([...todos, input]);
  };

  const addBody = (event) => {
    console.log("👽", "I'm working");
    setTodos([...todos, input]);
  };

  return (
    <div className="App">
      <h1>Hello Clever Programmers 🚀!</h1>
      <input onChange={(event) => setInput(event.target.value)} value={input} />
      <button onClick={addTodo}>Add ToDo</button>
      <ul>
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>

      <h1>Book highlight submission site 📚</h1>
      <input value={title} onChange={(event) => setTitle(event.target.value)} />
      <button onClick={addTitle}>Add Title</button>
      <input
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <button onClick={addAuthor}>Add Author</button>
      <input value={body} onChange={(event) => setBody(event.target.value)} />
      <button onClick={addBody}>Add Body</button>
    </div>
  );
}

export default App;
