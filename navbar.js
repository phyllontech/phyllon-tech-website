class Navbar {
  constructor(containerId) {
    this.containerId = containerId;
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
    this.loadTheme();
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    container.innerHTML = `
      <header class="w-full border-b border-[#e9eef2] dark:border-gray-800 bg-white/90 dark:bg-[#121a20]/90 backdrop-blur-md px-6 py-4 shadow-sm">
        <div class="mx-auto flex max-w-7xl items-center justify-between">
          <a href="" class="block">
            <div class="flex items-center gap-1">
              <img src="images/phyllon_logo_192x192.png" alt="Phyllon Tech Logo" class="size-12 md:size-14 rounded-lg">
              <img src="images/phyllon_logo_text_192x192.png" alt="Phyllon Tech Text" class="h-[3.5rem] w-[4rem] md:h-[4rem] md:w-[4.5rem] opacity-85">
            </div>
          </a>
          <nav
            class="hidden md:flex items-center gap-8 absolute top-full left-0 right-0 bg-white dark:bg-background-dark/95 border-b-2 dark:border-b-0 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 md:relative md:top-auto md:left-auto md:right-auto md:bg-transparent md:border-none md:backdrop-blur-none flex-col md:flex-row p-4 md:p-0 space-y-4 md:space-y-0"
            id="main-nav">
            <a class="text-sm font-medium hover:text-primary transition-colors block py-2 md:py-0"
              href="#services">Services</a>
            <a class="hidden text-sm font-medium hover:text-primary transition-colors block py-2 md:py-0"
              href="#pricing">Pricing</a>
            <a class="text-sm font-medium hover:text-primary transition-colors block py-2 md:py-0"
              href="#contact">Contact</a>
          </nav>
          <div class="flex items-center gap-4">
            <a href="https://wa.me/918097137041" target="_blank"
              class="hidden md:flex items-center h-10 rounded-lg px-6 text-base font-bold text-white transition-all hover:bg-[#1da851]"
              style="background: #25D366; background-size: 100%; background-position: 100% 100%;">
              <svg width="20" height="20" viewBox="0 0 360 362" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M307.546 52.5655C273.709 18.685 228.706 0.0171895 180.756 0C81.951 0 1.53846 80.404 1.50408 179.235C1.48689 210.829 9.74646 241.667 25.4319 268.844L0 361.736L95.0236 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.4547 307.546 52.5741V52.5655ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.4242 304.358L43.034 319.149L58.0834 264.168L54.5423 258.53C39.6304 234.809 31.749 207.391 31.7662 179.244C31.8006 97.1036 98.6334 30.2707 180.817 30.2707C220.61 30.2879 258.015 45.8015 286.145 73.9665C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.5909 128.621 96.777 125.879 96.6309C123.266 96.5019 120.284 96.4762 117.293 96.4762C114.302 96.4762 109.454 97.5935 105.346 102.08C101.238 106.566 89.6691 117.404 89.6691 139.441C89.6691 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z"
                  fill="currentColor" />
              </svg>Let's Talk
            </a>
            <!-- Dark Mode Toggle -->
            <button id="theme-toggle"
              class="flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Toggle dark mode">
              <span class="material-symbols-outlined" id="theme-icon">dark_mode</span>
            </button>
            <!-- Mobile Menu Icon -->
            <button class="md:hidden p-2 text-gray-600 dark:text-gray-300 flex items-center" id="mobile-menu-btn">
              <span class="material-symbols-outlined" id="menu-icon">menu</span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  setupEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    if (themeToggle && themeIcon) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = html.className;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.className = newTheme;
        themeIcon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
        localStorage.setItem('theme', newTheme);
      });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mainNav && menuIcon) {
      mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mainNav.classList.contains('hidden');
        mainNav.classList.toggle('hidden');
        menuIcon.textContent = isHidden ? 'close' : 'menu';
      });

      const navLinks = mainNav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.add('hidden');
          menuIcon.textContent = 'menu';
        });
      });
    }
  }

  loadTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.className = savedTheme;

    if (themeIcon) {
      themeIcon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }
}

// Auto-initialize navbar on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  new Navbar('navbar-container');
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navbar;
}