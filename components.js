// components.js

// --- GORILLA FAVICON SETUP (Kører automatisk på alle sider) ---
(function() {
    const head = document.head;
    const version = "?v=3"; // Versionering tvinger browseren til at opdatere ikonet

    const iconData = [
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: 'https://i.imgur.com/IAgoHYd.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://i.imgur.com/SaDK8T1.png' }
    ];

    iconData.forEach(data => {
        let link = document.createElement('link');
        link.rel = data.rel;
        if (data.type) link.type = data.type;
        if (data.sizes) link.sizes = data.sizes;
        link.href = data.href + version;
        head.appendChild(link);
    });
})();

// --- EKSISTERENDE COMPONENTS ---

class HoppOnHeader extends HTMLElement {
    async connectedCallback() {
        // Standard knapper (hvis man IKKE er logget ind)
        let authButtons = `
            <a href="/login/" class="btn-ghost">Log ind</a>
            <a href="/opret-profil/" class="btn-primary-small">Opret profil</a>
        `;

        // Tjek om brugeren er logget ind via Supabase
        if (window._supabase) {
            const { data: { session } } = await window._supabase.auth.getSession();
            if (session) {
                // Opdaterede knapper (hvis man ER logget ind)
                authButtons = `
                    <button onclick="window._supabase.auth.signOut().then(() => location.reload())" class="btn-ghost" style="cursor:pointer; border:none; background:none; font-family:inherit; font-weight:600; font-size:1rem;">Log ud</button>
                    <a href="/profil/" class="btn-primary-small">Min Profil</a>
                `;
            }
        }

        this.innerHTML = `
            <header class="glass-header">
                <div class="header-container">
                    <a href="/" class="logo">
                        <img src="https://i.imgur.com/32NBOeO.png" alt="HoppOn Samkørsel Logo">
                        HoppOn
                    </a>
                    <nav class="desktop-nav">
                        <a href="/lift/">Find lift</a>
                        <a href="/opret-tur/">Udbyd tur</a>
                        <a href="/support/">Support</a>
                        <a href="/alternativer-til-gomore/for-passagerer">For passagerer</a>
                        <a href="/alternativer-til-gomore/for-chauffoerer">For chauffører</a>
                    </nav>
                    <div class="auth-buttons">
                        ${authButtons}
                    </div>
                </div>

                <div class="sub-header-banner" style="background-color: rgba(243, 244, 246, 0.9); color: #333; text-align: center; padding: 6px 15px; font-size: 0.85rem; width: 100%; border-top: 1px solid rgba(229, 231, 235, 0.5);">
                    Flyt din samkørselshistorik og gode bedømmelser til os - <a href="mailto:kontakt@hoppon.dk" style="color: #333; text-decoration: underline; font-weight: 600;">blot send os en mail.</a>
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
                        <p>Danmarks nye, gennemsigtige samkørselsplatform. Rejs grønnere, billigere og sjovere – uden skjulte gebyrer eller mellemmænd der tager en uretfærdig bid af kagen.</p>
                    </div>
                    
                    <div class="footer-links">
                        <h4>Kør med HoppOn</h4>
                        <a href="/lift/">Søg efter et lift</a>
                        <a href="/opret-tur/">Tilbyd et lift</a>
                        <a href="/alternativer-til-gomore/for-passagerer">For passagerer</a>
                        <a href="/alternativer-til-gomore/for-chauffoerer">For chauffører</a>
                    </div>

                    <div class="footer-links">
                        <h4>Populære Ruter</h4>
                        <a href="/samkoersel/aarhus-koebenhavn">Aarhus ➔ København</a>
                        <a href="/samkoersel/aalborg-aarhus">Aalborg ➔ Aarhus</a>
                        <a href="/samkoersel/odense-koebenhavn">Odense ➔ København</a>
                        <a href="/samkoersel/esbjerg-aarhus">Esbjerg ➔ Aarhus</a>
                    </div>

                    <div class="footer-links">
                        <h4>Hurtige links</h4>
                        <a href="/alternativer-til-gomore/">GoMore Alternativer</a>
                        <a href="/dsb-alternativ/">Billigere end DSB</a>
                        <a href="/support/">Support & FAQ</a>
                        <a href="/sikkerhed/">Sikkerhed på turen</a>
                        <a href="/toc/">Handelsbetingelser</a>
                        <a href="/privacy_policy/">Privatlivspolitik</a>
                        <a href="/gomore-lukker-samkoersel/" style="color: var(--accent); font-weight: bold;">GoMore lukker samkørsel</a>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2026 HoppOn ApS. Alle rettigheder forbeholdes. CVR: 40151079</p>
                    <div class="tech-stack">Platform udviklet til og for pendlere i Danmark.</div>
                </div>
            </footer>
        `;
    }
}

customElements.define('hoppon-header', HoppOnHeader);
customElements.define('hoppon-footer', HoppOnFooter);
