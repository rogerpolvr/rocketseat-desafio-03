import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // Faz um post para Adicionar um novo item
    const response = await api.post("repositories", {
      title: "Desafio react 03",
      url: "http://github.com/...",
      techs: ["Node.js", "React"]
    });
    // Inclui o novo item no array existente
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }
  

  return (
    <div>
      <div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      <ul data-testid="repository-list">
      {repositories.map((repository) => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
