import '../../style.css';
import '../../styles/dashboard.css';
import { renderSidebar } from '../../components/sidebar.js';
import { renderNavbar } from '../../components/navbar.js';
import { renderWalletCards } from '../../components/wallet-cards.js';
import { renderServiceCards } from '../../components/service-cards.js';
import { renderBusinessSummary } from '../../components/business-summary.js';
import { renderTransactionTable } from '../../components/transaction-table.js';


const app = document.querySelector('#app');

if (!app) {
  throw new Error('Dashboard root element not found');
}

app.innerHTML = `
  <div class="h-screen flex overflow-hidden bg-slate-50">

    <!-- Sidebar -->
    ${renderSidebar()}

    <div
     id="sidebar-overlay"
     class="fixed inset-0 bg-black/40 z-40 hidden lg:hidden"
     aria-hidden="true"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 min-w-0 h-screen overflow-y-auto">

      <!-- Navbar -->
      ${renderNavbar()}

      <main class="p-4 md:p-6 space-y-6">

        <!-- Dashboard Heading -->
        <h1 class="text-xl font-bold text-slate-800">
          Dashboard
        </h1>

        <!-- Wallet Cards -->
        ${renderWalletCards()}

        <!-- Services and Business Summary -->
        <section class="grid grid-cols-1 xl:grid-cols-3 gap-5">

          <div class="xl:col-span-2 min-w-0">
            ${renderServiceCards()}
          </div>

          <div class="min-w-0">
            ${renderBusinessSummary()}
          </div>

        </section>

        <!-- Transaction Report -->
        ${renderTransactionTable()}

      </main>

    </div>

  </div>
`;

// NAVBAR DROPDOWN FUNCTIONALITY

const notificationButton = document.querySelector(
  '#notification-button'
);

const notificationDropdown = document.querySelector(
  '#notification-dropdown'
);

const profileButton = document.querySelector(
  '#profile-button'
);

const profileDropdown = document.querySelector(
  '#profile-dropdown'
);

function closeNavbarDropdowns() {

  notificationDropdown?.classList.add('hidden');
  profileDropdown?.classList.add('hidden');

  notificationButton?.setAttribute('aria-expanded', 'false');
  profileButton?.setAttribute('aria-expanded', 'false');

}

// Notification dropdown
notificationButton?.addEventListener('click', (event) => {

  event.stopPropagation();

  const isOpen = !notificationDropdown.classList.contains('hidden');

  closeNavbarDropdowns();

  if (!isOpen) {
    notificationDropdown.classList.remove('hidden');
    notificationButton.setAttribute('aria-expanded', 'true');
  }

});

// Profile dropdown
profileButton?.addEventListener('click', (event) => {

  event.stopPropagation();

  const isOpen = !profileDropdown.classList.contains('hidden');

  closeNavbarDropdowns();

  if (!isOpen) {
    profileDropdown.classList.remove('hidden');
    profileButton.setAttribute('aria-expanded', 'true');
  }

});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {

  if (
    !notificationDropdown?.contains(event.target) &&
    !notificationButton?.contains(event.target) &&
    !profileDropdown?.contains(event.target) &&
    !profileButton?.contains(event.target)
  ) {
    closeNavbarDropdowns();
  }

});

// Search shortcut: Ctrl + K
const dashboardSearch = document.querySelector('#dashboard-search');

document.addEventListener('keydown', (event) => {

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {

    event.preventDefault();

    dashboardSearch?.focus();

  }

  if (event.key === 'Escape') {
    closeNavbarDropdowns();
  }

});


// RESPONSIVE SIDEBAR FUNCTIONALITY

const sidebar = document.querySelector('#dashboard-sidebar');
const sidebarToggle = document.querySelector('#sidebar-toggle');
const sidebarOverlay = document.querySelector('#sidebar-overlay');

const desktopView = window.matchMedia('(min-width: 1024px)');

function closeMobileSidebar() {
  if (!sidebar || !sidebarOverlay) return;

  sidebar.classList.add('-translate-x-full');
  sidebarOverlay.classList.add('hidden');

  sidebarToggle?.setAttribute('aria-expanded', 'false');
}

function openMobileSidebar() {
  if (!sidebar || !sidebarOverlay) return;

  sidebar.classList.remove('-translate-x-full');
  sidebarOverlay.classList.remove('hidden');

  sidebarToggle?.setAttribute('aria-expanded', 'true');
}

function toggleDesktopSidebar() {
  if (!sidebar || !sidebarToggle) return;

  const isCollapsed = sidebar.classList.toggle('lg:w-0');

  sidebar.classList.toggle('lg:overflow-hidden', isCollapsed);
  sidebar.classList.toggle('lg:border-r-0', isCollapsed);

  sidebarToggle.setAttribute(
    'aria-expanded',
    String(!isCollapsed)
  );
}

sidebarToggle?.addEventListener('click', () => {

  if (desktopView.matches) {
    toggleDesktopSidebar();
  } else {
    const isOpen = !sidebar.classList.contains('-translate-x-full');

    if (isOpen) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  }

});

// Close when clicking outside sidebar
sidebarOverlay?.addEventListener('click', closeMobileSidebar);

// Close using Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !desktopView.matches) {
    closeMobileSidebar();
  }
});

// Handle browser resizing
desktopView.addEventListener('change', () => {
  closeMobileSidebar();

  if (sidebar) {
    sidebar.classList.remove(
      'lg:w-0',
      'lg:overflow-hidden',
      'lg:border-r-0'
    );
  }

  sidebarToggle?.setAttribute('aria-expanded', 'true');
});



// SIDEBAR SUBMENU EXPAND / COLLAPSE

document.querySelectorAll('[data-menu-toggle]').forEach(button => {

  button.addEventListener('click', () => {

    const menuId = button.dataset.menuToggle;

    const submenu = document.getElementById(`submenu-${menuId}`);

    const chevron = document.querySelector(
      `[data-chevron="${menuId}"]`
    );

    if (!submenu) return;

    const isExpanded =
      button.getAttribute('aria-expanded') === 'true';

    submenu.classList.toggle('hidden', isExpanded);

    button.setAttribute(
      'aria-expanded',
      String(!isExpanded)
    );

    chevron?.classList.toggle('rotate-180', !isExpanded);

  });

});

