export async function fetchMockData() {
    try {
      const response = await fetch("/mockData.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const file = await response.json();
      return file;
    } catch (error) {
      console.error("Error fetching mock data:", error);
      return null;
    }
  }
  