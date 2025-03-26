const COHORT = "2502-FTB-WEB-FT";
const baseUrl = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}`;

export async function fetchAllPlayers() {
  try {
    const response = await fetch(`${baseUrl}/players`);
    return await response.json();
  } catch (error) {
    console.log("Fetch players error:", error);
    return { success: false, error };
  }
}

export async function fetchSinglePlayer(id) {
  try {
    const response = await fetch(`${baseUrl}/players/${id}`);
    return await response.json();
  } catch (error) {
    console.log("This dawg aint got fetched:", error);
    return { success: false, error };
  }
}

export async function createNewPlayer(player) {
  try {
    const response = await fetch(`${baseUrl}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });

    return await response.json();
  } catch (error) {
    console.log("Create player error:", error);
    return { success: false, error };
  }
}

export async function deletePlayer(id) {
  try {
    const response = await fetch(`${baseUrl}/players/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Delete player error dog:");
    return { success: false, error };
  }
}
