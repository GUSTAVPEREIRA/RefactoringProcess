async function getJsonFromFile(file) {
    try {
      const res = await fetch(file);
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async function getJson(file) {  
    try {
      const result = await getJsonFromFile(file);
      
      return result;
    } catch (error) {
      console.error("Error:", error);      
      throw error;
    }
  }