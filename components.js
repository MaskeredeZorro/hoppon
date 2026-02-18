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

// --- UPDATED COMPONENTS ---

class HoppOnHeader extends HTMLElement {
    async connectedCallback() {
        // 1. Definer links (så vi ikke skal skrive dem to gange)
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

        // 3. Tjek login status
        if (window._supabase) {
            const { data: { session } } = await window._supabase.auth.getSession();
            if (session) {
                authButtons = `
                    <a href="https://hoppon.dk/beskeder" class="btn-ghost mobile-link">Beskeder</a>
                    <a href="/profil/" class="btn-primary-small mobile-btn">Min Profil</a>
                    <button onclick="window._supabase.auth.signOut().then(() => location.reload())" class="btn-ghost mobile-link" style="cursor:pointer; border:none; background:none;">Log ud</button>
                `;
            }
        }

        // 4. Byg HTML med CSS og Mobil Menu struktur
        this.innerHTML = `
            <style>
                /* Integreret CSS for Headeren */
                .glass-header {
                    position: fixed; top: 0; left: 0; right: 0;
                    background: rgba(255, 255, 255, 0.85);
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
                    font-weight: 800; font-size: 1.2rem; color: var(--brand, #0F172A); 
                    text-decoration: none; 
                }
                .logo img { height: 35px; width: auto; }
                
                /* Desktop Navigation */
                .desktop-nav { display: flex; gap: 20px; align-items: center; }
                .desktop-nav a { text-decoration: none; color: var(--text-main, #334155); font-weight: 500; font-size: 0.95rem; transition: 0.2s; }
                .desktop-nav a:hover { color: var(--accent, #6366F1); }
                .auth-buttons { display: flex; gap: 10px; align-items: center; }

                /* Knapper Styling */
                .btn-ghost { color: var(--text-main, #334155); font-weight: 600; text-decoration: none; padding: 8px 12px; transition: 0.2s; }
                .btn-ghost:hover { color: var(--accent, #6366F1); background: rgba(99, 102, 241, 0.05); border-radius: 8px; }
                .btn-primary-small { background: var(--accent, #6366F1); color: white; padding: 8px 16px; border-radius: 10px; text-decoration: none; font-weight: 700; transition: 0.2s; font-size: 0.9rem; }
                .btn-primary-small:hover { background: var(--brand, #0F172A); }

                /* Burger Menu Ikon */
                .burger-toggle { display: none; cursor: pointer; font-size: 1.5rem; background: none; border: none; color: var(--brand, #0F172A); }
                
                /* Mobil Menu Overlay */
                .mobile-menu-overlay {
                    position: fixed; top: 70px; left: 0; width: 100%; height: calc(100vh - 70px);
                    background: white; transform: translateX(100%); transition: transform 0.3s ease-in-out;
                    display: flex; flex-direction: column; padding: 2rem; gap: 1.5rem;
                    box-shadow: -5px 0 15px rgba(0,0,0,0.05);
                    border-top: 1px solid #eee;
                }
                .mobile-menu-overlay.active { transform: translateX(0); }
                .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; font-size: 1.1rem; font-weight: 600; }
                .mobile-nav-links a { text-decoration: none; color: var(--brand, #0F172A); border-bottom: 1px solid #f1f1f1; padding-bottom: 10px; }
                .mobile-auth-section { margin-top: auto; display: flex; flex-direction: column; gap: 1rem; padding-bottom: 2rem; }
                
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

                    <button class="burger-toggle" id="burgerBtn" onclick="this.getRootNode().host.toggleMenu()">
                        <i class="fa-solid fa-bars"></i>
                        <span style="font-family: sans-serif;">☰</span>
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
    }

    toggleMenu() {
        const menu = this.querySelector('#mobileMenu');
        const btn = this.querySelector('#burgerBtn span');
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            menu.classList.remove('active');
            btn.innerHTML = '☰'; // Hamburger
        } else {
            menu.classList.add('active');
            btn.innerHTML = '✕'; // Kryds
        }
    }
}

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

        // 3. Tjek login status
        if (window._supabase) {
            const { data: { session } } = await window._supabase.auth.getSession();
            if (session) {
                authButtons = `
                    <a href="https://hoppon.dk/beskeder" class="btn-ghost mobile-link">Beskeder</a>
                    <a href="/profil/" class="btn-primary-small mobile-btn">Min Profil</a>
                    <button id="logoutBtn" class="btn-ghost mobile-link" style="cursor:pointer; border:none; background:none;">Log ud</button>
                `;
            }
        }

        // 4. Byg HTML
        this.innerHTML = `
            <style>
                /* Integreret CSS for Headeren */
                .glass-header {
                    position: fixed; top: 0; left: 0; right: 0;
                    background: rgba(255, 255, 255, 0.95); /* Lidt mere solid baggrund for mobil */
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
                .desktop-nav a { text-decoration: none; color: #334155; font-weight: 500; font-size: 0.95rem; transition: 0.2s; }
                .desktop-nav a:hover { color: #6366F1; }
                .auth-buttons { display: flex; gap: 10px; align-items: center; }

                /* Knapper Styling */
                .btn-ghost { color: #334155; font-weight: 600; text-decoration: none; padding: 8px 12px; transition: 0.2s; font-size: 0.95rem; font-family: 'Inter', sans-serif;}
                .btn-ghost:hover { color: #6366F1; background: rgba(99, 102, 241, 0.05); border-radius: 8px; }
                .btn-primary-small { background: #6366F1; color: white; padding: 8px 16px; border-radius: 10px; text-decoration: none; font-weight: 700; transition: 0.2s; font-size: 0.9rem; font-family: 'Inter', sans-serif;}
                .btn-primary-small:hover { background: #0F172A; }

                /* Burger Menu Ikon */
                .burger-toggle { display: none; cursor: pointer; font-size: 1.8rem; background: none; border: none; color: #0F172A; padding: 5px; }
                
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
                    overflow-y: auto; /* Tillad scroll hvis skærmen er lille */
                }
                .mobile-menu-overlay.active { transform: translateX(0); }
                
                .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; font-size: 1.1rem; font-weight: 600; }
                .mobile-nav-links a { text-decoration: none; color: #0F172A; border-bottom: 1px solid #f1f1f1; padding-bottom: 10px; display: block; }
                
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

        // 5. TILFØJ EVENT LISTENERS MANUELT (DETTE LØSER PROBLEMET)
        
        // Find elementerne
        const burgerBtn = this.querySelector('#burgerBtn');
        const logoutBtn = this.querySelector('#logoutBtn');

        // Tilføj klik-event til burger knappen
        if(burgerBtn) {
            burgerBtn.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Tilføj klik-event til log ud knappen (hvis den findes)
        if(logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await window._supabase.auth.signOut();
                location.reload();
            });
        }
    }

    toggleMenu() {
        const menu = this.querySelector('#mobileMenu');
        const icon = this.querySelector('#burgerIcon');
        
        // Tjek om menuen er åben
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            menu.classList.remove('active');
            icon.innerHTML = '☰'; 
            document.body.style.overflow = ''; // Tillad scroll igen
        } else {
            menu.classList.add('active');
            icon.innerHTML = '✕'; 
            document.body.style.overflow = 'hidden'; // Lås scroll på baggrunden mens menu er åben
        }
    }
}

customElements.define('hoppon-header', HoppOnHeader);
customElements.define('hoppon-footer', HoppOnFooter);
