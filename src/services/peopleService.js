// This service handles loading people data from JSON
import peopleData from "@/assets/data/people.json";

export const peopleService = {
  // Get all people
  async getPeopleList() {
    try {
      // In a real application, this would likely be an API call
      // For this demo, we're loading directly from the imported JSON
      return peopleData;
    } catch (error) {
      console.error("Error loading people data:", error);
      return [];
    }
  },

  // Get a specific person by ID
  async getPersonById(personId) {
    try {
      const person = peopleData.find((p) => p.id === personId);
      if (!person) {
        throw new Error(`Person with ID ${personId} not found`);
      }
      return person;
    } catch (error) {
      console.error(`Error getting person with ID ${personId}:`, error);
      throw error;
    }
  },
};
