<template>
  <div class="support-container">
    <!-- Sidebar de mensajes -->
    <div class="messages-sidebar" :class="{ 'mobile-hidden': selectedTicket }">
      <div class="sidebar-header">
        <ul class="filter-menu">
          <li
            v-for="filter in filters"
            :key="filter.value"
            :class="{ active: activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            <a href="#">{{ filter.label }}</a>
          </li>
          <li class="ms-auto">
            <button class="btn-search" @click="showSearch = !showSearch">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </li>
        </ul>

        <!-- Barra de búsqueda -->
        <div v-if="showSearch" class="search-bar">
          <button class="btn-back" @click="showSearch = false">←</button>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search by user or message"
          />
        </div>
      </div>

      <!-- Lista de tickets -->
      <div class="tickets-list">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="ticket-item"
          :class="{ current: selectedTicket?.id === ticket.id }"
          @click="selectTicket(ticket)"
        >
          <div class="ticket-avatar">
            <img v-if="ticket.avatar" :src="ticket.avatar" :alt="ticket.name" />
            <div v-else class="avatar-placeholder">
              {{
                ticket.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
              }}
            </div>
          </div>

          <div class="ticket-info">
            <div class="ticket-header">
              <div class="name">{{ ticket.name }}</div>
              <div class="date">{{ ticket.date }}</div>
            </div>
            <div class="ticket-subject">{{ ticket.subject }}</div>
            <div class="ticket-preview">{{ ticket.preview }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de conversación -->
    <div
      class="conversation-panel"
      :class="{ 'mobile-visible': selectedTicket }"
    >
      <div v-if="selectedTicket" class="conversation-content">
        <!-- Header del ticket -->
        <div class="conversation-header">
          <button class="btn-back d-lg-none" @click="selectedTicket = null">
            ←
          </button>
          <div class="header-info">
            <h4 class="title">{{ selectedTicket.subject }}</h4>
            <span class="subtitle">
              <i class="fa-solid fa-flag"></i>
              Technical problem
            </span>
          </div>
        </div>

        <!-- Mensajes -->
        <div class="messages-container">
          <div
            v-for="(message, index) in selectedTicket.messages"
            :key="index"
            class="message-item"
          >
            <div class="message-avatar">
              <img
                v-if="message.avatar"
                :src="message.avatar"
                :alt="message.sender"
              />
              <div
                v-else
                class="avatar-placeholder"
                :class="{ 'is-support': message.isSupport }"
              >
                {{
                  message.sender
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                }}
              </div>
            </div>

            <div class="message-content">
              <div class="message-header">
                <span class="sender">{{ message.sender }}</span>
                <span v-if="message.isSupport" class="badge-you">(You)</span>
                <span class="time">{{ message.time }}</span>
              </div>
              <div class="message-body">
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario de respuesta -->
        <div class="reply-form">
          <div class="reply-header">
            <button
              class="tab-btn"
              :class="{ active: replyTab === 'reply' }"
              @click="replyTab = 'reply'"
            >
              Reply
            </button>
          </div>

          <div class="reply-editor">
            <textarea
              v-model="replyMessage"
              class="form-control"
              placeholder="Hello"
              rows="4"
            ></textarea>

            <div class="reply-actions">
              <button class="btn-primary" @click="sendReply">Reply</button>
              <div class="reply-tools">
                <i class="fa-solid fa-hashtag"></i>
                <i class="fa-solid fa-paperclip"></i>
                <i class="fa-regular fa-face-smile"></i>
                <i class="fa-solid fa-image"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel sin selección -->
      <div v-else class="no-selection">
        <div class="empty-state">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <h5>Select a conversation</h5>
          <p>Choose a support ticket from the list to view the conversation</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const filters = [
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
  { value: "all", label: "All" },
];

const activeFilter = ref("active");
const showSearch = ref(false);
const searchQuery = ref("");
const selectedTicket = ref(null);
const replyTab = ref("reply");
const replyMessage = ref("");

const tickets = ref([
  {
    id: 1,
    name: "Darien Umaña",
    avatar: null,
    subject: "Problem with Product",
    preview: "Hello team, I am facing problem as i can not select",
    date: "Today",
    messages: [
      {
        sender: "Darien Umaña",
        avatar: null,
        text: "Hello team, I am facing problem as i can not select currency on buy order page. Can you help me?",
        time: "10:30 AM",
        isSupport: false,
      },
      {
        sender: "Support team",
        avatar: null,
        text: "Hello Darien, i hope you're doing well!!\n\nHow can i help you?",
        time: "10:45 AM",
        isSupport: true,
      },
    ],
  },
  {
    id: 2,
    name: "Darien Umaña",
    avatar: null,
    subject: "Problem with Product",
    preview: "Hello team, I am facing problem as i can not select",
    date: "Yesterday",
    messages: [],
  },
  {
    id: 3,
    name: "Darien Umaña",
    avatar: null,
    subject: "Problem with Product",
    preview: "Hello team, I am facing problem as i can not select",
    date: "2 days ago",
    messages: [],
  },
  {
    id: 4,
    name: "Darien Umaña",
    avatar: null,
    subject: "Problem with Product",
    preview: "Hello team, I am facing problem as i can not select",
    date: "3 days ago",
    messages: [],
  },
  {
    id: 5,
    name: "Darien Umaña",
    avatar: null,
    subject: "Problem with Product",
    preview: "Hello team, I am facing problem as i can not select",
    date: "1 week ago",
    messages: [],
  },
]);

onMounted(() => {
  if (tickets.value.length > 0) {
    selectedTicket.value = tickets.value[0];
  }
});
const filteredTickets = computed(() => {
  let filtered = tickets.value;

  if (activeFilter.value === "closed") {
    filtered = [];
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query) ||
        t.preview.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const selectTicket = (ticket) => {
  selectedTicket.value = ticket;
};

const sendReply = () => {
  if (!replyMessage.value.trim()) return;

  const newMessage = {
    sender: "Support team",
    avatar: null,
    text: replyMessage.value,
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isSupport: true,
  };

  selectedTicket.value.messages.push(newMessage);
  replyMessage.value = "";
};
</script>

<style scoped>
.support-container {
  display: flex;
  height: calc(100vh - 140px);
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

/* ===== SIDEBAR ===== */
.messages-sidebar {
  width: 380px;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: #e3e5ee;
}

.filter-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
}

.filter-menu li {
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.filter-menu li.active {
  border-bottom-color: #6366f1;
}

.filter-menu li a {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.9375rem;
}

.filter-menu li.active a {
  color: #1e293b;
}

.btn-search {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #64748b;
  display: flex;
  align-items: center;
}

.search-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1rem;
}

.search-bar .form-control {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
}

.btn-back {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
}

/* Lista de tickets */
.tickets-list {
  flex: 1;
  overflow-y: auto;
}

.ticket-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;
}

.ticket-item:hover {
  background: #f8fafc;
}

.ticket-item.current {
  background: #f0f4ff;
  border-left: 3px solid #6366f1;
}

.ticket-avatar {
  flex-shrink: 0;
}

.ticket-avatar img,
.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  text-transform: uppercase;
}

.ticket-info {
  flex: 1;
  min-width: 0;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
}

.ticket-header .name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #1e293b;
}

.ticket-header .date {
  font-size: 0.8125rem;
  color: #94a3b8;
}

.ticket-subject {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ticket-preview {
  font-size: 0.875rem;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== PANEL DE CONVERSACIÓN ===== */
.conversation-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.conversation-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.conversation-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-info .title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.header-info .subtitle {
  font-size: 0.875rem;
  color: #6366f1;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.header-info .subtitle {
  font-size: 0.875rem;
  color: #6366f1;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

/* Mensajes */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  background: #f8fafc;
}

.message-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.message-avatar img,
.message-avatar .avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.message-avatar .avatar-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: white;
  text-transform: uppercase;
}

.message-avatar .avatar-placeholder.is-support {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.message-header .sender {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #1e293b;
}

.badge-you {
  font-size: 0.8125rem;
  color: #64748b;
  font-weight: 500;
}

.message-header .time {
  font-size: 0.8125rem;
  color: #94a3b8;
  margin-left: auto;
}

.message-body {
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  color: #475569;
  line-height: 1.6;
  white-space: pre-wrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Formulario de respuesta */
.reply-form {
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem;
  background: white;
}

.reply-header {
  margin-bottom: 1rem;
}

.tab-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  font-weight: 500;
  font-size: 0.9375rem;
  color: #6366f1;
  border-bottom: 2px solid #6366f1;
}

.reply-editor textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  resize: none;
  font-family: inherit;
  margin-bottom: 0.875rem;
}

.reply-editor textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.reply-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.625rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.reply-tools {
  display: flex;
  gap: 0.5rem;
}

.btn-tool {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #64748b;
  font-size: 1.125rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-tool:hover {
  background: #f8fafc;
}

/* Estado vacío */
.no-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f8fafc;
}

.empty-state {
  text-align: center;
  padding: 3rem;
}

.empty-state svg {
  color: #cbd5e1;
  margin-bottom: 1.5rem;
}

.empty-state h5 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: #64748b;
  margin: 0;
  font-size: 0.9375rem;
}

/* Responsive */
@media (max-width: 991px) {
  .support-container {
    height: calc(100vh - 80px);
  }

  .messages-sidebar {
    width: 320px;
  }
}

@media (max-width: 767px) {
  .support-container {
    height: calc(100vh - 60px);
  }

  .messages-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 50;
    background: white;
  }

  .messages-sidebar.mobile-hidden {
    transform: translateX(-100%);
  }

  .conversation-panel.mobile-visible {
    display: flex;
  }

  .conversation-header {
    padding: 1rem;
  }

  .messages-container {
    padding: 1.5rem 1rem;
  }

  .reply-form {
    padding: 1rem;
  }
}

/* Scrollbar */
.tickets-list::-webkit-scrollbar,
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.tickets-list::-webkit-scrollbar-track,
.messages-container::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.tickets-list::-webkit-scrollbar-thumb,
.messages-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.tickets-list::-webkit-scrollbar-thumb:hover,
.messages-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.d-lg-none {
  display: none;
}

@media (max-width: 991px) {
  .d-lg-none {
    display: block;
  }
}
</style>
