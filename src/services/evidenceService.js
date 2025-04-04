// This service handles loading research papers and their content
export const evidenceService = {
  // Get list of all available papers
  async getPapersList() {
    // In a real application, this would come from an API
    return [
      {
        id: 'ai-clinical-decision',
        title: 'AI in Clinical Decision Support: A Systematic Review',
        authors: 'Smith, J., Johnson, M., & Williams, R.',
        year: '2023'
      },
      {
        id: 'machine-learning-healthcare',
        title: 'Machine Learning Applications in Healthcare: Current Status and Future Prospects',
        authors: 'Brown, A., Davis, K., & Wilson, P.',
        year: '2023'
      },
      {
        id: 'deep-learning-medical-imaging',
        title: 'Deep Learning in Medical Imaging: A Comprehensive Survey',
        authors: 'Lee, S., Chen, X., & Anderson, B.',
        year: '2022'
      }
    ]
  },

  // Get the content of a specific paper
  async getPaperContent(paperId) {
    try {
      // In a real application, this would load from a server
      // For now, we'll return dummy content based on the paperId
      const content = await import(`@/assets/papers/${paperId}.md`)
      return content.default
    } catch (error) {
      console.error(`Error loading paper content for ${paperId}:`, error)
      throw error
    }
  }
} 