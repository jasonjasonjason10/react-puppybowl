import { Routes, Route, Link } from "react-router-dom";
import AllPlayers from "./components/AllPlayers";
import NewPlayerForm from "./components/NewPlayerForm";
import NavBar from "./components/NavBar";
import { Button } from "@mui/material";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <h1>PUPPY BOWL!!!</h1>

      <Link to="/new" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Add New Puppy
        </Button>
      </Link>

      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path="/new" element={<NewPlayerForm />} />
      </Routes>
    </div>
  );
}

export default App;
