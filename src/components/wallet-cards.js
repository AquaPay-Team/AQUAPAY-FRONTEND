
const wallets = [
  {
    id: 'main',
    title: 'Main Wallet',
    balance: '₹ —',
    description: 'Available wallet balance',
    color: 'blue',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="5" width="18" height="15" rx="3"/>
        <path d="M3 9h18"/>
        <path d="M16 15h2"/>
      </svg>`
  },
  {
    id: 'settlement',
    title: 'Settlement Wallet',
    balance: '₹ —',
    description: 'Available settlement balance',
    color: 'violet',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 10h18"/>
        <path d="M5 10v9M9 10v9M15 10v9M19 10v9"/>
        <path d="M3 19h18M12 3 2 8h20z"/>
      </svg>`
  },
  {
    id: 'upi',
    title: 'UPI Wallet',
    balance: '₹ —',
    description: 'Available UPI balance',
    color: 'emerald',
    icon: `
      <svg viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3"/>
        <path d="M9 18h6"/>
        <path d="m13 6-3 5h4l-3 5"/>
      </svg>`
  }
];

const colorStyles = {
  blue: {
    icon: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
    accent: 'bg-blue-500'
  },
  violet: {
    icon: 'bg-violet-50 text-violet-600',
    border: 'border-violet-100',
    accent: 'bg-violet-500'
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-100',
    accent: 'bg-emerald-500'
  }
};

export function renderWalletCards() {
  return `
    <section
      aria-label="Wallet balances"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
    >

      ${wallets.map(wallet => {
        const styles = colorStyles[wallet.color];

        return `
          <article
            data-wallet="${wallet.id}"
            class="group relative overflow-hidden
                   bg-white border ${styles.border}
                   rounded-2xl p-5 lg:p-6
                   shadow-sm hover:shadow-lg
                   hover:-translate-y-1
                   transition-all duration-300"
          >

            <!-- Decorative Accent -->
            <div class="absolute top-0 left-0
                        w-full h-1 ${styles.accent}
                        opacity-80">
            </div>

            <!-- Header -->
            <div class="flex items-center justify-between">

              <div class="flex items-center gap-3">

                <div class="w-11 h-11 rounded-xl
                            flex items-center justify-center
                            ${styles.icon}">
                  <span class="w-5 h-5">
                    ${wallet.icon}
                  </span>
                </div>

                <div>
                  <h2 class="text-sm font-semibold
                             text-slate-700">
                    ${wallet.title}
                  </h2>

                  <p class="text-xs text-slate-400 mt-1">
                    Wallet Account
                  </p>
                </div>

              </div>

              <button
                type="button"
                aria-label="Wallet options"
                class="w-8 h-8 rounded-lg
                       flex items-center justify-center
                       text-slate-400
                       hover:bg-slate-100
                       transition-colors"
              >
                <svg class="w-5 h-5"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                  <circle cx="5" cy="12" r="1.5"/>
                  <circle cx="12" cy="12" r="1.5"/>
                  <circle cx="19" cy="12" r="1.5"/>
                </svg>
              </button>

            </div>

            <!-- Balance -->
            <div class="mt-7">

              <p class="text-xs font-medium
                        text-slate-400 mb-2">
                Available Balance
              </p>

              <p
                class="text-2xl lg:text-3xl
                       font-bold tracking-tight
                       text-slate-900"
                aria-label="${wallet.title} balance"
              >
                ${wallet.balance}
              </p>

            </div>

            <!-- Footer -->
            <div class="mt-6 pt-4
                        border-t border-slate-100
                        flex items-center justify-between">

              <span class="text-xs text-slate-500">
                ${wallet.description}
              </span>

              <span class="${styles.icon}
                           w-7 h-7 rounded-full
                           flex items-center justify-center">
                <svg class="w-3.5 h-3.5"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2">
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </span>

            </div>

          </article>
        `;
      }).join('')}

    </section>
  `;
}
