// export async function fetchTickets() {
//   const response = await fetch(
//     "https://api.quicksell.co/v1/internal/frontend-assignment"
//   );
//   const data = await response.json();
//   return data;
// }

export async function fetchTickets() {
  try {
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}
