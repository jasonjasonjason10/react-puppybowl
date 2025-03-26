// import { useState, useEffect } from "react";
// import { fetchAllPlayers, deletePlayer } from "../API/index";
// import { Box, Button, Snackbar, Alert, Typography } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import "./AllPlayers.css";

// const AllPlayers = () => {
//   const [players, setPlayers] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedPlayerId, setExpandedPlayerId] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const toggleDetails = (id) => {
//     setExpandedPlayerId((prevId) => (prevId === id ? null : id));
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this puppy?");
//     if (!confirm) return;

//     try {
//       const result = await deletePlayer(id);
//       if (result.success) {
//         setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
//         setSnackbarOpen(true);
//       } else {
//         alert("Failed to delete player.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred while trying to delete the player.");
//     }
//   };

//   useEffect(() => {
//     async function getAllPlayers() {
//       try {
//         const APIResponse = await fetchAllPlayers();
//         console.log("Players from API:", APIResponse.data.players);

//         APIResponse?.data?.players ? setPlayers(APIResponse.data.players) : setError("No players found or malformed data");
//       } catch (err) {
//         setError("Failed to fetch players.");
//         console.error(err);
//       }
//     }
//     getAllPlayers();
//   }, []);

//   const playersToDisplay = players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="page-container">
//       <h2>All Players</h2>

//       <label className="search-label">
//         Search:
//         <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name..." />
//       </label>

//       {error && <p className="error">{error}</p>}

//       <Box className="scroll-box">
//         <div className="players-list">
//           {playersToDisplay.length === 0 ? (
//             <Typography
//               variant="body1"
//               sx={{
//                 textAlign: "center",
//                 fontStyle: "italic",
//                 color: "#be7a2c",
//                 padding: "1rem",
//               }}
//             >
//               Yo Dog! Aint no puppies with this name. Try another name dog!
//             </Typography>
//           ) : (
//             playersToDisplay.map((player) => (
//               <div key={player.id} className="player-card-vertical">
//                 <div className="card-header">
//                   <h3>{player.name}</h3>
//                   <Button variant="outlined" onClick={() => toggleDetails(player.id)}>
//                     {expandedPlayerId === player.id ? "Hide This pup" : "See Puppy"}
//                   </Button>
//                 </div>

//                 <AnimatePresence>
//                   {expandedPlayerId === player.id && (
//                     <motion.div
//                       className="details-dropdown"
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <img src={player.imageUrl || "https://via.placeholder.com/200"} alt={player.name} width="200" style={{ marginTop: "1rem", borderRadius: "8px" }} />
//                       <p>
//                         <strong>Breed:</strong> {player.breed}
//                       </p>
//                       <p>
//                         <strong>Status:</strong> {player.status}
//                       </p>
//                       <p>
//                         <strong>Team:</strong> {player.team?.name || "No team"}
//                       </p>
//                       <Button variant="outlined" color="error" onClick={() => handleDelete(player.id)} sx={{ marginTop: "1rem" }}>
//                         Delete Puppy
//                       </Button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))
//           )}
//         </div>
//       </Box>

//       <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
//           Puppy deleted successfully!
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default AllPlayers;

import { useState, useEffect } from "react";
import { fetchAllPlayers, deletePlayer } from "../API/index";
import { Box, Button, Snackbar, Alert, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import barkSound from "../assets/sounds/bark.mp3"; 
import "./AllPlayers.css";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPlayerId, setExpandedPlayerId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const toggleDetails = (id) => {
    setExpandedPlayerId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this puppy?");
    if (!confirm) return;

    try {
      const result = await deletePlayer(id);
      if (result.success) {
        new Audio(barkSound).play(); 
        setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
        setSnackbarOpen(true);
      } else {
        alert("Failed to delete player.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while trying to delete the player.");
    }
  };

  useEffect(() => {
    async function getAllPlayers() {
      try {
        const APIResponse = await fetchAllPlayers();
        APIResponse?.data?.players ? setPlayers(APIResponse.data.players) : setError("No players found or malformed data");
      } catch (err) {
        setError("Failed to fetch players.");
        console.error(err);
      }
    }
    getAllPlayers();
  }, []);

  const playersToDisplay = players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="page-container">
      <h2>All Players</h2>

      <label className="search-label">
        Search:
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name..." />
      </label>

      {error && <p className="error">{error}</p>}

      <Box className="scroll-box">
        <div className="players-list">
          {playersToDisplay.length === 0 ? (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                fontStyle: "italic",
                color: "#be7a2c",
                padding: "1rem",
              }}
            >
              No puppies found with that name. Try something else!
            </Typography>
          ) : (
            playersToDisplay.map((player) => (
              <div key={player.id} className="player-card-vertical">
                <div className="card-header">
                  <h3>{player.name}</h3>
                  <Button variant="outlined" onClick={() => toggleDetails(player.id)}>
                    {expandedPlayerId === player.id ? "Hide Details" : "See Puppy"}
                  </Button>
                </div>

                <AnimatePresence>
                  {expandedPlayerId === player.id && (
                    <motion.div
                      className="details-dropdown"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={player.imageUrl || "https://via.placeholder.com/200"} alt={player.name} width="200" style={{ marginTop: "1rem", borderRadius: "8px" }} />
                      <p>
                        <strong>Breed:</strong> {player.breed}
                      </p>
                      <p>
                        <strong>Status:</strong> {player.status}
                      </p>
                      <p>
                        <strong>Team:</strong> {player.team?.name || "No team"}
                      </p>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(player.id)} sx={{ marginTop: "1rem" }}>
                        Delete Puppy
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Puppy deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AllPlayers;
