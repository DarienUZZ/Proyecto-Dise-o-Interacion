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
              <i class="icon">🔍</i>
            </button>
          </li>
        </ul>

        <!-- Barra de búsqueda -->
        <div v-if="showSearch" class="search-bar">
          <button class="btn-back" @click="showSearch = false">
            <i class="icon">←</i>
          </button>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search by user or message"
          />
          <button class="btn-search-submit">
            <i class="icon">🔍</i>
          </button>
        </div>
      </div>

      <!-- Lista de tickets -->
      <div class="tickets-list">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="ticket-item"
          :class="{ current: selectedTicket?.id === ticket.id, 'is-unread': ticket.unread }"
          @click="selectTicket(ticket)"
        >
          <div class="ticket-avatar">
            <div
              v-if="ticket.avatar"
              class="avatar"
              :style="{ backgroundImage: `url(${ticket.avatar})` }"
            ></div>
            <div v-else class="avatar avatar-initials" :class="`bg-${ticket.color}`">
              {{ ticket.initials }}
            </div>
          </div>

          <div class="ticket-info">
            <div class="ticket-header">
              <div class="ticket-sender">
                <div class="name">{{ ticket.name }}</div>
                <div v-if="ticket.priority" class="label-dot" :class="`bg-${ticket.priority}`"></div>
              </div>
              <div class="ticket-meta">
                <div v-if="ticket.hasAttachment" class="attachment-icon">📎</div>
                <div class="date">{{ ticket.date }}</div>
              </div>
            </div>

            <div class="ticket-content">
              <div class="ticket-text">
                <h6 class="title">{{ ticket.subject }}</h6>
                <p>{{ ticket.preview }}</p>
              </div>
              <div class="ticket-labels">
                <div v-if="ticket.unread" class="unread-badge">
                  <span class="badge">{{ ticket.unread }}</span>
                </div>
                <div class="star-icon" @click.stop="toggleStar(ticket)">
                  <span v-if="ticket.starred">⭐</span>
                  <span v-else>☆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de conversación -->
    <div
      class="conversation-panel"
      :class="{ 'show-profile': showProfile, 'mobile-visible': selectedTicket }"
    >
      <div v-if="selectedTicket" class="conversation-content">
        <!-- Header del ticket -->
        <div class="conversation-header">
          <button class="btn-back d-lg-none" @click="selectedTicket = null">
            <i class="icon">←</i>
          </button>

          <h4 class="title d-none d-lg-block">{{ selectedTicket.subject }}</h4>

          <div class="header-meta">
            <div class="d-none d-lg-block">
              <div class="tag-label">
                <i class="icon">🚩</i>
                <span>Technical Problem</span>
              </div>
            </div>

            <div class="header-actions">
              <button class="btn btn-sm btn-outline">
                <i class="icon">✓</i>
                <span>Mark as Closed</span>
              </button>

              <button class="btn-icon d-lg-none" @click="showProfile = !showProfile">
                <i class="icon">ℹ</i>
              </button>

              <div class="dropdown">
                <button class="btn-icon" @click="showMenu = !showMenu">
                  <i class="icon">⋮</i>
                </button>
                <div v-if="showMenu" class="dropdown-menu">
                  <a href="#">Assign To Member</a>
                  <a href="#">Move to Archive</a>
                  <a href="#">Mark as Close</a>
                </div>
              </div>
            </div>
          </div>

          <button class="btn-toggle-profile" @click="showProfile = !showProfile">
            <i class="icon">←</i>
          </button>
        </div>

        <!-- Título móvil -->
        <div class="conversation-header-mobile d-lg-none">
          <h4 class="title">{{ selectedTicket.subject }}</h4>
          <div class="tag-label">
            <i class="icon">🚩</i>
            <span>Technical Problem</span>
          </div>
        </div>

        <!-- Mensajes -->
        <div class="messages-container">
          <div v-for="(message, index) in selectedTicket.messages" :key="index" class="message-item">
            <div v-if="message.type === 'message'" class="message-box">
              <div class="message-header">
                <div class="user-info">
                  <div class="user-avatar" :class="`bg-${message.color}`">
                    {{ message.initials }}
                  </div>
                  <div class="user-name">
                    {{ message.sender }}
                    <span v-if="message.isYou">(You)</span>
                  </div>
                </div>
                <div class="message-date">{{ message.date }}</div>
              </div>

              <div class="message-body">
                <div class="message-text">
                  <p v-for="(text, i) in message.text" :key="i">{{ text }}</p>
                </div>

                <!-- Archivos adjuntos -->
                <div v-if="message.attachments" class="attachments">
                  <div class="attachments-list">
                    <div
                      v-for="(file, i) in message.attachments"
                      :key="i"
                      class="attachment-item"
                    >
                      <a href="#" class="download">
                        <i class="icon">🖼️</i>
                        <span>{{ file }}</span>
                      </a>
                    </div>
                  </div>
                  <div class="attachments-footer">
                    <span>{{ message.attachments.length }} files attached</span>
                    <a href="#" class="download-all">
                      <i class="icon">⬇</i>
                      <span>Download All</span>
                    </a>
                  </div>
                </div>

                <div v-if="message.repliedBy" class="replied-by">
                  Replied by <span>{{ message.repliedBy }}</span> at {{ message.time }}
                </div>
              </div>
            </div>

            <div v-else-if="message.type === 'note'" class="message-box note">
              <div class="message-header">
                <div class="user-info">
                  <div class="user-avatar bg-purple">{{ message.initials }}</div>
                  <div class="user-name">
                    {{ message.sender }} <span>added a note</span>
                  </div>
                </div>
                <div class="message-date">{{ message.date }}</div>
              </div>
              <div class="message-body">
                <div class="message-text note-text">
                  <p>{{ message.text }}</p>
                </div>
              </div>
            </div>

            <div v-else-if="message.type === 'meta'" class="message-meta">
              <div class="meta-info">
                <strong v-if="message.date">{{ message.date }}</strong>
                <span v-else>
                  <span class="who">{{ message.who }}</span> assigned user:
                  <span class="whom">{{ message.whom }}</span> at {{ message.time }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario de respuesta -->
        <div class="reply-form">
          <div class="reply-header">
            <ul class="reply-tabs">
              <li :class="{ active: replyTab === 'reply' }" @click="replyTab = 'reply'">
                <a href="#">Reply</a>
              </li>
              <li :class="{ active: replyTab === 'note' }" @click="replyTab = 'note'">
                <a href="#">Private Note</a>
              </li>
            </ul>
            <div class="reply-as">
              <div class="title">Reply as:</div>
              <div class="user-avatar xs bg-purple">IH</div>
            </div>
          </div>

          <div class="reply-editor">
            <textarea
              v-model="replyMessage"
              class="form-control"
              :placeholder="replyTab === 'reply' ? 'Hello' : 'Type your private note...'"
            ></textarea>

            <div class="reply-tools">
              <div class="tools-actions">
                <button class="btn btn-primary" @click="sendReply">
                  {{ replyTab === 'reply' ? 'Reply' : 'Add Note' }}
                </button>
                <button class="btn-icon" title="Template">🔖</button>
                <button class="btn-icon" title="Attachment">📎</button>
                <button class="btn-icon" title="Emoji">😊</button>
                <button class="btn-icon" title="Image">🖼️</button>
              </div>
              <button class="btn-icon">⋮</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel sin selección -->
      <div v-else class="no-selection">
        <div class="empty-state">
          <i class="icon-large">💬</i>
          <h5>Select a conversation</h5>
          <p>Choose a support ticket from the list to view the conversation</p>
        </div>
      </div>
    </div>

    <!-- Sidebar de perfil -->
    <div class="profile-sidebar" :class="{ visible: showProfile }">
      <div v-if="selectedTicket" class="profile-content">
        <div class="profile-card">
          <div class="profile-header">
            <div class="user-avatar lg bg-primary">{{ selectedTicket.initials }}</div>
            <div class="user-info">
              <h5>{{ selectedTicket.name }}</h5>
              <span class="sub-text">Customer</span>
            </div>
            <button class="btn-icon">⋮</button>
          </div>

          <div class="profile-stats">
            <div class="stat-item">
              <span class="amount">23</span>
              <span class="sub-text">Total Order</span>
            </div>
            <div class="stat-item">
              <span class="amount">20</span>
              <span class="sub-text">Complete</span>
            </div>
            <div class="stat-item">
              <span class="amount">3</span>
              <span class="sub-text">Progress</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h6 class="section-title">User Information</h6>
          <ul class="contact-list">
            <li>
              <i class="icon">✉️</i>
              <span>{{ selectedTicket.email || 'info@example.com' }}</span>
            </li>
            <li>
              <i class="icon">📞</i>
              <span>+1234567890</span>
            </li>
            <li>
              <i class="icon">📍</i>
              <span>San Francisco, CA 94851</span>
            </li>
          </ul>
        </div>

        <div class="profile-section">
          <h6 class="section-title">Additional</h6>
          <div class="info-grid">
            <div class="info-item">
              <span class="sub-text">Ref ID:</span>
              <span>TID-049583</span>
            </div>
            <div class="info-item">
              <span class="sub-text">Requested:</span>
              <span>{{ selectedTicket.name }}</span>
            </div>
            <div class="info-item">
              <span class="sub-text">Status:</span>
              <span class="status-open">Open</span>
            </div>
            <div class="info-item">
              <span class="sub-text">Last Reply:</span>
              <span>{{ selectedTicket.name }}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h6 class="section-title">Assigned Account</h6>
          <div class="assigned-users">
            <div class="user-avatar sm bg-purple">IH</div>
            <div class="user-avatar sm bg-pink">ST</div>
            <div class="user-avatar sm bg-gray">SI</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filters = [
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'starred', label: 'Stared' },
  { value: 'all', label: 'All' }
];

const activeFilter = ref('active');
const showSearch = ref(false);
const searchQuery = ref('');
const selectedTicket = ref(null);
const showProfile = ref(false);
const showMenu = ref(false);
const replyTab = ref('reply');
const replyMessage = ref('');

const tickets = ref([
  {
    id: 1,
    name: 'Abu Bin Ishtiyak',
    initials: 'AB',
    color: 'blue',
    subject: 'Unable to select currency when order.',
    preview: 'Hello team, I am facing problem as i can not select currency on buy order page.',
    date: '12 Jan',
    hasAttachment: true,
    priority: 'pink',
    starred: false,
    unread: 0,
    email: 'abu@example.com',
    messages: [
      {
        type: 'message',
        sender: 'Abu Bin Ishtiyak',
        initials: 'AB',
        color: 'blue',
        date: '14 Jan, 2020',
        text: [
          'Hello team,',
          'I am facing problem as i can not select currency on buy order page. Can you guys let me know what i am doing doing wrong? Please check attached files.',
          'Thank you\nIshityak'
        ],
        attachments: ['error-show-On-order.jpg', 'full-page-error.jpg']
      },
      {
        type: 'message',
        sender: 'Support Team',
        initials: 'ST',
        color: 'pink',
        date: '14 Jan, 2020',
        isYou: true,
        text: [
          'Hello Ishtiyak,',
          'We are really sorry to hear that, you have face an unexpected experience. Our team urgently look this matter and get back to you asap.',
          'Thank you very much.'
        ],
        repliedBy: 'Iliash Hossain',
        time: '11:32 AM'
      },
      {
        type: 'meta',
        who: 'Iliash Hossian',
        whom: 'Saiful Islam',
        time: '14 Jan, 2020 at 11:34 AM'
      },
      {
        type: 'note',
        sender: 'Iliash Hossain',
        initials: 'IH',
        date: '14 Jan, 2020',
        text: 'Devement Team need to check out the issues.'
      },
      {
        type: 'meta',
        date: '15 January 2020'
      },
      {
        type: 'message',
        sender: 'Support Team',
        initials: 'ST',
        color: 'pink',
        date: '15 Jan, 2020',
        isYou: true,
        text: [
          'Hello Ishtiyak,',
          'Thanks for waiting for us. Our team solved the issues. So check now on our website. Hopefuly you can order now.',
          'Thank you very much once again.'
        ],
        repliedBy: 'Noor Parvez',
        time: '11:32 AM'
      }
    ]
  },
  {
    id: 2,
    name: 'Jackelyn Dugas',
    initials: 'JD',
    avatar: null,
    subject: 'Have not received bitcoin yet.',
    preview: 'Hey! I recently bitcoin from you. But still have not received yet.',
    date: '15 Jan',
    starred: true,
    unread: 0,
    messages: []
  },
  {
    id: 3,
    name: 'Mayme Johnston',
    initials: 'MJ',
    color: 'purple',
    subject: 'I can not submit kyc application',
    preview: 'Hello support! I can not upload my documents on kyc application.',
    date: '11 Jan',
    unread: 2,
    starred: false,
    messages: []
  }
]);

const filteredTickets = computed(() => {
  let filtered = tickets.value;

  if (activeFilter.value === 'starred') {
    filtered = filtered.filter(t => t.starred);
  } else if (activeFilter.value === 'closed') {
    filtered = [];
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      t =>
        t.name.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query) ||
        t.preview.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const selectTicket = ticket => {
  selectedTicket.value = ticket;
  showProfile.value = window.innerWidth >= 1200;
};

const toggleStar = ticket => {
  ticket.starred = !ticket.starred;
};

const sendReply = () => {
  if (!replyMessage.value.trim()) return;

  const newMessage = {
    type: replyTab.value === 'reply' ? 'message' : 'note',
    sender: 'Support Team',
    initials: 'ST',
    color: 'pink',
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    isYou: true,
    text: [replyMessage.value]
  };

  selectedTicket.value.messages.push(newMessage);
  replyMessage.value = '';
};
</script>

<style scoped>
.support-container {
  display: flex;
  height: calc(100vh - 100px);
  background: #f7f9fc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* ===== SIDEBAR DE MENSAJES ===== */
.messages-sidebar {
  width: 360px;
  background: white;
  border-right: 1px solid #e5e9f2;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e9f2;
}

.filter-menu {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
}

.filter-menu li {
  cursor: pointer;
  padding: 0.5rem 0;
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
  font-size: 0.875rem;
}

.filter-menu li.active a {
  color: #6366f1;
}

.btn-search {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #64748b;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 1rem;
}

.search-bar .form-control {
  flex: 1;
  border: 1px solid #e5e9f2;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.btn-back {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
}

/* Lista de tickets */
.tickets-list {
  flex: 1;
  overflow-y: auto;
}

.ticket-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;
}

.ticket-item:hover {
  background: #f8fafc;
}

.ticket-item.current {
  background: #f1f5f9;
  border-left: 3px solid #6366f1;
}

.ticket-item.is-unread {
  background: #f0f9ff;
}

.ticket-avatar .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  background-size: cover;
  background-position: center;
}

.avatar-initials {
  font-size: 0.875rem;
}

.bg-blue {
  background-color: #3b82f6;
}
.bg-purple {
  background-color: #a855f7;
}
.bg-pink {
  background-color: #ec4899;
}
.bg-gray {
  background-color: #6b7280;
}
.bg-primary {
  background-color: #6366f1;
}

.ticket-info {
  flex: 1;
  min-width: 0;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.ticket-sender {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ticket-sender .name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
}

.label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.ticket-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
}

.ticket-content .title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ticket-content p {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ticket-labels {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.unread-badge .badge {
  background: #6366f1;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* ===== PANEL DE CONVERSACIÓN ===== */
.conversation-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
}

.conversation-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.conversation-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e9f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.conversation-header .title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tag-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: #fef3c7;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #92400e;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-outline {
  border: 1px solid #e5e9f2;
  color: #64748b;
}

.btn-outline:hover {
  background: #f8fafc;
}

.btn-primary {
  background: #6366f1;
  color: white;
}

.btn-primary:hover {
  background: #4f46e5;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #64748b;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #f8fafc;
}

.btn-toggle-profile {
  display: none;
}

.conversation-header-mobile {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e9f2;
}

.conversation-header-mobile .title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

/* Mensajes */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.message-item {
  margin-bottom: 1.5rem;
}

.message-box {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
}

.message-box.note {
  background: #fef3c7;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: white;
}

.user-avatar.xs {
  width: 24px;
  height: 24px;
  font-size: 0.625rem;
}

.user-avatar.sm {
  width: 32px;
  height: 32px;
  font-size: 0.75rem;
}

.user-avatar.lg {
  width: 64px;
  height: 64px;
  font-size: 1.25rem;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
}

.user-name span {
  font-weight: 400;
  color: #64748b;
}

.message-date {
  font-size: 0.8125rem;
  color: #94a3b8;
}

.message-text p {
  margin: 0 0 0.75rem 0;
  color: #475569;
  font-size: 0.875rem;
  line-height: 1.6;
}

.message-text p:last-child {
  margin-bottom: 0;
}

.note-text p {
  color: #92400e;
}

.attachments {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e9f2;
}

.attachments-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.attachment-item .download {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #6366f1;
  font-size: 0.875rem;
}

.attachments-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
  color: #64748b;
  margin-top: 0.5rem;
}

.replied-by {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: #64748b;
}
.replied-by span {
    font-weight: 600;
    color: #1e293b;
}
</style>