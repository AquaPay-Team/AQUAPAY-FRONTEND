
const services = [
  {
    id: 'payout',
    title: 'Payout',
    subtitle: 'Instant Money Transfer',
    description: 'Transfer funds securely',
    color: 'blue',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 12h15"/>
        <path d="m13 5 7 7-7 7"/>
      </svg>`
  },
  {
    id: 'credit-card',
    title: 'Credit Card Bill 2',
    subtitle: 'Credit Card Payments',
    description: 'Pay your credit card bills',
    color: 'rose',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/>
        <path d="M2 10h20M6 15h4"/>
      </svg>`
  },
  {
    id: 'rupay-upi',
    title: 'Rupay UPI',
    subtitle: 'UPI Collection',
    description: 'Collect payments instantly',
    color: 'orange',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M8 8h8v8H8zM3 12h5m8 0h5M12 3v5m0 8v5"/>
      </svg>`
  },
  {
    id: 'add-money',
    title: 'Add Money',
    subtitle: 'Money Collection',
    description: 'Add funds to your wallet',
    color: 'violet',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v10M7 12h10"/>
      </svg>`
  }
];

const serviceColors = {
  blue: {
    icon: 'bg-blue-50 text-blue-600',
    accent: 'group-hover:bg-blue-600',
    arrow: 'text-blue-600'
  },
  rose: {
    icon: 'bg-rose-50 text-rose-600',
    accent: 'group-hover:bg-rose-600',
    arrow: 'text-rose-600'
  },
  orange: {
    icon: 'bg-orange-50 text-orange-600',
    accent: 'group-hover:bg-orange-600',
    arrow: 'text-orange-600'
  },
  violet: {
    icon: 'bg-violet-50 text-violet-600',
    accent: 'group-hover:bg-violet-600',
    arrow: 'text-violet-600'
  }
};

export function renderServiceCards() {
  return `
    <section class="bg-white border border-slate-200
                    rounded-2xl p-5 lg:p-6 shadow-sm">

      <!-- Heading -->
      <div class="flex items-center justify-between mb-6">

        <div>
          <h2 class="text-lg font-bold text-slate-800">
            Quick Services
          </h2>

          <p class="text-xs text-slate-400 mt-1">
            Access your payment services
          </p>
        </div>

        <span class="text-xs font-medium text-blue-600
                     bg-blue-50 px-3 py-2 rounded-lg">
          04 Services
        </span>

      </div>

      <!-- Service Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        ${services.map(service => {
          const styles = serviceColors[service.color];

          return `
            <button
              type="button"
              data-service="${service.id}"
              class="group relative text-left
                     overflow-hidden
                     border border-slate-200
                     rounded-xl p-5
                     hover:border-slate-300
                     hover:shadow-md
                     hover:-translate-y-1
                     transition-all duration-300"
            >

              <div class="absolute left-0 top-0
                          w-1 h-full bg-transparent
                          ${styles.accent}
                          transition-colors">
              </div>

              <div class="flex items-center
                          justify-between gap-3">

                <div class="min-w-0">

                  <h3 class="text-sm font-bold
                             text-slate-800">
                    ${service.title}
                  </h3>

                  <p class="text-xs font-medium
                            ${styles.arrow} mt-2">
                    ${service.subtitle}
                  </p>

                  <p class="text-xs text-slate-400 mt-3">
                    ${service.description}
                  </p>

                </div>

                <span class="w-12 h-12 shrink-0
                             rounded-xl flex items-center
                             justify-center ${styles.icon}
                             group-hover:scale-110
                             transition-transform">

                  <span class="w-6 h-6">
                    ${service.icon}
                  </span>

                </span>

              </div>

              <div class="flex justify-end mt-3">
                <span class="text-xs text-slate-400
                             group-hover:text-blue-600
                             transition-colors">
                  Open service →
                </span>
              </div>

            </button>
          `;
        }).join('')}

      </div>

    </section>
  `;
}
