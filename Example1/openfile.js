async function getJsonFromFile(file) {
    try {
      const res = await fetch(file);
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
  
  async function getJson(file) {  
    try {
      return await getJsonFromFile(file);
    } catch (error) {
      console.error("Error:", error);      
      throw error;
    }
  }