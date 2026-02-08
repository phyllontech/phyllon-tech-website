class Footer {
  constructor(containerId) {
    this.containerId = containerId;
    this.init();
  }

  init() {
    this.render();
    this.updateCurrentYear();
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    container.innerHTML = `
      <footer class="bg-white dark:bg-[#0f151a] border-t border-gray-200 dark:border-gray-800" id="contact">
        <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div class="flex justify-center space-x-6 md:order-2">
            <a class="text-green-500" href="https://wa.me/918097137041" target="_blank">
              <span class="sr-only">WhatsApp</span>
              <svg width="24" height="24" viewBox="0 0 360 362" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M307.546 52.5655C273.709 18.685 228.706 0.0171895 180.756 0C81.951 0 1.53846 80.404 1.50408 179.235C1.48689 210.829 9.74646 241.667 25.4319 268.844L0 361.736L95.0236 336.811C121.203 351.096 150.683 358.616 180.679 358.625H180.756C279.544 358.625 359.966 278.212 360 179.381C360.017 131.483 341.392 86.4547 307.546 52.5741V52.5655ZM180.756 328.354H180.696C153.966 328.346 127.744 321.16 104.865 307.589L99.4242 304.358L43.034 319.149L58.0834 264.168L54.5423 258.53C39.6304 234.809 31.749 207.391 31.7662 179.244C31.8006 97.1036 98.6334 30.2707 180.817 30.2707C220.61 30.2879 258.015 45.8015 286.145 73.9665C314.276 102.123 329.755 139.562 329.738 179.364C329.703 261.513 262.871 328.346 180.756 328.346V328.354ZM262.475 216.777C257.997 214.534 235.978 203.704 231.869 202.209C227.761 200.713 224.779 199.966 221.796 204.452C218.814 208.939 210.228 219.029 207.615 222.011C205.002 225.002 202.389 225.372 197.911 223.128C193.434 220.885 179.003 216.158 161.891 200.902C148.578 189.024 139.587 174.362 136.975 169.875C134.362 165.389 136.7 162.965 138.934 160.739C140.945 158.728 143.412 155.505 145.655 152.892C147.899 150.279 148.638 148.406 150.133 145.423C151.629 142.432 150.881 139.82 149.764 137.576C148.646 135.333 139.691 113.287 135.952 104.323C132.316 95.5909 128.621 96.777 125.879 96.6309C123.266 96.5019 120.284 96.4762 117.293 96.4762C114.302 96.4762 109.454 97.5935 105.346 102.08C101.238 106.566 89.6691 117.404 89.6691 139.441C89.6691 161.478 105.716 182.785 107.959 185.776C110.202 188.767 139.544 234.001 184.469 253.408C195.153 258.023 203.498 260.782 210.004 262.845C220.731 266.257 230.494 265.776 238.212 264.624C246.816 263.335 264.71 253.786 268.44 243.326C272.17 232.866 272.17 223.893 271.053 222.028C269.936 220.163 266.945 219.037 262.467 216.794L262.475 216.777Z"
                  fill="currentColor" />
              </svg>
            </a>
            <a class="text-gray-400 hover:text-primary" href="https://www.instagram.com/phyllon.tech.official/"
              target="_blank">
              <span class="sr-only">Instagram</span>
              <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <style type="text/css">
                  .st0 {
                    fill: url(#SVGID_1_);
                  }

                  .st1 {
                    fill: url(#SVGID_2_);
                  }

                  .st2 {
                    fill: #654C9F;
                  }
                </style>
                <g id="Edges" />
                <g id="Symbol">
                  <g>
                    <radialGradient cx="56.3501" cy="19.2179"
                      gradientTransform="matrix(0.9986 -5.233596e-02 4.448556e-02 0.8488 -36.9742 443.8014)"
                      gradientUnits="userSpaceOnUse" id="SVGID_1_" r="711.335">
                      <stop offset="0" style="stop-color:#FED576" />
                      <stop offset="0.2634" style="stop-color:#F47133" />
                      <stop offset="0.6091" style="stop-color:#BC3081" />
                      <stop offset="1" style="stop-color:#4C63D2" />
                    </radialGradient>
                    <path class="st0"
                      d="M96.1,23.2c-16.2,6.3-29.9,14.7-43.6,28.4C38.8,65.2,30.4,79,24.1,95.1c-6.1,15.6-10.2,33.5-11.4,59.7    c-1.2,26.2-1.5,34.6-1.5,101.4s0.3,75.2,1.5,101.4c1.2,26.2,5.4,44.1,11.4,59.7c6.3,16.2,14.7,29.9,28.4,43.6    c13.7,13.7,27.4,22.1,43.6,28.4c15.6,6.1,33.5,10.2,59.7,11.4c26.2,1.2,34.6,1.5,101.4,1.5c66.8,0,75.2-0.3,101.4-1.5    c26.2-1.2,44.1-5.4,59.7-11.4c16.2-6.3,29.9-14.7,43.6-28.4c13.7-13.7,22.1-27.4,28.4-43.6c6.1-15.6,10.2-33.5,11.4-59.7    c1.2-26.2,1.5-34.6,1.5-101.4s-0.3-75.2-1.5-101.4c-1.2-26.2-5.4-44.1-11.4-59.7C484,79,475.6,65.2,462,51.6    c-13.7-13.7-27.4-22.1-43.6-28.4c-15.6-6.1-33.5-10.2-59.7-11.4c-26.2-1.2-34.6-1.5-101.4-1.5s-75.2,0.3-101.4,1.5    C129.6,12.9,111.7,17.1,96.1,23.2z M356.6,56c24,1.1,37,5.1,45.7,8.5c11.5,4.5,19.7,9.8,28.3,18.4c8.6,8.6,13.9,16.8,18.4,28.3    c3.4,8.7,7.4,21.7,8.5,45.7c1.2,25.9,1.4,33.7,1.4,99.4s-0.3,73.5-1.4,99.4c-1.1,24-5.1,37-8.5,45.7c-4.5,11.5-9.8,19.7-18.4,28.3    c-8.6,8.6-16.8,13.9-28.3,18.4c-8.7,3.4-21.7,7.4-45.7,8.5c-25.9,1.2-33.7,1.4-99.4,1.4s-73.5-0.3-99.4-1.4    c-24-1.1-37-5.1-45.7-8.5c-11.5-4.5-19.7-9.8-28.3-18.4c-8.6-8.6-13.9-16.8-18.4-28.3c-3.4-8.7-7.4-21.7-8.5-45.7    c-1.2-25.9-1.4-33.7-1.4-99.4s0.3-73.5,1.4-99.4c1.1-24,5.1-37,8.5-45.7c4.5-11.5,9.8-19.7,18.4-28.3c8.6-8.6,16.8-13.9,28.3-18.4    c8.7-3.4,21.7-7.4,45.7-8.5c25.9-1.2,33.7-1.4,99.4-1.4S330.7,54.8,356.6,56z" />
                  </g>
                  <g>
                    <radialGradient cx="154.0732" cy="134.5501"
                      gradientTransform="matrix(0.9986 -5.233596e-02 4.448556e-02 0.8488 -24.3617 253.2946)"
                      gradientUnits="userSpaceOnUse" id="SVGID_2_" r="365.2801">
                      <stop offset="0" style="stop-color:#FED576" />
                      <stop offset="0.2634" style="stop-color:#F47133" />
                      <stop offset="0.6091" style="stop-color:#BC3081" />
                      <stop offset="1" style="stop-color:#4C63D2" />
                    </radialGradient>
                    <path class="st1"
                      d="M130.9,256.3c0,69.8,56.6,126.3,126.3,126.3s126.3-56.6,126.3-126.3S327,130,257.2,130    S130.9,186.5,130.9,256.3z M339.2,256.3c0,45.3-36.7,82-82,82s-82-36.7-82-82c0-45.3,36.7-82,82-82S339.2,211,339.2,256.3z" />
                    <circle class="st2" cx="388.6" cy="125" r="29.5" />
                  </g>
                </g>
              </svg>
            </a>
            <a class="text-gray-400 hover:text-primary" href="mailto:info@phyllon.tech">
              <span class="sr-only">Email</span>
              <span class="material-symbols-outlined">mail</span>
            </a>
            <a class="text-gray-400 hover:text-primary" href="#">
              <span class="sr-only">Website</span>
              <span class="material-symbols-outlined">language</span>
            </a>
          </div>
          <div class="mt-8 md:order-1 md:mt-0">
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
                <img src="images/phyllon_logo_192x192.png" alt="Phyllon Tech Logo" class="size-14 rounded-lg">
                <img src="images/phyllon_logo_text_192x192.png" alt="Phyllon Tech Text" class="h-[4rem] w-[4.5rem]">
              </div>
              <p class="text-center text-xs leading-5 text-gray-500 md:text-left">
                © <span id="currentYear">2026</span> Phyllon Tech. All rights reserved.
              </p>
              <p class="text-center text-xs leading-5 text-gray-500 md:text-left mt-1">
                info@phyllon.tech
              </p>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  updateCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  }
}

// Auto-initialize footer on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  new Footer('footer-container');
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Footer;
}