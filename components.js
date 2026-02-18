// --- GORILLA FAVICON SETUP (Kører automatisk på alle sider) ---
(function() {
    const head = document.head;
    const version = "?v=3"; 

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

// --- HOPPON HEADER COMPONENT ---
class HoppOnHeader extends HTMLElement {
    async connectedCallback() {
        // 1. Definer links
        const navLinks = `
            <a href="/lift/">Find lift</a>
            <a href="/opret-tur/">Udbyd tur</a>
            <a href="/support/">Support</a>
            <a href="/alternativer-til-gomore/for-passagerer">For passagerer</a>
            <a href="/alternativer-til-gomore/for-chauffoerer">For chauffører</a>
        `;

        // 2. Standard knapper (Ikke logget ind)
        let authButtons = `
            <a href="/login/" class="btn-ghost">Log ind</a>
            <a href="/opret-profil/" class="btn-primary-small">Opret profil</a>
        `;

        // 3. Tjek login status sikkert
        try {
            if (window._supabase) {
                const { data: { session } } = await window._supabase.auth.getSession();
                if (session) {
                    authButtons = `
                        <a href="https://hoppon.dk/beskeder" class="btn-ghost mobile-link">Beskeder</a>
                        <a href="/profil/" class="btn-primary-small mobile-btn">Min Profil</a>
                        <button id="logoutBtn" class="btn-ghost mobile-link" style="cursor:pointer; border:none; background:none; font-family:inherit; font-size:1rem; font-weight:600;">Log ud</button>
                    `;
                }
            }
        } catch (error) {
            console.error("Fejl ved session tjek:", error);
        }

        // 4. Byg HTML
        this.innerHTML = `
            <style>
                /* Header Styling */
                .glass-header {
                    position: fixed; top: 0; left: 0; right: 0;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    z-index: 1000;
                    padding: 0 1.5rem;
                    height: 70px;
                    display: flex; align-items: center;
                }
                .header-container {
                    max-width: 1200px; margin: 0 auto; width: 100%;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .logo { 
                    display: flex; align-items: center; gap: 10px; 
                    font-weight: 800; font-size: 1.2rem; color: #0F172A; 
                    text-decoration: none; 
                }
                .logo img { height: 35px; width: auto; }
                
                /* Desktop Navigation */
                .desktop-nav { display: flex; gap: 20px; align-items: center; }
                .desktop-nav a { text-decoration: none; color: #334155; font-weight: 500; font-size: 0.95rem; transition: 0.2s; font-family: 'Inter', sans-serif; }
                .desktop-nav a:hover { color: #6366F1; }
                .auth-buttons { display: flex; gap: 10px; align-items: center; }

                /* Knapper Styling */
                .btn-ghost { color: #334155; font-weight: 600; text-decoration: none; padding: 8px 12px; transition: 0.2s; font-size: 0.95rem; font-family: 'Inter', sans-serif;}
                .btn-ghost:hover { color: #6366F1; background: rgba(99, 102, 241, 0.05); border-radius: 8px; }
                .btn-primary-small { background: #6366F1; color: white; padding: 8px 16px; border-radius: 10px; text-decoration: none; font-weight: 700; transition: 0.2s; font-size: 0.9rem; font-family: 'Inter', sans-serif;}
                .btn-primary-small:hover { background: #0F172A; }

                /* Burger Menu Ikon */
                .burger-toggle { display: none; cursor: pointer; font-size: 1.8rem; background: none; border: none; color: #0F172A; padding: 5px; z-index: 1001; }
                
                /* Mobil Menu Overlay */
                .mobile-menu-overlay {
                    position: fixed; top: 70px; left: 0; width: 100%; height: calc(100vh - 70px);
                    background: white; 
                    transform: translateX(100%); 
                    transition: transform 0.3s ease-in-out;
                    display: flex; flex-direction: column; padding: 2rem; gap: 1.5rem;
                    box-shadow: -5px 0 15px rgba(0,0,0,0.05);
                    border-top: 1px solid #eee;
                    z-index: 999;
                    overflow-y: auto; 
                }
                .mobile-menu-overlay.active { transform: translateX(0); }
                
                .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; font-size: 1.1rem; font-weight: 600; }
                .mobile-nav-links a { text-decoration: none; color: #0F172A; border-bottom: 1px solid #f1f1f1; padding-bottom: 10px; display: block; font-family: 'Inter', sans-serif;}
                
                .mobile-auth-section { margin-top: auto; display: flex; flex-direction: column; gap: 1rem; padding-bottom: 3rem; }
                .mobile-auth-section .btn-ghost { text-align: left; padding-left: 0; font-size: 1.1rem; }
                .mobile-auth-section .btn-primary-small { text-align: center; padding: 15px; font-size: 1rem; }

                /* Responsive Regler */
                @media (max-width: 900px) {
                    .desktop-nav, .auth-buttons { display: none; }
                    .burger-toggle { display: block; }
                }
            </style>

            <header class="glass-header">
                <div class="header-container">
                    <a href="/" class="logo">
                        <img src="https://i.imgur.com/32NBOeO.png" alt="HoppOn Samkørsel Logo">
                        HoppOn
                    </a>

                    <nav class="desktop-nav">
                        ${navLinks}
                    </nav>
                    <div class="auth-buttons">
                        ${authButtons}
                    </div>

                    <button class="burger-toggle" id="burgerBtn">
                        <span id="burgerIcon">☰</span>
                    </button>
                </div>
            </header>

            <div class="mobile-menu-overlay" id="mobileMenu">
                <nav class="mobile-nav-links">
                    ${navLinks}
                </nav>
                <div class="mobile-auth-section">
                    ${authButtons}
                </div>
            </div>
        `;

        // 5. TILFØJ EVENT LISTENERS (Dette er fixet)
        
        // Find elementerne
        const burgerBtn = this.querySelector('#burgerBtn');
        const logoutBtn = this.querySelector('#logoutBtn');

        // Burger klik event
        if(burgerBtn) {
            burgerBtn.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Log ud klik event
        if(logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                if (window._supabase) {
                    await window._supabase.auth.signOut();
                    location.reload();
                }
            });
        }
    }

    toggleMenu() {
        const menu = this.querySelector('#mobileMenu');
        const icon = this.querySelector('#burgerIcon');
        
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            menu.classList.remove('active');
            icon.innerHTML = '☰'; 
            document.body.style.overflow = ''; // Lås op for scroll
        } else {
            menu.classList.add('active');
            icon.innerHTML = '✕'; 
            document.body.style.overflow = 'hidden'; // Lås scroll
        }
    }
}

// --- HOPPON FOOTER COMPONENT ---
class HoppOnFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .site-footer { background: white; padding: 4rem 1.5rem 2rem; border-top: 1px solid #E2E8F0; margin-top: auto; font-family: 'Inter', sans-serif; }
                .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
                .footer-brand h3 { font-size: 1.2rem; font-weight: 800; margin: 10px 0; color: #0F172A; }
                .footer-brand p { color: #64748B; line-height: 1.6; font-size: 0.95rem; }
                .footer-logo { width: 40px; height: 40px; }
                .footer-links { display: flex; flex-direction: column; gap: 12px; }
                .footer-links h4 { font-size: 1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.5rem; }
                .footer-links a { text-decoration: none; color: #64748B; font-size: 0.95rem; transition: 0.2s; }
                .footer-links a:hover { color: #6366F1; transform: translateX(3px); display:inline-block; }
                .footer-bottom { border-top: 1px solid #E2E8F0; padding-top: 2rem; text-align: center; color: #94A3B8; font-size: 0.9rem; max-width: 1200px; margin: 0 auto; }
                
                @media (max-width: 900px) {
                    .footer-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
                    .footer-brand { align-items: center; display: flex; flex-direction: column; }
                }
            </style>

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
                        <a href="/gomore-lukker-samkoersel/" style="color: #6366F1; font-weight: bold;">GoMore lukker samkørsel</a>
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
