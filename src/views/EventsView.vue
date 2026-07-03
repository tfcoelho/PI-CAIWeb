<template>
  <div class="events-page">
    <div class="events-header">
      <div class="logo-and-title">
        <router-link
          to="/"
          class="header-logo-glass"
          aria-label="Go to home page"
        >
          <img
            src="@/assets/images/logo_dark.png"
            alt="PI-CAI logo"
            class="header-logo"
          />
        </router-link>
        <h1 class="page-title">Meetings</h1>
      </div>
    </div>

    <div class="tag-filter">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="['tag-btn', selectedFilter === filter ? 'active' : '']"
        @click="filterByStatus(filter)"
      >
        {{ filter }}
      </button>
    </div>

    <div v-if="filteredEvents.length === 0" class="no-events">
      <p>No {{ selectedFilter.toLowerCase() }} meetings found.</p>
    </div>
    <div class="events-grid">
      <div
        v-for="event in filteredEvents"
        :key="event.id"
        class="event-card"
        @click="viewEvent(event)"
      >
        <span class="event-tag">{{ event.tag }}</span>
        <h2 class="event-title">{{ event.title }}</h2>
        <p class="event-location">{{ event.location }}</p>
        <div class="event-footer">
          <p class="date">{{ formatDate(event.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "EventsView",
  setup() {
    const router = useRouter();

    const events = ref([
      {
        id: "symposium-2026",
        tag: "Symposium",
        title:
          "Artificial Intelligence for Prostate Cancer Diagnosis and Screening on MRI: Current Practice, Evidence Gaps, and the Research Agenda",
        location: "Radboud University, Nijmegen",
        date: "2026-06-01",
        route: "/symposium-2026",
      },
    ]);

    const filters = ["All", "Past", "Upcoming"];
    const selectedFilter = ref("All");

    const isPast = (event) => new Date(event.date) < new Date();

    const filteredEvents = computed(() => {
      if (selectedFilter.value === "Upcoming") {
        return events.value.filter((event) => !isPast(event));
      }
      if (selectedFilter.value === "Past") {
        return events.value.filter((event) => isPast(event));
      }
      return events.value;
    });

    const updateIndicator = () => {
      nextTick(() => {
        const activeBtn = document.querySelector(".tag-btn.active");
        const filterContainer = document.querySelector(".tag-filter");
        if (activeBtn && filterContainer) {
          const rect = activeBtn.getBoundingClientRect();
          const containerRect = filterContainer.getBoundingClientRect();
          const left = rect.left - containerRect.left;
          filterContainer.setAttribute("data-active-left", "");
          filterContainer.style.setProperty("--active-left", `${left}px`);
          filterContainer.style.setProperty(
            "--active-width",
            `${rect.width}px`
          );
        }
      });
    };

    const filterByStatus = (filter) => {
      selectedFilter.value = filter;
      updateIndicator();
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    };

    let originalBackgroundColor;

    const viewEvent = (event) => {
      router.push(event.route);
    };

    onMounted(() => {
      originalBackgroundColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = "#EBEBF5";
      updateIndicator();
    });

    onUnmounted(() => {
      document.body.style.backgroundColor = originalBackgroundColor;
    });

    return {
      events,
      filters,
      selectedFilter,
      filteredEvents,
      filterByStatus,
      formatDate,
      viewEvent,
    };
  },
};
</script>

<style scoped>
.header-logo-glass {
  position: fixed;
  top: 20px;
  left: 6%;
  padding: 4px;
  border-radius: 6px;
  background: transparent;
  border: none;
  box-shadow: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 11;
  text-decoration: none;
  line-height: 0;
}

.header-logo {
  width: 132px;
  height: auto;
  display: block;
}

.events-page {
  min-height: 100vh;
  padding-top: 60px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  background-color: #ebebf5;
}

.events-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 20px 0;
  padding-top: 80px;
}

.logo-and-title {
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
  margin-top: 0;
}

.tag-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding-bottom: 4px;
  border-bottom: 1px solid #666666;
  overflow-x: auto;
  position: relative;
}

.tag-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s ease;
  text-transform: uppercase;
  min-width: fit-content;
  font-feature-settings: "tnum";
  letter-spacing: -0.01em;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  position: relative;
}

.tag-btn:hover {
  color: #333;
}

.tag-btn.active {
  color: #333;
}

.tag-filter::after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #e02090;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  width: 0;
  opacity: 0;
}

.tag-filter[data-active-left] {
  --active-left: 0px;
  --active-width: 0px;
}

.tag-filter[data-active-left]::after {
  left: var(--active-left);
  width: var(--active-width);
  opacity: 1;
}

.no-events {
  text-align: center;
  margin-top: 3rem;
  color: #666;
  font-size: 1.2rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px;
  margin-top: 2rem;
  position: relative;
}

.event-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-align: left;
  cursor: pointer;
  margin: 20px;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: #e02090;
  color: white;
  margin-bottom: 16px;
  align-self: flex-start;
}

.event-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
  color: #111;
}

.event-location {
  color: #666;
  font-size: 14px;
  margin: 0 0 8px 0;
  font-weight: 400;
}

.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
}

.date {
  color: #777;
  font-size: 14px;
  font-style: italic;
  margin: 0;
}

@media (max-width: 750px) {
  .events-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 32px;
  }
  .header-logo-glass {
    display: none;
  }
}
</style>
