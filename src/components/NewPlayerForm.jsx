import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPlayer } from "../API/index";
import { TextField, Button, Snackbar, Alert, Box } from "@mui/material";
import confetti from "canvas-confetti";
import "../index.css";

const NewPlayerForm = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const whiteOutlinedStyles = {
    "& .MuiOutlinedInput-root": {
      fontFamily: "OpenDyslexic, sans-serif", // ✅ add this
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#90caf9",
      },
    },
    input: {
      color: "white",
      fontFamily: "OpenDyslexic, sans-serif",
    },
    label: {
      color: "#ccc",
      fontFamily: "OpenDyslexic, sans-serif",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPlayer = {
        name,
        breed,
        imageUrl,
      };

      const response = await createNewPlayer(newPlayer);

      if (response?.success) {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { x: 0.5, y: 0.4 },
          colors: ["#ffc107", "#ff4081", "#00e676", "#2979ff"],
          angle: 70,
        });

        setSuccess(true);
        setName("");
        setBreed("");
        setImageUrl("");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Failed to create player.");
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: "#101c30",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Add a New Puppy</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "#fff" } }}
          sx={whiteOutlinedStyles}
        />
        <TextField
          label="Breed"
          variant="outlined"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "#fff" } }}
          sx={whiteOutlinedStyles}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "#fff" } }}
          sx={whiteOutlinedStyles}
        />

        <Button type="submit" variant="contained" color="primary">
          Add Puppy
        </Button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Puppy added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewPlayerForm;
