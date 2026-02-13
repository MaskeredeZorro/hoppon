// components.js

class HoppOnHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="glass-header">
                <div class="header-container">
                    <a href="/" class="logo">
                        <img src="https://i.imgur.com/32NBOeO.png" alt="HoppOn Samkørsel Logo">
                        HoppOn
                    </a>
                    <nav class="desktop-nav">
                        <a href="/lift">Find lift</a>
                        <a href="/opret-tur">Udbyd tur</a>
                        <a href="/hvordan-det-virker">Sådan virker det</a>
                    </nav>
                    <div class="auth-buttons">
                        <a href="/login" class="btn-ghost">Log ind</a>
                        <a href="/opret-profil" class="btn-primary-small">Opret profil</a>
                    </div>
                </div>
            </header>
        `;
    }
}

class HoppOnFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <img src="https://i.imgur.com/32NBOeO.png" alt="HoppOn Ikon" class="footer-logo">
                        <h3>HoppOn Samkørsel</h3>
                        <p>Danmarks nye, gebyrfrie samkørselsplatform. Rejs grønnere, billigere og sjovere - uden mellemmænd der tager en bid af kagen.</p>
                    </div>
                    
                    <div class="footer-links">
                        <h4>Kør med HoppOn</h4>
                        <a href="/lift">Find et lift</a>
                        <a href="/opret-tur">Tilbyd et lift</a>
                        <a href="/pendler">For pendlere</a>
                        <a href="/priser">Priser (0 kr. i gebyr)</a>
                    </div>

                    <div class="footer-links">
                        <h4>Populære Ruter</h4>
                        <a href="/lift?fra=Aarhus&til=København">Samkørsel Aarhus - København</a>
                        <a href="/lift?fra=Aalborg&til=Odense">Samkørsel Aalborg - Odense</a>
                        <a href="/lift?fra=København&til=Odense">Samkørsel København - Odense</a>
                        <a href="/lift?fra=Esbjerg&til=Aarhus">Samkørsel Esbjerg - Aarhus</a>
                    </div>

                    <div class="footer-links">
                        <h4>Hjælp & Vilkår</h4>
                        <a href="/faq">Support & FAQ</a>
                        <a href="/toc">Handelsbetingelser</a>
                        <a href="/privacy_policy">Privatlivspolitik</a>
                        <a href="/kontakt">Kontakt os</a>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2026 HoppOn ApS. Alle rettigheder forbeholdes. CVR: 40151079</p>
                    <div class="tech-stack">Powered by Stripe & Mapbox</div>
                </div>
            </footer>
        `;
    }
}

customElements.define('hoppon-header', HoppOnHeader);
customElements.define('hoppon-footer', HoppOnFooter);
