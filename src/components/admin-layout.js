import { renderSidebar } from './sidebar.js';
import { renderNavbar } from './navbar.js';

export function renderAdminLayout(content) {
  return `
    <div class="h-screen flex overflow-hidden bg-slate-50">

      <!-- Sidebar -->
      ${renderSidebar()}

      <!-- Mobile Sidebar Overlay -->
      <div
        id="sidebar-overlay"
        class="fixed inset-0 bg-slate-950/40 z-40 hidden lg:hidden"
        aria-hidden="true"
      ></div>

      <!-- Main Application Area -->
      <div class="flex-1 min-w-0 h-screen overflow-y-auto">

        <!-- Navbar -->
        ${renderNavbar()}

        <!-- Dynamic Page Content -->
        <main
          id="admin-page-content"
          class="min-h-[calc(100vh-76px)] p-4 md:p-6 lg:p-7"
        >
          ${content}
        </main>

      </div>
    </div>
  `;
}
