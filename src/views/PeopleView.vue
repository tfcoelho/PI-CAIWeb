<template>
  <div class="people-page">
    <div class="people-header">
      <div class="people-title">
        <h1 class="page-title">People</h1>
      </div>
    </div>

    <div v-if="loading" class="loading-indicator">
      <p>Loading people...</p>
    </div>
    <div v-else-if="people.length === 0" class="no-people">
      <p>No people found.</p>
    </div>
    <div v-else class="people-grid">
      <div
        v-for="person in people"
        :key="person.id"
        class="person-card"
        @click="openWebsite(person.website)"
      >
        <div class="person-image-container">
          <img
            :src="getImagePath(person.picture_path)"
            :alt="person.name"
            class="person-image"
          />
        </div>
        <div class="person-info">
          <h2 class="person-name">{{ person.name }}</h2>
          <p class="person-job">{{ person.job }}</p>
          <div v-if="person.role" class="person-role-container">
            <span class="person-role">
              {{ person.role }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { peopleService } from "@/services/peopleService";

export default {
  name: "PeopleView",
  setup() {
    const people = ref([]);
    const loading = ref(true);

    // Store the original background color
    let originalBackgroundColor;

    const loadPeople = async () => {
      loading.value = true;
      try {
        people.value = await peopleService.getPeopleList();
      } catch (error) {
        console.error("Error loading people:", error);
      } finally {
        loading.value = false;
      }
    };

    const getImagePath = (path) => {
      try {
        return require(`@/assets/images/${path}`);
      } catch (error) {
        console.error(`Error loading image at ${path}:`, error);
        return require("@/assets/images/people/no_pfp.jpg"); // Fallback image
      }
    };

    const openWebsite = (url) => {
      window.open(url, "_blank");
    };

    onMounted(() => {
      loadPeople();

      // Save original background color and set new one
      originalBackgroundColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = "#EBEBF5";
    });

    onUnmounted(() => {
      // Restore original background color when leaving this view
      document.body.style.backgroundColor = originalBackgroundColor;
    });

    return {
      people,
      loading,
      getImagePath,
      openWebsite,
    };
  },
};
</script>

<style scoped>
.people-page {
  padding: 0;
  padding-top: 60px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
}

.people-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
  padding: 20px 0;
}

.people-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.page-title {
  font-size: 42px;
  font-weight: 600;
  margin: 0;
  text-align: left;
  color: #111;
  margin-left: 20px;
}

.loading-indicator,
.no-people {
  text-align: center;
  margin-top: 3rem;
  color: #666;
  font-size: 1.2rem;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 50px;
  padding: 0 20px;
}

.person-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.person-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.person-image-container {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.person-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.person-card:hover .person-image {
  transform: scale(1.05);
}

.person-info {
  padding: 20px;
  text-align: left;
}

.person-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #111;
}

.person-job {
  font-size: 14px;
  color: #444;
  margin: 0 0 16px 0;
}

.person-role-container {
  margin-bottom: 10px;
}

.person-role {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: #e02090;
  color: white;
}

@media (max-width: 1200px) {
  .people-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .people-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .people-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 32px;
  }
}
</style>
