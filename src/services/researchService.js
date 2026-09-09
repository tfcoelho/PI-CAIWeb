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
          let studyProtocolLink = "";
          let order = null;
          let underReview = false;
          let institutions = [];

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

            // Extract authors from frontmatter. Long author lists are wrapped
            // across multiple physical lines in the source file, so this
            // captures everything up to the next "key:" line (or the end of
            // the frontmatter block) rather than stopping at the first line.
            const authorsMatch = frontmatterMatch[1].match(
              /authors:\s*([\s\S]*?)(?=\n+[a-z_]+:\s|\s*$)/i
            );
            if (authorsMatch && authorsMatch[1]) {
              frontmatterAuthors = authorsMatch[1]
                .trim()
                .replace(/\s*\n\s*/g, " ");
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

            // Extract study protocol link from frontmatter
            const protocolMatch = frontmatterMatch[1].match(
              /study_protocol_link:\s*(.+)/i
            );
            if (protocolMatch && protocolMatch[1]) {
              studyProtocolLink = protocolMatch[1].trim();
            }

            const orderMatch = frontmatterMatch[1].match(/order:\s*(\d+)/i);
            if (orderMatch && orderMatch[1]) {
              order = parseInt(orderMatch[1], 10);
            }

            // Extract the under-review flag from frontmatter. This only
            // changes how the tag badge is displayed — the paper still
            // filters under its normal "ONGOING" tag.
            const underReviewMatch =
              frontmatterMatch[1].match(/under_review:\s*(.+)/i);
            if (underReviewMatch && underReviewMatch[1]) {
              underReview = underReviewMatch[1].trim().toLowerCase() === "true";
            }

            // Extract partner-institution logo keys (comma-separated, match
            // filenames under src/assets/images/organization_logos/), shown
            // on ongoing studies in place of a journal logo.
            const institutionsMatch =
              frontmatterMatch[1].match(/institutions:\s*(.+)/i);
            if (institutionsMatch && institutionsMatch[1]) {
              institutions = institutionsMatch[1]
                .split(",")
                .map((key) => key.trim())
                .filter(Boolean);
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
            studyProtocolLink,
            order,
            underReview,
            institutions,
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

      // Order tabs by study lifecycle rather than filesystem/alphabetical
      // order, which is otherwise implicit and easy to accidentally shuffle
      // by renaming or adding a paper file.
      const tagOrder = ["PUBLISHED", "ONGOING"];
      return Array.from(allTags).sort((a, b) => {
        const aIndex = tagOrder.indexOf(a.toUpperCase());
        const bIndex = tagOrder.indexOf(b.toUpperCase());
        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    } catch (error) {
      console.error("Error getting all tags:", error);
      return ["All"];
    }
  },
};
