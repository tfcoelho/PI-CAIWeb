// This service handles loading research papers and their content
export const researchService = {
  // Get list of all available papers
  async getPapersList() {
    try {
      // Use webpack's require.context to dynamically load all .md files
      const mdContext = require.context("@/assets/data/papers", false, /\.md$/);
      const mdFiles = mdContext.keys();

      // Process each file to extract metadata from its content
      const papers = await Promise.all(
        mdFiles.map(async (path) => {
          // Extract the file name without extension to use as ID
          const id = path.replace("./", "").replace(".md", "");

          // Import the file content
          const content = await import(`@/assets/data/papers/${id}.md`);
          const mdContent = content.default || content;

          const frontmatterMatch = mdContent.match(/^---\s*\n([\s\S]*?)\n---/m);
          let tags = [];
          let frontmatterAuthors = "";
          let frontmatterDate = "";
          let publicationLink = "";
          let publicationDetails = "";

          if (frontmatterMatch && frontmatterMatch[1]) {
            // Extract tags from frontmatter
            const tagsMatch = frontmatterMatch[1].match(/tags:\s*(.+)/i);
            if (tagsMatch && tagsMatch[1]) {
              tags = tagsMatch[1]
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

              console.log(`Extracted tags from ${id}:`, tags);
            } else {
              console.log(`No tags line found in frontmatter from ${id}.`);
            }

            // Extract authors from frontmatter
            const authorsMatch = frontmatterMatch[1].match(/authors:\s*(.+)/i);
            if (authorsMatch && authorsMatch[1]) {
              frontmatterAuthors = authorsMatch[1].trim();
              console.log(
                `Extracted authors from ${id} frontmatter:`,
                frontmatterAuthors
              );
            }

            // Extract date from frontmatter
            const dateMatch = frontmatterMatch[1].match(/date:\s*(.+)/i);
            if (dateMatch && dateMatch[1]) {
              frontmatterDate = dateMatch[1].trim();
              console.log(
                `Extracted date from ${id} frontmatter:`,
                frontmatterDate
              );
            }

            // Extract publication link from frontmatter
            const linkMatch = frontmatterMatch[1].match(
              /publication_link:\s*(.+)/i
            );
            if (linkMatch && linkMatch[1]) {
              publicationLink = linkMatch[1].trim();
              console.log(
                `Extracted publication link from ${id} frontmatter:`,
                publicationLink
              );
            }

            // Extract publication details from frontmatter
            const detailsMatch = frontmatterMatch[1].match(
              /publication_details:\s*(.+)/i
            );
            if (detailsMatch && detailsMatch[1]) {
              publicationDetails = detailsMatch[1].trim();
            }
          } else {
            console.log(`No frontmatter found in ${id}.`);
          }

          // Clean the markdown content by removing frontmatter
          const cleanContent = mdContent.replace(/^---\n[\s\S]*?\n---\n/, "");

          // Extract title from the markdown content
          const titleMatch = cleanContent.match(/# (.*)/);
          const title = titleMatch ? titleMatch[1] : id;

          // Look for authors in the content if not found in frontmatter
          let authors = frontmatterAuthors;
          if (!authors) {
            const contentAuthorsMatch =
              cleanContent.match(/authors: ([^\n]*)/i) ||
              cleanContent.match(/by ([^\n]*)/i) ||
              cleanContent.match(/authors?[.:] ?([^\n]*)/i);
            authors = contentAuthorsMatch ? contentAuthorsMatch[1] : "";
          }

          // Look for year/date in the content if not found in frontmatter
          let date = frontmatterDate;
          if (!date) {
            const yearMatch =
              cleanContent.match(/year[.:] ?([^\n]*)/i) ||
              cleanContent.match(/(\d{4})/);
            date = yearMatch ? yearMatch[1] : "";
          }

          // Extract year from the date for backwards compatibility
          const yearMatch = date.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : "";

          return {
            id,
            title,
            authors,
            date,
            year,
            tags,
            publicationLink,
            publicationDetails,
          };
        })
      );

      return papers;
    } catch (error) {
      console.error("Error loading papers list:", error);
      return [];
    }
  },

  // Get the content of a specific paper
  async getPaperContent(paperId) {
    try {
      // Load paper content
      const content = await import(`@/assets/data/papers/${paperId}.md`);
      const mdContent = content.default || content;

      // Remove frontmatter before returning
      return mdContent.replace(/^---\n[\s\S]*?\n---\n/, "");
    } catch (error) {
      console.error(`Error loading paper content for ${paperId}:`, error);
      throw error;
    }
  },

  // Get all unique tags from papers
  async getAllTags() {
    try {
      const papers = await this.getPapersList();
      const allTags = new Set();

      // DEBUG: Print all papers with their tags
      console.log("Papers with their tags:");
      papers.forEach((paper) => {
        console.log(`${paper.id}:`, paper.tags);
      });

      papers.forEach((paper) => {
        if (paper.tags && Array.isArray(paper.tags)) {
          paper.tags.forEach((tag) => allTags.add(tag));
        }
      });

      // DEBUG: Print all unique tags found
      console.log("All unique tags found:", Array.from(allTags));

      return ["All", ...Array.from(allTags)];
    } catch (error) {
      console.error("Error getting all tags:", error);
      return ["All"];
    }
  },
};
