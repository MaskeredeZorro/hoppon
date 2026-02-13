// components.js

class HoppOnHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <a href="/" class="header-logo">
                    <img src="https://i.imgur.com/4oGYz8n.png" alt="HoppOn Icon">
                    HoppOn
                </a>
                <nav class="nav-links">
                    <a href="/lift" class="nav-link">Find lift</a>
                    <a href="/opret-tur" class="nav-link hide-mobile">Udbyd tur</a>
                    <a href="/opret-profil" class="nav-link hide-mobile">Opret profil</a>
                    
                    <a href="/login" class="nav-btn-login">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Log ind
                    </a>
                </nav>
            </header>
        `;
    }
}

class HoppOnFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footer-links">
                    <a href="/privacy_policy">Privatlivspolitik</a>
                    <a href="/toc">Handelsbetingelser</a>
                    <a href="#">Support</a>
                </div>
                <div class="footer-copy">
                    &copy; 2026 HoppOn. <br> Powered by Stripe & Mapbox.
                </div>
            </footer>
        `;
    }
}

// Her fortæller vi browseren, at vores nye tags findes
customElements.define('hoppon-header', HoppOnHeader);
customElements.define('hoppon-footer', HoppOnFooter);
