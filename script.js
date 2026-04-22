// Variables from data.js: WIKI_DATA, CATEGORIES

// --- Neural Canvas Background ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 160;
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x, dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) { this.x -= dx * 0.05; this.y -= dy * 0.05; }
        }
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.6)'; ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < CONNECTION_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - distance / CONNECTION_DISTANCE)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
initParticles(); animateParticles();
// --------------------------------
// --- Ambient Audio Logic ---
// --------------------------------
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeSlider = document.getElementById('volumeSlider');
let isAudioInitialized = false;

function initAudio() {
    if (isAudioInitialized) return;
    
    // Load saved volume or default up to 0.3
    const savedVol = localStorage.getItem('eclipse_volume');
    const initialVol = savedVol !== null ? parseFloat(savedVol) : 0.3;
    bgMusic.volume = initialVol;
    if (volumeSlider) volumeSlider.value = initialVol;
    
    const playAttempt = bgMusic.play();
    if (playAttempt !== undefined) {
        playAttempt.then(() => {
            isAudioInitialized = true;
            musicToggle.classList.add('playing');
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        }).catch(error => {
            console.log("Autoplay blocked, waiting for interaction.");
        });
    }
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        localStorage.setItem('eclipse_audio', 'on');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        localStorage.setItem('eclipse_audio', 'off');
    }
}

if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isAudioInitialized) {
            isAudioInitialized = true;
            bgMusic.volume = volumeSlider ? volumeSlider.value : 0.3;
            bgMusic.play();
            musicToggle.classList.add('playing');
            localStorage.setItem('eclipse_audio', 'on');
            document.removeEventListener('click', initAudio);
        } else {
            toggleMusic();
        }
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        bgMusic.volume = val;
        localStorage.setItem('eclipse_volume', val);
        
        // Auto-initialize if moving slider
        if (!isAudioInitialized && val > 0) {
            initAudio();
        }
    });
}

// Global listeners for first interaction
document.addEventListener('click', initAudio);
document.addEventListener('keydown', initAudio);

// Check preference on load
window.addEventListener('DOMContentLoaded', () => {
    const audioPref = localStorage.getItem('eclipse_audio');
    const savedVol = localStorage.getItem('eclipse_volume');
    if (savedVol !== null && volumeSlider) {
        volumeSlider.value = savedVol;
        bgMusic.volume = savedVol;
    }
    
    if (audioPref === 'off') {
        // Stay paused
    }
});
// --------------------------------

// --- Localization Logic ---
let currentLang = localStorage.getItem('eclipse_lang') || 'en';

function getT(key) {
    if (!window.TRANSLATIONS) return key;
    return window.TRANSLATIONS[currentLang][key] || window.TRANSLATIONS['en'][key] || key;
}

function updateUIStrings() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = getT('search_placeholder');
    
    // Sidebar footer
    const footerLines = document.querySelectorAll('.sidebar-footer p');
    if (footerLines.length >= 2) {
        footerLines[0].innerHTML = `<strong>${getT('system_status')}:</strong> ${getT('online')}`;
        footerLines[1].textContent = getT('data_source');
    }

    // Breadcrumbs
    const dbSpan = document.querySelector('.breadcrumbs span:first-child');
    if (dbSpan) dbSpan.textContent = getT('database');
    
    const indexSpan = document.getElementById('current-category');
    if (indexSpan && indexSpan.textContent === 'INDEX') indexSpan.textContent = getT('index');

    // Refresh current article if open
    if (window.currentDrug) {
        loadArticle(window.currentDrug.id);
    } else {
        updateWelcomeScreen();
    }

    // Update custom lang selector text
    const selectedValue = document.getElementById('langSelectedValue');
    if (selectedValue) selectedValue.innerText = currentLang.toUpperCase();
}

// Merge external translations into WIKI_DATA
function mergeTranslations() {
    if (!window.DRUG_I18N) return;
    
    function deepMerge(target, source, lang) {
        Object.keys(source).forEach(field => {
            if (typeof source[field] === 'object' && source[field] !== null && !Array.isArray(source[field])) {
                // If it's an object (like experimental), we store it as field_lang
                target[`${field}_${lang}`] = source[field];
            } else {
                target[`${field}_${lang}`] = source[field];
            }
        });
    }

    window.WIKI_DATA.forEach(item => {
        const trans = window.DRUG_I18N[item.id];
        if (trans) {
            Object.keys(trans).forEach(lang => {
                deepMerge(item, trans[lang], lang);
            });
        }
    });
}

// Note: Security protocol decommissioned for rollback
function startSystemBoot() {
    const mount = document.getElementById('article-mount');
    const sidebar = document.querySelector('.sidebar');
    if (!mount) return;

    // Intensify Background Particles
    if (window.particleScene) {
        window.particleCount = 400; // Boost density
        // Logic to refresh particles if available
    }

    // Phase 1: Global Neural Overlay
    const overlay = document.createElement('div');
    overlay.className = 'global-neural-overlay';
    overlay.innerHTML = `
        <div class="scan-line-v"></div>
        <div class="corner-frame top-left"></div>
        <div class="corner-frame top-right"></div>
        <div class="corner-frame bottom-left"></div>
        <div class="corner-frame bottom-right"></div>
        <div class="neural-data-left">NODE_ID: 0x882<br>LATENCY: 12ms<br>ENCRYPTION: AES-512</div>
        <div class="neural-data-right">BIOTECH_CORE_STABLE<br>TEMP: 32°C<br>FAN_RPM: 4200</div>
    `;
    document.body.appendChild(overlay);

    // Phase 2: Cinematic Splash
    mount.innerHTML = `
        <div class="system-splash">
            <div class="splash-logo">
                <span class="glitch-logo" data-text="ECLIPSE">ECLIPSE</span>
                <span class="splash-sub">BIOTECH_CORE_v4.0</span>
            </div>
            <div class="splash-rings">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
            </div>
            <div class="splash-particles" id="splash-canvas"></div>
        </div>
    `;

    setTimeout(() => {
        // Phase 3: Technical Boot Log
        mount.innerHTML = `
            <div class="boot-sequence">
                <div class="boot-log-wrap">
                    <div class="boot-log-header">CRITICAL_BOOT_SEQUENCE // KERNEL_STABLE</div>
                    <div class="boot-log" id="boot-log"></div>
                    <div class="boot-loader">
                        <div class="loader-bar" id="loader-bar"></div>
                    </div>
                </div>
            </div>
        `;
        
        const logs = [
            "INITIALIZING_KERNEL_0x882",
            "DECRYPTING_PHARMA_INDEX",
            "ESTABLISHING_NEURAL_LINK",
            "SYNCING_CLINICAL_ASSETS",
            "BYPASSING_DECOMMISSIONED_GATE",
            "LOADING_ECLIPSE_AI_CORE",
            "SYSTEM_STABILIZED_READY"
        ];

        const logEl = document.getElementById('boot-log');
        const barEl = document.getElementById('loader-bar');
        let step = 0;

        const interval = setInterval(() => {
            if (step < logs.length) {
                const entry = document.createElement('div');
                entry.className = 'boot-entry';
                entry.innerText = `> ${logs[step]}`;
                logEl.appendChild(entry);
                barEl.style.width = `${((step + 1) / logs.length) * 100}%`;
                step++;
                logEl.scrollTop = logEl.scrollHeight;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 1000);
                    initApp();
                }, 500);
            }
        }, 200); // Fast technical log
    }, 2500); // Splash screen duration
}

function initApp() {
    mergeTranslations();
    updateUIStrings();
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }
    
    renderSidebar();
    
    // Smoothly reveal the app
    const appWindow = document.querySelector('.app-window');
    if (appWindow) {
        appWindow.style.opacity = '1';
        appWindow.style.filter = 'blur(0)';
    }

    goHome();

    // Persistent Identity Awareness
    const visitCount = parseInt(localStorage.getItem('biotech_visits') || "0");
    const isReturning = visitCount > 0;
    localStorage.setItem('biotech_visits', visitCount + 1);

    // Update Welcome Screen with Identity Greeting
    const welcomeTitle = document.querySelector('.empty-state h2');
    const welcomeText = document.querySelector('.empty-state p');
    if (welcomeTitle) {
        welcomeTitle.innerText = isReturning ? "WELCOME BACK, ADMIN" : "WELCOME, NEW SUBJECT";
        welcomeTitle.setAttribute('data-text', welcomeTitle.innerText);
    }
    if (welcomeText && isReturning) {
        welcomeText.innerText = "Your previous research sessions have been synchronized. The biotech databank is ready for further inquiries.";
    }
}

// Initial UI setup
document.addEventListener('DOMContentLoaded', () => {
    // Hide app window for boot sequence
    const appWindow = document.querySelector('.app-window');
    if (appWindow) {
        appWindow.style.opacity = '0';
        appWindow.style.filter = 'blur(20px)';
        appWindow.style.transition = 'all 1s ease';
    }

    startSystemBoot();
    
    // Custom Dropdown Logic
    const customSelect = document.getElementById('langCustomSelect');
    const selectedValue = document.getElementById('langSelectedValue');
    const options = document.querySelectorAll('.lang-option');

    if (customSelect && selectedValue) {
        selectedValue.innerText = currentLang.toUpperCase();
        
        // Mark active
        options.forEach(opt => {
            if (opt.dataset.value === currentLang) opt.classList.add('active');
        });

        customSelect.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelect.classList.toggle('active');
        });

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                const val = opt.dataset.value;
                currentLang = val;
                localStorage.setItem('eclipse_lang', currentLang);
                selectedValue.innerText = currentLang.toUpperCase();
                
                options.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                
                updateUIStrings();
                renderSidebar(searchInput.value);
                
                customSelect.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', () => {
            customSelect.classList.remove('active');
        });
    }

    // Sidebar Toggle Logic (TAB Key & Mobile Toggle)
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (sidebar) sidebar.classList.toggle('collapsed');
        });
    }

    const sidebarClose = document.getElementById('sidebar-close');
    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            if (sidebar) sidebar.classList.add('collapsed');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault(); // Prevent focus switching
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        }
    });

    // --- Draggable Mobile Sidebar Interaction ---
    let touchStartX = 0;
    let isDraggingSidebar = false;
    const sidebarEdgeThreshold = 40; // Zone for edge swipe

    document.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 900) return; // Only on mobile/tablet
        
        const touchX = e.touches[0].clientX;
        const isCollapsed = sidebar.classList.contains('collapsed');
        
        // Start dragging if:
        // 1. Sidebar is collapsed AND touch is near the left edge
        // 2. Sidebar is NOT collapsed AND touch is ON the sidebar
        if (isCollapsed && touchX < sidebarEdgeThreshold) {
            touchStartX = touchX;
            isDraggingSidebar = true;
            sidebar.classList.add('dragging');
        } else if (!isCollapsed) {
            const rect = sidebar.getBoundingClientRect();
            if (touchX <= rect.right) {
                touchStartX = touchX;
                isDraggingSidebar = true;
                sidebar.classList.add('dragging');
            }
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isDraggingSidebar) return;
        
        const touchX = e.touches[0].clientX;
        const isCollapsed = sidebar.classList.contains('collapsed');
        const sidebarWidth = sidebar.getBoundingClientRect().width;
        
        let deltaX = touchX - touchStartX;
        let translate = 0;

        if (isCollapsed) {
            // Dragging to open: translate from -sidebarWidth to 0
            translate = Math.min(0, -sidebarWidth + deltaX);
        } else {
            // Dragging to close: translate from 0 to -sidebarWidth
            translate = Math.min(0, Math.max(-sidebarWidth, deltaX));
        }

        sidebar.style.transform = `translateX(${translate}px)`;
    }, { passive: false }); // Need passive: false to prevent potential scrolling issues during drag

    document.addEventListener('touchend', (e) => {
        if (!isDraggingSidebar) return;
        
        isDraggingSidebar = false;
        sidebar.classList.remove('dragging');
        sidebar.style.transform = ''; 

        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        const sidebarWidth = sidebar.getBoundingClientRect().width;
        const threshold = sidebarWidth / 4; // 25% threshold to commit the action

        const isCollapsed = sidebar.classList.contains('collapsed');

        if (isCollapsed) {
            if (deltaX > threshold) {
                sidebar.classList.remove('collapsed');
            }
        } else {
            if (deltaX < -threshold) {
                sidebar.classList.add('collapsed');
            }
        }
    });
});

function updateWelcomeScreen() {
    const mount = document.getElementById('article-mount');
    if (!mount) return;
    const emptyState = mount.querySelector('.empty-state');
    if (emptyState) {
        const glitchSmall = emptyState.querySelector('.glitch-small');
        if (glitchSmall) {
            glitchSmall.textContent = getT('awaiting_input');
            glitchSmall.setAttribute('data-text', getT('awaiting_input'));
        }
        const p = emptyState.querySelector('p');
        if (p) p.textContent = getT('welcome_desc');
    }
}

window.goHome = function() {
    window.currentActiveItem = null;
    window.currentDrug = null;
    
    // Reset Sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('current-category').innerText = getT('index').toUpperCase();

    // Reset Article Mount to Welcome Screen
    const mount = document.getElementById('article-mount');
    mount.innerHTML = `
        <div class="empty-state">
            <div class="glitch-icon">⚗</div>
            <h2 class="glitch-small" data-text="${getT('awaiting_input')}">${getT('awaiting_input')}</h2>
            <p style="max-width: 400px; line-height: 1.6;">${getT('welcome_desc')}</p>
        </div>
    `;
};
// -------------------------

// Render Sidebar
const navEl = document.getElementById('sidebar-nav');
const searchInput = document.getElementById('searchInput');

function renderSidebar(filter = '') {
    navEl.innerHTML = '';
    
    // Add Dynamic Compounds
    for (const [catKey, catData] of Object.entries(CATEGORIES)) {
        const items = WIKI_DATA.filter(item => 
            item.category === catKey && 
            (item.name.toLowerCase().includes(filter.toLowerCase()) || 
             item.id.toLowerCase().includes(filter.toLowerCase()) ||
             (item.folder && item.folder.toLowerCase().includes(filter.toLowerCase())))
        );

        if (items.length > 0) {
            const header = document.createElement('div');
            header.className = 'nav-category';
            
            // Centralized category localization
            const catName = getT(`cat_${catKey}`) !== `cat_${catKey}` ? getT(`cat_${catKey}`) : catData.name;
            
            header.innerText = catName;
            navEl.appendChild(header);

            // Group by Folder
            const folders = {};
            const standalone = [];
            
            items.forEach(item => {
                if (item.folder) {
                    if (!folders[item.folder]) folders[item.folder] = [];
                    folders[item.folder].push(item);
                } else {
                    standalone.push(item);
                }
            });

            // Render Nav Item Helper
            const renderNavItem = (item, parentEl, isSub = false) => {
                const navItemWrapper = document.createElement('div');
                navItemWrapper.className = 'nav-item-wrapper';
                
                const navItem = document.createElement('div');
                navItem.className = 'nav-item' + (isSub ? ' sub-item' : '');
                const localizedName = item[`name_${currentLang}`] || item.name;
                navItem.innerText = localizedName + (item.status === 'discontinued' ? ' ⚠️' : '');
                navItem.dataset.id = item.id;
                navItem.onclick = () => loadArticle(item.id);
                
                const aiBtn = document.createElement('button');
                aiBtn.className = 'ai-quick-btn';
                aiBtn.innerHTML = '<i class="fas fa-robot"></i>';
                aiBtn.title = `Ask Eclipse about ${item.name}`;
                aiBtn.onclick = (e) => {
                    e.stopPropagation();
                    triggerAIExplain(item.name);
                };

                navItemWrapper.appendChild(navItem);
                navItemWrapper.appendChild(aiBtn);
                parentEl.appendChild(navItemWrapper);
            };

            // Render Standalone
            standalone.forEach(item => renderNavItem(item, navEl));

            // Render Folders
            for (const [folderName, folderItems] of Object.entries(folders)) {
                const folderDiv = document.createElement('div');
                folderDiv.className = 'nav-folder' + (filter === '' ? ' collapsed' : '');
                
                const folderHead = document.createElement('div');
                folderHead.className = 'nav-folder-head';
                folderHead.innerHTML = `<span>📁 ${folderName}</span> <span class="arrow">▼</span>`;
                folderHead.onclick = () => folderDiv.classList.toggle('collapsed');
                
                const folderContent = document.createElement('div');
                folderContent.className = 'nav-folder-content';
                
                folderItems.forEach(item => renderNavItem(item, folderContent, true)); // True means sub-item
                
                folderDiv.appendChild(folderHead);
                folderDiv.appendChild(folderContent);
                navEl.appendChild(folderDiv);
            }
        }
    }

    // Add UI/AI Utilities
    if (filter === '') {
        const sysHeader = document.createElement('div');
        sysHeader.className = 'nav-category';
        sysHeader.innerText = 'SYSTEM UTILITIES';
        sysHeader.style.color = 'var(--accent2)';
        navEl.appendChild(sysHeader);

        const aiBtn = document.createElement('div');
        aiBtn.className = 'nav-item';
        aiBtn.innerText = '> _ECLIPSE_AI';
        aiBtn.id = 'ai-nav-btn';
        aiBtn.style.color = 'var(--accent)';
        aiBtn.onclick = () => loadAIView();
        navEl.appendChild(aiBtn);

        const coachBtn = document.createElement('div');
        coachBtn.className = 'nav-item';
        coachBtn.innerText = '> _CYCLE_ARCHITECT';
        coachBtn.id = 'coach-nav-btn';
        coachBtn.style.color = 'var(--accent2)';
        coachBtn.onclick = () => loadCoachView();
        navEl.appendChild(coachBtn);

        const pathologyBtn = document.createElement('div');
        pathologyBtn.className = 'nav-item';
        pathologyBtn.innerText = '> _PATHOLOGY_SOLVER';
        pathologyBtn.id = 'pathology-nav-btn';
        pathologyBtn.style.color = '#ff9d00'; // Amber/Gold for clinical look
        pathologyBtn.onclick = () => loadPathologyView();
        navEl.appendChild(pathologyBtn);

        const finderBtn = document.createElement('div');
        finderBtn.className = 'nav-item';
        finderBtn.innerText = '> _QUICK_FINDER';
        finderBtn.id = 'finder-nav-btn';
        finderBtn.style.color = '#00ffaa'; // Neon Green for recommendation
        finderBtn.onclick = () => loadQuickFinderView();
        navEl.appendChild(finderBtn);

        const synthesisBtn = document.createElement('div');
        synthesisBtn.className = 'nav-item';
        synthesisBtn.innerText = '> _SYNTHESIS_ORACLE';
        synthesisBtn.id = 'synthesis-nav-btn';
        synthesisBtn.style.color = '#bf00ff';
        synthesisBtn.onclick = () => loadSynthesisView();
        navEl.appendChild(synthesisBtn);

        const labBtn = document.createElement('div');
        labBtn.className = 'nav-item';
        labBtn.innerText = '> _LAB_VERIFIER';
        labBtn.id = 'lab-nav-btn';
        labBtn.style.color = '#00ff00';
        labBtn.onclick = () => loadLabVerifierView();
        navEl.appendChild(labBtn);

        const logBtn = document.createElement('div');
        logBtn.className = 'nav-item';
        logBtn.innerText = '> _SYSTEM_LOGS';
        logBtn.id = 'logs-nav-btn';
        logBtn.style.color = '#ff9d00'; // Amber for system logs
        logBtn.onclick = () => loadChangelogView();
        navEl.appendChild(logBtn);
    }
}

// Load AI View
function loadAIView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('ai-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "BIOTECH ASSISTANT";

    const mount = document.getElementById('article-mount');
    
    mount.innerHTML = `
        <div class="ai-chat-container">
            <div class="ai-header">
                <h2><span class="glitch" data-text="ECLIPSE AI">ECLIPSE AI</span> ENGINE v1.0</h2>
                <p>Query the Eclipse Biotech databanks regarding pharmacology, interactions, and kinetics.</p>
            </div>
            
            <div class="chat-history" id="chatHistory">
                <div class="chat-msg ai">
                    <div class="msg-sender">ECLIPSE_AI</div>
                    <div class="msg-text">Eclipse Biotech databanks connected. I can analyze profiles for ${WIKI_DATA.length} compounds. What do you need to know?</div>
                </div>
            </div>

            <div class="chat-input-area">
                <input type="text" id="aiChatInput" placeholder="Ask about risks, mechanisms, or protocols..." autocomplete="off">
                <button class="cyber-btn" onclick="submitAIQuery()" style="margin-top: 0; width: 120px; font-size: 12px; padding: 0;">TRANSMIT</button>
            </div>
        </div>
    `;

    setTimeout(() => { 
        const inputEl = document.getElementById('aiChatInput');
        if (inputEl) {
            inputEl.focus(); 
            inputEl.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') submitAIQuery();
            });
        }
    }, 100);
}

// --- AI Cortex Engine Implementation (v3.0) ---
let aiSession = {
    lastCompound: null,
    forcedCompound: null,
    history: []
};

function generateThoughtLog(query) {
    const steps = [
        "INITIALIZING_NEURAL_ROUTINE",
        "DECRYPTING_USER_INPUT",
        "MAPPING_BIOCHEMICAL_SPACE",
        "FILTERING_PHARMACOLOGICAL_DATA",
        "ANALYZING_KINETIC_TRAJECTORY",
        "CROSS_REFERENCING_TOXICITY_MARKERS",
        "FETCHING_CLINICAL_ASSETS",
        "SYNTHESIZING_RESPONSE_MATRIX"
    ];
    // Randomize 3-5 steps
    const count = 3 + Math.floor(Math.random() * 3);
    const shuffled = steps.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

window.submitAIQuery = function() {
    try {
        const input = document.getElementById('aiChatInput');
        const query = input.value.trim();
        if(!query) return;

        const history = document.getElementById('chatHistory');
        if(!history) return;
        
        // Add User Message
        history.insertAdjacentHTML('beforeend', `
            <div class="chat-msg user">
                <div class="msg-sender">USER</div>
                <div class="msg-text">${query}</div>
            </div>
        `);

        input.value = '';
        history.scrollTop = history.scrollHeight;

        // Show Thinking / Thought Log
        const typingId = 'typing_' + Date.now();
        const thoughtLog = generateThoughtLog(query);
        
        history.insertAdjacentHTML('beforeend', `
            <div class="chat-msg ai thinking" id="${typingId}">
                <div class="msg-sender">ECLIPSE_AI</div>
                <div class="thought-log" id="${typingId}_log"></div>
                <div class="msg-text typing">PROCESSING<span>.</span><span>.</span><span>.</span></div>
            </div>
        `);
        history.scrollTop = history.scrollHeight;

        // Simulate thinking steps
        const logEl = document.getElementById(`${typingId}_log`);
        let stepIdx = 0;
        
        const logInterval = setInterval(() => {
            try {
                if (stepIdx < thoughtLog.length) {
                    if (logEl) logEl.insertAdjacentHTML('beforeend', `<div>> ${thoughtLog[stepIdx]}</div>`);
                    stepIdx++;
                    history.scrollTop = history.scrollHeight;
                } else {
                    clearInterval(logInterval);
                    finishAIResponse(query, typingId);
                }
            } catch (err) {
                console.error("AI Thought Log Failure:", err);
                clearInterval(logInterval);
            }
        }, 300 + Math.random() * 300);
    } catch (e) {
        console.error("AI Submission Failure:", e);
    }
}

function finishAIResponse(query, typingId) {
    try {
        const history = document.getElementById('chatHistory');
        const typingEl = document.getElementById(typingId);
        if(typingEl) typingEl.remove();

        const response = generateAIResponse(query);
        if (history) {
            history.insertAdjacentHTML('beforeend', `
                <div class="chat-msg ai">
                    <div class="msg-sender">ECLIPSE_AI</div>
                    <div class="msg-text">${response}</div>
                    <div class="msg-actions">
                        <button class="action-btn" onclick="copyToClipboard(this)">COPY_REPORT</button>
                        <button class="action-btn" onclick="triggerAIExplain('${aiSession.lastCompound ? aiSession.lastCompound.name : ''}')">DEEP_DIVE</button>
                    </div>
                </div>
            `);
            history.scrollTop = history.scrollHeight;
        }
    } catch (e) {
        console.error("AI Response Finishing Failure:", e);
    }
}

window.copyToClipboard = function(btn) {
    const text = btn.closest('.chat-msg').querySelector('.msg-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerText;
        btn.innerText = 'COPIED!';
        btn.style.color = 'var(--green)';
        setTimeout(() => {
            btn.innerText = original;
            btn.style.color = '';
        }, 2000);
    });
}

const COMPOUND_ALIASES = {
    'tren': 'trenbolone',
    'test': 'testosterone',
    'winny': 'stanozolol',
    'winstrol': 'stanozolol',
    'anavar': 'oxandrolone',
    'var': 'oxandrolone',
    'dbol': 'methandrostenolone',
    'dianabol': 'methandrostenolone',
    'deca': 'nandrolone',
    'primo': 'methenolone',
    'mast': 'drostanolone',
    'halo': 'fluoxymesterone',
    'abombs': 'oxymetholone',
    'adrol': 'oxymetholone',
    'hgh': 'somatropin',
    'gh': 'somatropin',
    'slin': 'insulin',
    'aromasin': 'exemestane',
    'arimidex': 'anastrozole',
    'sdrol': 'methasterone',
    'tbol': 'turinabol',
    'npp': 'nandrolone_npp',
    'aya': 'ayahuasca'
};

function triggerAIExplain(compoundName) {
    // Switch to AI View
    loadAIView();
    
    // Slight delay to ensure DOM is ready
    setTimeout(() => {
        const input = document.getElementById('aiChatInput');
        if (input) {
            // Trim and ensure pure string
            const cleanName = compoundName.trim();
            aiSession.forcedCompound = cleanName;
            input.value = `Explain the pharmacological profile, risks, and clinical use of ${cleanName}.`;
            submitAIQuery();
        }
    }, 200);
}

function generateAIResponse(q) {
    let query = q.toLowerCase().replace(/[?.,!]/g, '');
    let identifiedCompound = null;
    let originalTerm = '';

    // Step -1: Forced Override (For button triggers)
    if (aiSession.forcedCompound) {
        const forced = aiSession.forcedCompound.toLowerCase();
        identifiedCompound = WIKI_DATA.find(c => c.name.toLowerCase() === forced || c.id.toLowerCase() === forced);
        if (identifiedCompound) originalTerm = identifiedCompound.name;
        aiSession.forcedCompound = null; // Clear after use
    }

    // Step 0: Priority Direct Match (Exactly matches name or ID)
    if (!identifiedCompound) {
        for (let c of WIKI_DATA) {
        const cName = c.name.toLowerCase();
        if (query.includes(cName) || query.includes(c.id.toLowerCase())) {
            identifiedCompound = c;
            originalTerm = c.name;
            break;
        }
    }
}

    // Step 1: Context Awareness (Follow-up handling)
    if (!identifiedCompound) {
        const isFollowup = query.match(/\bit\b|\bthat\b|\bthis\b/);
        const hasIntent = query.match(/dose|dosage|risk|side effect|mechanism|how does|mg|take|toxic|work/);
        
        if (isFollowup && hasIntent && aiSession.lastCompound) {
            identifiedCompound = aiSession.lastCompound;
            originalTerm = identifiedCompound.name + " (CONTEXTUAL_FOLLOW_UP)";
        }
    }

    // Step 2: Alias Resolution (If not already found by context)
    if (!identifiedCompound) {
        for (const [alias, full] of Object.entries(COMPOUND_ALIASES)) {
            if (query.match(new RegExp(`\\b${alias}\\b`))) {
                identifiedCompound = WIKI_DATA.find(c => c.id.includes(full) || c.name.toLowerCase().includes(full));
                originalTerm = alias.toUpperCase();
                break;
            }
        }
    }

    // Step 3: Direct hits
    if (!identifiedCompound) {
        for (let c of WIKI_DATA) {
            if (query.includes(c.name.toLowerCase()) || query.includes(c.id)) {
                identifiedCompound = c;
                originalTerm = c.name;
                break;
            }
        }
    }

    // Step 4: Fuzzy Matching
    if (!identifiedCompound) {
        const queryWords = query.split(' ');
        for (let word of queryWords) {
            if (word.length < 4) continue;
            for (let c of WIKI_DATA) {
                const name = c.name.toLowerCase();
                if (name.includes(word) || word.includes(name.substring(0, 4))) {
                    identifiedCompound = c;
                    originalTerm = word.toUpperCase() + "? (Assuming " + c.name + ")";
                    break;
                }
            }
            if (identifiedCompound) break;
        }
    }

    if (identifiedCompound) {
        aiSession.lastCompound = identifiedCompound; // Store for next turn
        const c = identifiedCompound;
        const msgHeader = `<div class="msg-meta">[TARGET: ${originalTerm}]</div>`;
        
        // --- New: Full Synthesis Deep Dive (ASK_ECLIPSE trigger) ---
        if (query.includes('pharmacological profile') || query.includes('clinical use') || (query.match(/explain|describe|tell me about|analyze/) && query.length > 20)) {
            let report = `${msgHeader}`;
            report += `<div class="ai-report-section">`;
            report += `<div class="report-header">[REPORT_SUMMARY]</div>`;
            report += `<p>${c.overview}</p>`;
            report += `</div>`;
            
            report += `<div class="ai-report-section">`;
            report += `<div class="report-header">[KINETIC_MECHANISM]</div>`;
            report += `<p><strong>Primary Function:</strong> ${c.primaryUses}<br><br>${c.mechanism}</p>`;
            report += `</div>`;
            
            report += `<div class="ai-report-section">`;
            report += `<div class="report-header">[PHYSIOLOGICAL_RISKS]</div>`;
            report += `<p style="color:var(--red)">${c.risks}</p>`;
            report += `</div>`;
            
            report += `<div class="ai-report-section">`;
            report += `<div class="report-header">[DOSAGE_METRICS]</div>`;
            report += `<p><strong>Clinical Baseline:</strong> ${c.dosage}<br><strong>Performance Observed:</strong> ${c.experimental.b} — ${c.experimental.a}</p>`;
            report += `</div>`;
            
            report += `<div class="ai-suggestion">Analysis complete. Would you like to cross-reference this profile with its respective cycle archetypes?</div>`;
            return report;
        }

        // Intent: Risks
        if (query.match(/side effect|risk|danger|safe|bad|harm|toxic/)) {
            return `${msgHeader}Analysis of <strong>${c.name}</strong> reveals the following physiological risks:<br><br><span style="color:var(--red)">${c.risks}</span><br><br><span class="ai-suggestion">Would you like me to analyze the specific cardiovascular impact zones for this compound?</span>`;
        }
        
        // Intent: Dosage
        if (query.match(/dose|dosage|how much|take|mg|range|amount/)) {
            return `${msgHeader}The clinical prescribed dosage for <strong>${c.name}</strong> is: ${c.dosage}. <br><br><span style="color:var(--muted)">Performance observation data suggests common ranges from ${c.experimental.b} to ${c.experimental.a}.</span><br><br><span class="ai-suggestion">Shall I cross-reference this with a typical beginner or advanced cycle protocol?</span>`;
        }
        
        // Intent: Mechanism
        if (query.match(/work|mechanism|how does|science|action/)) {
            return `${msgHeader}<strong>Mechanism of Action for ${c.name}:</strong> ${c.mechanism}<br><br><span class="ai-suggestion">Would you like to see the molecular synthesis blueprint for this substance?</span>`;
        }

        // Catch-all for drug identification
        return `${msgHeader}<strong>${c.name}</strong> (${c.type}) is primarily used for: ${c.primaryUses}. <br><br>${c.overview}`;
    }

    // Step 2: General queries
    if (query.match(/hello|hi|greetings|system/)) return "Greetings. I am the Eclipse Biotech internal assistant. How can I assist your research today?";
    if (query.match(/who represent|who are you|what are you/)) return "I am a simulated clinical AI (v3.0) embedded within the Eclipse Biotech databanks. I utilizing enhanced 'Cortex' modules for contextual reasoning.";
    if (query.match(/cycle|stack|recommend/)) return "I am restricted from providing performance-enhancing recommendations or stacking protocols. I can only provide explicitly documented clinical data and physiological risk assessments.";
    
    // Step 3: Failure
    const suggestions = ["Trenbolone", "Testosterone", "Anavar", "Clenbuterol", "HGH"];
    return `I could not identify a specific compound in your query. <br><br><span style="color:var(--muted)">TARGET_IDENTIFICATION_FAILED. Please specify a substance (e.g., "${suggestions[Math.floor(Math.random()*suggestions.length)]}").</span>`;
}

// Load Article into Main Mount
function loadArticle(id) {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.add('collapsed');
    }

    const item = WIKI_DATA.find(x => x.id === id);
    if (!item) return;

    window.currentDrug = item;
    window.currentActiveItem = id;

    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
        if(el.dataset.id === id) el.classList.add('active');
    });

    document.getElementById('current-category').innerText = CATEGORIES[item.category].name.toUpperCase();

    const mount = document.getElementById('article-mount');
    
    // Clear everything so we can swap between AI and Wiki views seamlessly
    mount.innerHTML = '';
    
    // Generate Pros/Cons and Cycle HTML if data exists
    const prosConsHTML = (item.benefits || item.risks) ? `
        <div class="pros-cons-grid">
            <div class="pro-con-box pro">
                <div class="box-header">+ ${currentLang === 'en' ? 'OBSERVED BENEFITS' : getT('status_safe').toUpperCase() + ' / ' + getT('dosage_clinical').toUpperCase()}</div>
                <div class="box-content">${item[`benefits_${currentLang}`] || item.benefits || getT('not_applicable')}</div>
            </div>
            <div class="pro-con-box con">
                <div class="box-header">- ${getT('risks').toUpperCase()}</div>
                <div class="box-content">${item[`risks_${currentLang}`] || item.risks || getT('not_applicable')}</div>
            </div>
        </div>
    ` : '';

    const cycleHTML = item.cycleExamples ? `
        <section class="cycle-archetypes">
            <h2>${getT('dosage_experimental')}</h2>
            <div class="disclaimer">${getT('experimental_warning')}</div>
            <p>${item[`cycleExamples_${currentLang}`] || item.cycleExamples}</p>
        </section>
    ` : '';

    // Logic for Hologram Asset Type
    let holoType = 'molecule';
    if (item.folder === 'Oral Anabolics' || item.id === 'oxandrolone' || item.id === 'stanozolol') holoType = 'pill';
    if (item.category === 'peptides' || item.folder === 'Growth Factors') holoType = 'dna';
    if (item.category === 'ancillaries' || item.folder === 'Sourcing & Cultivation Hubs') holoType = 'vial';

    const hologramHTML = `
        <div class="hologram-viewport">
            <div id="hologram-canvas-container"></div>
            <div class="hologram-grid-floor"></div>
            <div class="hologram-data-stream">
                ${getT('id_header')}: ${item.id.toUpperCase()}<br>
                GEO_TYPE: ${holoType.toUpperCase()}_MESH<br>
                AUTH: BIOTECH_ADMIN<br>
                STATUS: ${item.status.toUpperCase()}
            </div>
            <div class="hologram-scanline"></div>
            <div class="hologram-laser"></div>
            <div class="hologram-flare"></div>
        </div>
    `;

    const HTML = `
        <article class="wiki-article">
            <header class="article-header">
                <div class="header-main">
                    <h1>${item[`name_${currentLang}`] || item.name}</h1>
                    <button class="cyber-btn wiki-ai-consult" onclick="triggerAIExplain('${item[`name_${currentLang}`] || item.name}')">
                        <i class="fas fa-brain"></i> ${getT('ask_ai') || 'ASK_ECLIPSE'}
                    </button>
                </div>
                <div class="badges">
                    <span class="badge cat">${getT(item.type.toLowerCase()) || item.type}</span>
                    <span class="badge" style="${item.status === 'discontinued' ? 'color: var(--red); border-color: var(--red)' : ''}">${getT(item.status.toLowerCase()) || item.status.toUpperCase()}</span>
                    ${item.esters ? `<span class="badge" style="border-color: var(--accent2); color: var(--accent2)">${item[`esters_${currentLang}`] || item.esters.replace(/[\(\)]/g, '')}</span>` : ''}
                </div>
            </header>

            <div class="wiki-grid">
                <div class="wiki-main-col">
                    ${hologramHTML}
                    <section style="margin-top: 30px;">
                        <h2>${getT('overview')}</h2>
                        <p>${item[`overview_${currentLang}`] || item.overview}</p>
                    </section>
                    
                    <section>
                        <h2>${getT('mechanism')}</h2>
                        <p>${item[`mechanism_${currentLang}`] || item.mechanism}</p>
                    </section>

                    ${item.synthesis ? `
                    <section>
                        <h2>${getT('synthesis')}</h2>
                        <p>${item[`synthesis_${currentLang}`] || item.synthesis}</p>
                    </section>
                    ` : ''}

                    ${item.aestheticProfile ? `
                    <section class="aesthetic-section">
                        <h2><i class="fas fa-eye"></i> ${getT('aesthetic_profile')}</h2>
                        <div class="aesthetic-card">
                            <p>${item[`aestheticProfile_${currentLang}`] || item.aestheticProfile}</p>
                        </div>
                    </section>
                    ` : ''}

                    ${item.physiologicalTargets ? `
                    <section class="targets-section">
                        <h2><i class="fas fa-bullseye"></i> ${getT('physiological_targets')}</h2>
                        <div class="targets-card">
                            <p>${item[`physiologicalTargets_${currentLang}`] || item.physiologicalTargets}</p>
                        </div>
                    </section>
                    ` : ''}

                    ${item.sensoryImpact ? `
                    <section class="sensory-section">
                        <h2><i class="fas fa-brain"></i> ${getT('sensory_impact')}</h2>
                        <div class="sensory-card">
                            <p>${item[`sensoryImpact_${currentLang}`] || item.sensoryImpact}</p>
                        </div>
                    </section>
                    ` : ''}

                    ${prosConsHTML}
                    ${cycleHTML}
                </div>

                <aside class="wiki-side-col">
                    <div class="data-panel">
                        <div class="data-panel-header">${getT('clinical_profile')} / ${getT('id_header')}</div>
                        
                        <div class="data-box">
                            <div class="data-box-label">${getT('primary_uses')}</div>
                            <div class="data-box-value">${item[`primaryUses_${currentLang}`] || item.primaryUses}</div>
                        </div>

                        <div class="data-box" style="border-left: 3px solid var(--accent); background: rgba(0,240,255,0.05)">
                            <div class="data-box-label" style="color: var(--accent)">${getT('dosage_clinical')}</div>
                            <div class="data-box-value">${item[`dosage_${currentLang}`] || item.dosage}</div>
                        </div>

                        <div class="data-panel-header" style="background: rgba(181, 255, 77, 0.05); border-top: 1px solid var(--border); color: var(--accent2)">${getT('dosage_experimental').toUpperCase()}</div>
                        <div class="data-box" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border-bottom: 1px solid var(--border2);">
                            <div>
                                <div class="data-box-label">${getT('exp_beginner')}</div>
                                <div class="data-box-value" style="color: var(--accent2)">
                                    ${(() => {
                                        const exp = item[`experimental_${currentLang}`] || item.experimental;
                                        if (!exp || !exp.b || exp.b === 'N/A') return getT('not_applicable');
                                        return exp.b;
                                    })()}
                                </div>
                            </div>
                            <div>
                                <div class="data-box-label">${getT('exp_advanced')}</div>
                                <div class="data-box-value" style="color: var(--accent2)">
                                    ${(() => {
                                        const exp = item[`experimental_${currentLang}`] || item.experimental;
                                        if (!exp || !exp.a || exp.a === 'N/A') return getT('not_applicable');
                                        return exp.a;
                                    })()}
                                </div>
                            </div>
                        </div>
                        <div style="padding: 10px 20px; font-size: 9px; color: var(--muted); font-family: var(--font-m); line-height: 1.4;">
                            ${getT('experimental_warning')}
                        </div>
                    </div>

                    <div class="heat-map-panel" id="heat-map-panel">
                        <div class="impact-data">
                            <div class="heat-map-header">${getT('impact_analysis')}</div>
                            <div id="impact-zones-list"></div>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    `;
    
    mount.innerHTML = HTML;
    mount.scrollTo(0, 0);

    // Initialize 3D Mesh
    setTimeout(() => {
        initHologram(holoType);
        updateHeatMap(item);
    }, 50);
}

// Search Listener
searchInput.addEventListener('input', (e) => {
    renderSidebar(e.target.value);
});

// -------------------------
// Initialization
// -------------------------

let customStack = [];

// Load Cycle Coach View
function loadCoachView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('coach-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "AI CYCLE ARCHITECT";

    const mount = document.getElementById('article-mount');
    
    mount.innerHTML = `
        <div class="cycle-generator-view">
            <div class="coach-tabs">
                <button class="coach-tab active" id="tab-ai" onclick="switchCoachMode('ai')">AI_ARCHITECT</button>
                <button class="coach-tab" id="tab-manual" onclick="switchCoachMode('manual')">MANUAL_LABORATORY</button>
            </div>

            <div id="ai-mode-container">
                <h1><i class="fas fa-robot"></i> Eclipse Cycle Architect</h1>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 25px; line-height: 1.6;">Enter biological parameters. The Cortex AI will architect a physiologically calculated protocol.</p>
                
                <div class="generator-form">
                    <div class="form-group">
                        <label>Age</label>
                        <input type="number" id="gen-age" placeholder="25" min="18">
                    </div>
                    <div class="form-group">
                        <label>Weight (lbs)</label>
                        <input type="number" id="gen-weight" placeholder="185">
                    </div>
                    <div class="form-group">
                        <label>Bodyfat %</label>
                        <input type="number" id="gen-bf" placeholder="15">
                    </div>
                    <div class="form-group">
                        <label>Experience</label>
                        <select id="gen-exp">
                            <option value="virgin">First Cycle</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label>Primary Goal</label>
                        <select id="gen-goal">
                            <option value="bulk">Maximum Hypertrophy</option>
                            <option value="cut">Fat Loss / Conditioning</option>
                            <option value="recomp">Recomposition</option>
                        </select>
                    </div>
                    <button id="generate-btn" class="cyber-btn" style="grid-column: 1 / -1; border-color: var(--accent2); color: var(--accent2); margin-top:10px;">GENERATE_PROTOCOL</button>
                    <button id="download-protocol-btn" class="cyber-btn" style="grid-column: 1 / -1; border-color: var(--muted); color: var(--muted); margin-top:5px; display: none;" onclick="downloadProtocol()">EXPORT_TO_DATA_LOG</button>
                </div>
                </div>
                <div id="cycle-result" class="cycle-result"></div>
            </div>

            <div id="manual-mode-container" style="display: none;">
                <h1><i class="fas fa-flask"></i> Custom Protocol Laboratory</h1>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 25px;">Design your own clinical stack. The Cortex AI will analyze your selections for physiological hazards and conflicts.</p>
                
                <div class="manual-lab-grid">
                    <div class="lab-workspace">
                        <div class="lab-header">ACTIVE_PROTOCOL_STACK</div>
                        <div id="custom-stack-display" class="custom-stack-display">
                            <!-- Populated dynamically -->
                            <div class="empty-lab-msg">Laboratory tray is empty. Add substances from the databank below.</div>
                        </div>
                        <div id="stack-analysis" class="stack-analysis-panel" style="display:none;"></div>
                    </div>
                    
                    <aside class="lab-picker">
                        <div class="lab-header">SUBSTANCE_DATABANK</div>
                        <div class="lab-search">
                            <input type="text" id="lab-search-input" placeholder="Search compounds..." oninput="filterLabPicker()">
                        </div>
                        <div id="lab-picker-list" class="lab-picker-list">
                            <!-- Populated by JS -->
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    `;

    document.getElementById('generate-btn').addEventListener('click', generateCycle);
    renderLabPicker();
}

window.switchCoachMode = function(mode) {
    const aiCont = document.getElementById('ai-mode-container');
    const manualCont = document.getElementById('manual-mode-container');
    const tabAi = document.getElementById('tab-ai');
    const tabManual = document.getElementById('tab-manual');

    if (mode === 'ai') {
        aiCont.style.display = 'block';
        manualCont.style.display = 'none';
        tabAi.classList.add('active');
        tabManual.classList.remove('active');
    } else {
        aiCont.style.display = 'none';
        manualCont.style.display = 'block';
        tabAi.classList.remove('active');
        tabManual.classList.add('active');
        renderCustomStack();
    }
}

window.renderLabPicker = function() {
    const picker = document.getElementById('lab-picker-list');
    if (!picker) return;
    
    picker.innerHTML = WIKI_DATA.map(compound => `
        <div class="lab-picker-item" onclick="addCompoundToStack('${compound.id}')">
            <div class="picker-item-info">
                <span class="picker-name">${compound.name}</span>
                <span class="picker-cat">${compound.type}</span>
            </div>
            <div class="picker-add">+</div>
        </div>
    `).join('');
}

window.filterLabPicker = function() {
    const query = document.getElementById('lab-search-input').value.toLowerCase();
    const items = document.querySelectorAll('.lab-picker-item');
    items.forEach(item => {
        const text = item.querySelector('.picker-name').innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

window.addCompoundToStack = function(id) {
    const compound = WIKI_DATA.find(c => c.id === id);
    if (!compound) return;
    
    // Check if already added
    if (customStack.find(s => s.id === id)) return;

    customStack.push({
        id: compound.id,
        name: compound.name,
        type: compound.type,
        dosage: 500,
        weeks: 12
    });

    renderCustomStack();
}

window.removeCompoundFromStack = function(id) {
    customStack = customStack.filter(s => s.id !== id);
    renderCustomStack();
}

window.updateStackDosage = function(id, val) {
    const item = customStack.find(s => s.id === id);
    if (item) item.dosage = val;
    validateCustomStack();
}

window.updateStackWeeks = function(id, val) {
    const item = customStack.find(s => s.id === id);
    if (item) item.weeks = val;
    validateCustomStack();
}

window.renderCustomStack = function() {
    const display = document.getElementById('custom-stack-display');
    if (!display) return;

    if (customStack.length === 0) {
        display.innerHTML = `<div class="empty-lab-msg">Laboratory tray is empty. Add substances from the databank below.</div>`;
        document.getElementById('stack-analysis').style.display = 'none';
        return;
    }

    display.innerHTML = customStack.map(item => `
        <div class="stack-card">
            <div class="stack-card-info">
                <div class="stack-card-name">${item.name}</div>
                <div class="stack-card-type">${item.type}</div>
            </div>
            <div class="stack-card-ctrls">
                <div class="ctrl-group">
                    <label>MG/WK</label>
                    <input type="number" value="${item.dosage}" onchange="updateStackDosage('${item.id}', this.value)">
                </div>
                <div class="ctrl-group">
                    <label>WEEKS</label>
                    <input type="number" value="${item.weeks}" onchange="updateStackWeeks('${item.id}', this.value)">
                </div>
                <button class="remove-stack-btn" onclick="removeCompoundFromStack('${item.id}')">×</button>
            </div>
        </div>
    `).join('');

    validateCustomStack();
}

window.validateCustomStack = function() {
    const analysis = document.getElementById('stack-analysis');
    if (!analysis) return;

    analysis.style.display = 'block';
    analysis.innerHTML = `<div class="analysis-header"><i class="fas fa-brain"></i> CORTEX_NEURAL_LOGGING</div>`;

    const warnings = [];
    const ids = customStack.map(s => s.id);
    const compounds = customStack.map(s => WIKI_DATA.find(c => c.id === s.id));

    // Warning Logic
    const orals = compounds.filter(c => c.folder?.includes('Oral') || c.type === 'Oral');
    if (orals.length > 1) {
        warnings.push({
            type: 'critical',
            msg: `DUAL_ORAL_TOXICITY: Multiple alkylated substances detected (${orals.map(o => o.name).join(' + ')}). Combined hepatic strain exceeds safety thresholds. TUDCA/NAC protocols mandatory.`
        });
    }

    const nors = compounds.filter(c => c.id === 'trenbolone_acetate' || c.id === 'trenbolone_enanthate' || c.id === 'nandrolone_decanoate' || c.id === 'nandrolone_npp');
    if (nors.length > 1) {
        warnings.push({
            type: 'elevated',
            msg: `PROGESTIN_COLLISION: Multiple 19-nor derivatives detected. Prolactin elevation risk is exponential. Suggest pharmacological management (Cabergoline) or dosage reduction.`
        });
    }

    const dhts = compounds.filter(c => c.folder?.includes('DHT') || c.id === 'stanozolol' || c.id === 'oxandrolone' || c.id === 'drostanolone' || c.id === 'primobolan');
    if (dhts.length >= 2) {
        warnings.push({
            type: 'neutral',
            msg: `DHT_DOMINANCE: High localized DHT load. Expect increased lipid strain and accelerated hairline recession. Monitoring cardiovascular markers is recommended.`
        });
    }

    const testFound = ids.some(id => id.includes('testosterone') || id === 'sustanon');
    if (!testFound && compounds.length > 0) {
        warnings.push({
            type: 'critical',
            msg: `ENDOCRINE_VOID: No Testosterone base detected. HPTA suppression will result in zero estrogen and high physiological lethargy. A testosterone base is clinically recommended.`
        });
    }

    if (warnings.length === 0) {
        analysis.innerHTML += `<div class="hazard-card status-therapeutic">PROTOCOL_OPTIMAL: No conflicting pharmacological interactions detected within current synthesis parameters.</div>`;
    } else {
        warnings.forEach(w => {
            analysis.innerHTML += `<div class="hazard-card status-${w.type}">${w.msg}</div>`;
        });
    }
}

function generateCycle() {
    const age = parseInt(document.getElementById('gen-age').value);
    const weight = parseInt(document.getElementById('gen-weight').value);
    let bf = parseInt(document.getElementById('gen-bf').value);
    const exp = document.getElementById('gen-exp').value;
    let goal = document.getElementById('gen-goal').value;

    const resultDiv = document.getElementById('cycle-result');
    resultDiv.style.display = 'block';

    if (!age || !weight || !bf) {
        resultDiv.innerHTML = `<div class="warning-msg">[!] ERROR: Incomplete biological input parameters. Fields cannot be empty.</div>`;
        return;
    }

    if (age < 18) {
        resultDiv.innerHTML = `
            <div class="warning-msg">[!] PROTOCOL DENIED: Neurological/Endocrine Immaturity.</div>
            <p style="color: #a1abb8; line-height: 1.6; font-size: 14px;">Subject age (${age}) is below safe threshold. Running suppressive androgens before age 18 permanently stunts frontal lobe maturation, physical growth plates, and severely limits HPTA baseline stabilization. Protocol aborted.</p>
        `;
        return;
    }

    let warning = '';
    if (bf > 15 && goal === 'bulk') {
        warning = `<div class="warning-msg">[!] AROMATIZATION RISK: ${bf}% bodyfat detected. Initiating a caloric surplus and high androgens at this metric triggers compounding estrogen conversion. Goal overridden to Fat Loss protocol.</div>`;
        goal = 'cut';
    }

    let cycleTitle = '';
    let compounds = [];
    let pct = 'Nolvadex 20mg/day (4 weeks) + Enclomiphene 12.5mg/day (4 weeks). Wait exactly 18 days after last injection to clear active esters.';
    let support = ['Omega 3 (4g/day)', 'Daily LISS Cardio (30 mins minimum)', 'Hydration (1.5-2 Gal/day)'];

    if (exp === 'virgin') {
        cycleTitle = 'Base Test Protocol (Beginner)';
        compounds = [
            'Testosterone Enanthate or Cypionate: 300mg - 400mg weekly (Split into E3.5D injections).',
            'Duration: 16 weeks.'
        ];
        support.push('Aromatase Inhibitor (Arimidex): 0.25mg only upon acute nipple sensitivity.');
        if (goal === 'cut') compounds.push('Optional Anavar (Oxandrolone): 20mg/day for the final 6 weeks to preserve strength in deficit.');
    } 
    else if (exp === 'intermediate') {
        if (goal === 'bulk') {
            cycleTitle = 'Mass Accrual Architecture';
            compounds = [
                'Testosterone Enanthate: 500mg weekly.',
                'Nandrolone Decanoate (Deca): 300mg weekly.',
                'Dianabol Kickstart: 30mg daily (Weeks 1-4 only)',
                'Duration: 16 weeks.'
            ];
            support.push('Cabergoline: 0.25mg twice weekly (prolactin management for 19-nors).');
            support.push('TUDCA 500mg (hepatic cellular support for oral kickstart).');
        } else {
            cycleTitle = 'Aesthetic Hardening Protocol';
            compounds = [
                'Testosterone Propionate: 200mg weekly.',
                'Masteron Propionate (Drostanolone): 300mg weekly.',
                'Duration: 10-12 weeks.'
            ];
            if (goal === 'cut') compounds.push('Winstrol: 50mg daily (Weeks 8-12) for extreme subcutaneous water shedding.');
        }
    } 
    else if (exp === 'advanced') {
        pct = 'No PCT mapped. Proceed to TRT/Cruise: 120-150mg Testosterone weekly.';
        if (goal === 'bulk') {
            cycleTitle = 'Advanced Hypertrophy (Blast Phase)';
            compounds = [
                'Testosterone Cypionate: 600mg weekly.',
                'Equipoise (Boldenone): 600mg weekly.',
                'rHGH (Human Growth Hormone): 4 IU daily.'
            ];
            support.push('Telmisartan: 40mg daily (Blood pressure gating).');
            support.push('Arimidex 0.5mg EOD.');
        } else {
            cycleTitle = 'Extreme Conditioning Protocol';
            compounds = [
                'Testosterone Propionate: 150mg weekly (Base).',
                'Trenbolone Acetate: 300mg weekly.',
                'Masteron Propionate: 400mg weekly.'
            ];
            support.push('Clenbuterol: 40mcg titrated up to 80mcg daily.');
            support.push('T3 (Cytomel): 25-50mcg daily.');
            support.push('Cabergoline 0.25mg twice weekly.');
        }
    }

    let cycleHTML = `<h3>🎯 ${cycleTitle}</h3>`;
    if (warning) cycleHTML += warning;
    
    cycleHTML += `<h4>1. Core Endocrine Layout</h4><ul>`;
    compounds.forEach(c => cycleHTML += `<li>${c}</li>`);
    cycleHTML += `</ul>`;

    cycleHTML += `<h4>2. Ancillary Risk Mitigation</h4><ul>`;
    support.forEach(s => cycleHTML += `<li>${s}</li>`);
    cycleHTML += `</ul>`;

    cycleHTML += `<h4>3. Recovery & Clearance (PCT)</h4><p style="color:var(--text);font-family:var(--font-m); margin-bottom: 15px;">${pct}</p>`;

    let training = '';
    let nutrition = '';

    if (goal === 'bulk') {
        training = '<strong>Push/Pull/Legs (6 Days/Week):</strong> Focus entirely on mechanical tension and progressive overload in the 8-12 rep range. Since recovery is exponentially enhanced by androgens, push sets closer to absolute failure without fear of CNS burnout. Minimize cardio to 20m 3x/week for heart health.';
        let targetCals = weight * 18 + 500;
        nutrition = `<strong>Hypertrophy Surplus:</strong> Target ~${targetCals} kcal/day. Base macros: ${Math.round(weight * 1.2)}g Protein, ${Math.round(weight * 0.4)}g Fats, and the remainder entirely from clean carbohydrates (rice, oats, potatoes). Load 50% of your daily carbs pre- and post-workout to leverage extreme AAS-induced glycogen storage.`;
    } 
    else if (goal === 'cut') {
        training = '<strong>Upper/Lower (4 Days/Week):</strong> The goal is muscle preservation, NOT building. Keep rep ranges in the heavy 4-8 range to force the body to keep the tissue. Volume must drop by 30% to prevent extreme cortisol spikes in a deficit. Add 45 minutes of LISS cardio daily.';
        let targetCals = Math.round(weight * 14 - 500);
        nutrition = `<strong>Deficit Architecture:</strong> Target ~${targetCals} kcal/day. Base macros: ${Math.round(weight * 1.4)}g Protein (high protein prevents catabolism), ${Math.round(weight * 0.3)}g Fats. Carbohydrates must be aggressively restricted and consumed strictly in the 2-hour window around your workout.`;
    }
    else { // recomp
        training = '<strong>Heavy Compounds + Metabolic Conditioning:</strong> Combine heavy compound lifting (Squat/Bench/Deadlift) with short, intense metabolic conditioning. The goal is to signal for muscle growth while keeping the heart rate pinned to burn fat.';
        let targetCals = Math.round(weight * 15);
        nutrition = `<strong>Carb Cycling (Maintenance):</strong> Target ~${targetCals} kcal/day. Base macros: ${Math.round(weight * 1.2)}g Protein. Eat high carbs on the days you lift heavy, and drop carbs to near-zero (high fat/protein) on your rest and cardio days to aggressively strip bodyfat while maintaining mass.`;
    }

    cycleHTML += `<h4>4. Nutritional Directives</h4><p style="color:#a1abb8; line-height: 1.6; font-size: 14px; margin-bottom: 15px;">${nutrition}</p>`;
    cycleHTML += `<h4>5. Biomechanics & Training</h4><p style="color:#a1abb8; line-height: 1.6; font-size: 14px; margin-bottom: 15px;">${training}</p>`;

    resultDiv.innerHTML = cycleHTML;
    document.getElementById('download-protocol-btn').style.display = 'block';
}

window.downloadProtocol = function() {
    const content = document.getElementById('cycle-result').innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ECLIPSE_PROTOCOL_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Synthesis Oracle View
function loadSynthesisView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(document.getElementById('synthesis-nav-btn')) document.getElementById('synthesis-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "SYNTHESIS ORACLE";

    const mount = document.getElementById('article-mount');
    
    // Get only drugs with synthesis data
    const synthesized = WIKI_DATA.filter(d => d.synthesis);

    mount.innerHTML = `
        <div class="synthesis-oracle-view">
            <h1><i class="fas fa-flask"></i> Manufacturing Intelligence</h1>
            <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 25px; line-height: 1.6;">Access restricted dossiers regarding the chemical synthesis, microbial expression, and cultivation origins of substances in the Eclipse databank.</p>
            
            <div class="search-oracle-wrap">
                <input type="text" id="oracle-search" placeholder="Type a substance (e.g. Testosterone, HGH...)" autocomplete="off">
            </div>

            <div id="oracle-results" class="oracle-results-grid">
                ${renderOracleResults(synthesized)}
            </div>
        </div>
    `;

    document.getElementById('oracle-search').focus();
    document.getElementById('oracle-search').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = synthesized.filter(d => d.name.toLowerCase().includes(term));
        document.getElementById('oracle-results').innerHTML = renderOracleResults(filtered);
    });
}

function renderOracleResults(items) {
    if (items.length === 0) return '<div class="no-results">NO SYNTHESIS DATA FOUND FOR THIS PARAMETER</div>';
    
    return items.map(item => `
        <div class="oracle-card" onclick="showSynthesisDetail('${item.id}')">
            <div class="oracle-card-header">
                <span class="oracle-card-name">${item.name}</span>
                <span class="oracle-card-type">${item.type}</span>
            </div>
            <div class="oracle-card-body">
                <div class="synthesis-snippet">${item.synthesis.substring(0, 100)}...</div>
                <div class="oracle-action">INITIALIZE_BLUEPRINT</div>
            </div>
        </div>
    `).join('');
}

function showSynthesisDetail(id) {
    const item = WIKI_DATA.find(d => d.id === id);
    if (!item) return;

    const mount = document.getElementById('oracle-results');
    
    mount.innerHTML = `
        <div class="blueprint-view">
            <div class="blueprint-header">
                <button class="back-btn" onclick="loadSynthesisView()"><i class="fas fa-arrow-left"></i> BACK_TO_INDEX</button>
                <div class="blueprint-title">
                    <span class="bp-name">${item.name.toUpperCase()}</span>
                    <span class="bp-subtitle">MANUFACTURING_BLUEPRINT // REF_${item.id.toUpperCase()}</span>
                </div>
            </div>

            ${item.location ? `
                <div class="blueprint-location-strip">
                    <i class="fas fa-globe-americas"></i> <strong>Sourcing & Cultivation Hubs:</strong> ${item.location}
                </div>
            ` : ''}

            <div class="blueprint-content">
                <div class="blueprint-graphic">
                    <div class="bp-molecule-icon">⚗</div>
                    <div class="bp-grid-overlay"></div>
                    <div class="bp-spec-lines">
                        <div class="spec-line" style="top: 20%; left: 10%;">[MOLECULAR_WEIGHT: ${Math.floor(Math.random()*400)+100} g/mol]</div>
                        <div class="spec-line" style="top: 50%; right: 10%;">[PURITY_THRESHOLD: 99.8%]</div>
                        <div class="spec-line" style="bottom: 20%; left: 30%;">[SYNTHETIC_ORIGIN: ${item.type.toUpperCase()}]</div>
                    </div>
                </div>

                <div class="blueprint-text-panel">
                    <h3>TECHNICAL_SYNTHESIS_PROTOCOL</h3>
                    
                    ${item.ingredients ? `
                        <div class="blueprint-ingredients-panel">
                            <h4>REQUIRED_REAGENTS_&_INPUTS</h4>
                            <div class="ingredients-list">
                                ${item.ingredients.map(ing => `<span class="ing-tag">${ing}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="bp-detailed-text">
                        ${item.synthesisSteps ? `
                            <div class="synthesis-steps">
                                ${item.synthesisSteps.map((step, index) => `
                                    <div class="step-item">
                                        <div class="step-num">${String(index + 1).padStart(2, '0')}</div>
                                        <div class="step-content">${step}</div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <p>${item.synthesis}</p>
                        `}
                        <br>
                        <strong>Clinical Assessment:</strong> The structural integrity of ${item.name} is maintained through stringent temperature control and solvent purification stages. Any deviation in the synthesis path results in cytotoxic byproducts.
                    </div>

                    ${item.storage ? `
                        <div class="blueprint-storage-panel">
                            <h4>STABILITY_&_STORAGE_DOSSIER</h4>
                            <div class="storage-content">
                                <div class="storage-item">
                                    <i class="fas fa-thermometer-half"></i>
                                    <span>${item.storage.temp || '15-25°C (Ambient)'}</span>
                                </div>
                                <div class="storage-item">
                                    <i class="fas fa-sun"></i>
                                    <span>${item.storage.light || 'Protect from UV'}</span>
                                </div>
                                <div class="storage-item">
                                    <i class="fas fa-hourglass-end"></i>
                                    <span>${item.storage.shelf || '24-36 Months'}</span>
                                </div>
                            </div>
                            <p class="storage-notes">${item.storage.notes || ''}</p>
                        </div>
                    ` : ''}

                    
                    <div class="bp-indicators">
                        <div class="bp-indicator">
                            <div class="ind-label">REACTION_STABILITY</div>
                            <div class="ind-bar"><div class="ind-fill" style="width: 94%"></div></div>
                        </div>
                        <div class="bp-indicator">
                            <div class="ind-label">BIOAVAILABILITY</div>
                            <div class="ind-bar"><div class="ind-fill" style="width: 88%"></div></div>
                        </div>
                    </div>

                    <button class="cyber-btn" onclick="showCompoundDetail('${item.id}')" style="border-color: var(--accent); color: var(--accent); margin-top: 30px;">VIEW_FULL_CLINICAL_PROFILE</button>
                </div>
            </div>
        </div>
    `;
}

function loadPathologyView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('pathology-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "PATHOLOGY SOLVER";

    const mount = document.getElementById('article-mount');
    
    mount.innerHTML = `
        <div class="pathology-view">
            <div class="ai-header">
                <h2><span class="glitch" data-text="PATHOLOGY SOLVER">PATHOLOGY SOLVER</span></h2>
                <p>Input a symptom, disorder, or physiological deficit to query the central pharmacology databank for identified solutions.</p>
            </div>
            
            <div class="search-container" style="max-width: 600px; margin: 20px auto; position: relative;">
                <input type="text" id="pathologyInput" placeholder="Enter problem (e.g. anxiety, hair loss, fat loss, insomnia)..." 
                       style="width: 100%; padding: 15px 20px; background: rgba(0,0,0,0.5); border: 1px solid var(--border); color: #fff; font-family: var(--font-m); border-radius: 4px;">
                <button class="cyber-btn" onclick="solvePathology()" style="display: block; margin: 15px auto; width: 200px; border-color: #ff9d00; color: #ff9d00;">DIAGNOSE_PHARMA</button>
            </div>

            <div id="pathology-results" class="pathology-results-grid"></div>
        </div>
    `;

    setTimeout(() => {
        const input = document.getElementById('pathologyInput');
        if (input) {
            input.focus();
            input.addEventListener('keypress', (e) => { if(e.key === 'Enter') solvePathology(); });
        }
    }, 100);
}

window.solvePathology = function() {
    const rawInput = document.getElementById('pathologyInput').value.toLowerCase().trim();
    const resultGrid = document.getElementById('pathology-results');
    
    if (!rawInput) return;

    // Smart Synonym Mapping
    const SYNONYMS = {
        'shredded': ['fat loss', 'cutting', 'lean', 'subcutaneous', 'ripped'],
        'ripped': ['fat loss', 'cutting', 'lean', 'abs'],
        'lean': ['fat loss', 'cutting', 'anavar', 'winstrol'],
        'huge': ['muscle growth', 'hypertrophy', 'size', 'mass', 'bulking'],
        'massive': ['muscle growth', 'mass', 'bulking'],
        'gains': ['muscle growth', 'hypertrophy', 'mass'],
        'chill': ['anxiety', 'relaxation', 'calm', 'panic'],
        'relax': ['anxiety', 'calm', 'sedation'],
        'panic': ['anxiety', 'alprazolam', 'benzodiazepines'],
        'scared': ['anxiety', 'panic', 'fear', 'alprazolam'],
        'paranoid': ['anxiety', 'panic', 'fear', 'alprazolam'],
        'fear': ['anxiety', 'panic', 'fear'],
        'worried': ['anxiety', 'panic'],
        'fun': ['recreational', 'euphoria', 'mdma', 'cocaine', 'lsd', 'alcohol', 'ghb', 'party'],
        'party': ['recreational', 'euphoria', 'mdma', 'cocaine', 'alcohol', 'stimulant'],
        'rave': ['mdma', 'ecstasy', 'ketamine', 'lsd', 'stimulant'],
        'spiritual': ['psychedelics', 'dmt', 'psilocybin', 'lsd', 'ibogaine', 'mystical', 'ayahuasca'],
        'spirit': ['dmt', 'mystical', 'ego death', 'meo_dmt'],
        'mystical': ['dmt', 'psilocybin', 'meo_dmt', 'psychedelics'],
        'ego death': ['meo_dmt', 'dmt', '5-meo-dmt', 'lsd'],
        'stress': ['anxiety', 'cortisol'],
        'study': ['cognitive enhancement', 'focus', 'concentration', 'modafinil', 'nootropic'],
        'focus': ['cognitive enhancement', 'concentration', 'nootropic'],
        'brain': ['cognitive enhancement', 'neuroprotection', 'nootropic'],
        'smart': ['cognitive enhancement', 'nootropic'],
        'exam': ['cognitive enhancement', 'focus', 'modafinil'],
        'tired': ['insomnia', 'sleep induction', 'sedation'],
        'night': ['sleep induction', 'insomnia'],
        'sleep': ['insomnia', 'sedation', 'sleep induction'],
        'sex': ['libido', 'erectile dysfunction', 'tadalafil', 'sildenafil', 'melanotan', 'pt141', 'cabergoline'],
        'boner': ['erective dysfunction', 'tadalafil', 'sildenafil', 'vardenafil', 'avanafil'],
        'erection': ['tadalafil', 'sildenafil', 'vardenafil', 'pt141'],
        'libido': ['pt141', 'cabergoline', 'testosterone', 'melanotan', 'sex drive'],
        'drive': ['libido', 'pt141', 'testosterone', 'sex drive'],
        'refractory': ['cabergoline', 'refractory period', 'dopamine'],
        'hair': ['hair loss', 'finasteride', 'dutasteride'],
        'skin': ['pigmentation', 'tanning', 'melanotan'],
        'heart': ['cardiovascular', 'blood pressure', 'telmisartan'],
        'bp': ['blood pressure', 'telmisartan', 'hypertension'],
        'stamina': ['endurance', 'cardio', 'performance'],
        'roids': ['anabolic', 'steroids', 'androgens', 'aas', 'juice', 'testosterone'],
        'juice': ['anabolic', 'steroids', 'aas', 'gear', 'roids'],
        'gear': ['anabolic', 'steroids', 'aas', 'gear', 'roids', 'performance'],
        'sauce': ['anabolic', 'steroids', 'aas', 'gear'],
        'gas': ['anabolic', 'steroids', 'androgens', 'performance'],
        'strength': ['anabolic', 'power', 'performance', 'testosterone', 'anadrol', 'trenbolone'],
        'vascular': ['tadalafil', 'veins', 'blood flow', 'masteron', 'winstrol', 'equipoise'],
        'veins': ['tadalafil', 'vascular', 'blood flow', 'equipoise'],
        'dry': ['winstrol', 'anavar', 'masteron', 'trenbolone', 'dryness', 'hardening'],
        'hard': ['winstrol', 'masteron', 'muscle hardness', 'hardening'],
        'hardness': ['winstrol', 'masteron', 'muscle hardness'],
        'energy': ['stimulant', 'focus', 'amphetamine', 'caffeine']
    };

    resultGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--accent); padding: 50px;">Running Neural-Pharma Matcher for "${rawInput}"...</div>`;

    setTimeout(() => {
        // Expand search terms based on synonyms
        let searchTerms = [rawInput];
        if (SYNONYMS[rawInput]) {
            searchTerms = [...searchTerms, ...SYNONYMS[rawInput]];
        }

        const scores = WIKI_DATA.map(item => {
            let score = 0;
            const itemText = [
                item.name,
                item.primaryUses,
                item.overview,
                item.mechanism,
                item.benefits,
                item.esters || ''
            ].join(' ').toLowerCase();

            searchTerms.forEach(term => {
                if (item.name.toLowerCase().includes(term)) score += 50; 
                if (item.primaryUses.toLowerCase().includes(term)) score += 30;
                if (item.benefits && item.benefits.toLowerCase().includes(term)) score += 20;
                if (itemText.includes(term)) score += 5;
            });

            return { item, score };
        }).filter(res => res.score > 0)
          .sort((a, b) => b.score - a.score);

        if (scores.length === 0) {
            resultGrid.innerHTML = `<div class="warning-msg" style="grid-column: 1/-1;">[!] INTELLIGENT MATCH FAILURE: No compounds in the current databank map to "${rawInput}". Try terms like "mass," "shredded," "focus," or "anxiety."</div>`;
        } else {
            resultGrid.innerHTML = '';
            scores.forEach(({ item, score }) => {
                const card = document.createElement('div');
                card.className = 'pathology-card';
                card.style = `
                    background: rgba(10,12,15,0.8);
                    border: 1px solid var(--border);
                    padding: 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border-left: 4px solid ${score > 50 ? '#ff9d00' : 'var(--border2)'};
                    position: relative;
                `;
                
                // Add a "Relevance" indicator
                const relevance = score > 60 ? 'HIGH MATCH' : 'RELEVANT';
                const relColor = score > 60 ? '#ff9d00' : 'var(--text-muted)';
                
                card.innerHTML = `
                    <div style="font-size: 9px; color: ${relColor}; letter-spacing: 1px; margin-bottom: 4px; font-weight: bold;">${relevance} (PROB: ${score}%)</div>
                    <div style="font-weight: bold; color: var(--accent2); margin-bottom: 8px; font-family: var(--font-s); font-size: 16px;">${item.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; font-family: var(--font-m);">${item.type.toUpperCase()}</div>
                    <div style="font-size: 13px; line-height: 1.4; color: var(--text); font-family: var(--font-m);">${item.primaryUses.substring(0, 120)}${item.primaryUses.length > 120 ? '...' : ''}</div>
                `;
                card.onclick = () => loadArticle(item.id);
                card.onmouseover = () => card.style.borderColor = 'var(--accent)';
                card.onmouseout = () => card.style.borderColor = 'var(--border)';
                resultGrid.appendChild(card);
            });
        }
    }, 400);
}

// Quick Finder View
let finderStep = 1;
let finderData = { goal: '', risk: '', exp: '' };

function loadQuickFinderView() {
    finderStep = 1;
    finderData = { goal: '', risk: '', exp: '' };
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('finder-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "QUICK FINDER";

    renderFinderStep();
}

function renderFinderStep() {
    const mount = document.getElementById('article-mount');
    mount.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'finder-container';
    container.style = 'max-width: 600px; margin: 40px auto; text-align: center;';

    let content = '';
    
    if (finderStep === 1) {
        content = `
            <div class="ai-header">
                <h2>STEP 01: DEFINE OBJECTIVE</h2>
                <p>What is the primary physiological state you wish to achieve?</p>
            </div>
            <div class="finder-options">
                <button class="cyber-btn" onclick="setFinderData('goal', 'muscle')">MAXIMUM HYPERTROPHY</button>
                <button class="cyber-btn" onclick="setFinderData('goal', 'shred')">EXPOSED VASCULARITY / FAT LOSS</button>
                <button class="cyber-btn" onclick="setFinderData('goal', 'mental')">COGNITIVE ENHANCEMENT / FOCUS</button>
                <button class="cyber-btn" onclick="setFinderData('goal', 'relief')">ANXIETY RELIEF / SEDATION</button>
                <button class="cyber-btn" onclick="setFinderData('goal', 'fun')">RECREATIONAL EUPHORIA</button>
            </div>
        `;
    } else if (finderStep === 2) {
        content = `
            <div class="ai-header">
                <h2>STEP 02: RISK TOLERANCE</h2>
                <p>Select your acceptable level of physiological strain.</p>
            </div>
            <div class="finder-options">
                <button class="cyber-btn" onclick="setFinderData('risk', 'low')" style="border-color: #00ffaa; color: #00ffaa;">LOW (Harm Reduction Focus)</button>
                <button class="cyber-btn" onclick="setFinderData('risk', 'mid')" style="border-color: #ff9d00; color: #ff9d00;">MEDIUM (Balanced Efficacy)</button>
                <button class="cyber-btn" onclick="setFinderData('risk', 'high')" style="border-color: #ff3a5c; color: #ff3a5c;">HIGH (Aggressive / Risk Heavy)</button>
            </div>
        `;
    } else if (finderStep === 3) {
        const result = calculateFinderResult();
        const item = WIKI_DATA.find(x => x.id === result.id);
        
        content = `
            <div class="ai-header pulse">
                <h2 style="color: #00ffaa;">DIAGNOSIS COMPLETE</h2>
                <p>Based on your physiological goals and risk tolerance, the following compound is your optimal match:</p>
            </div>
            <div class="result-card" style="background: rgba(0,255,170,0.05); border: 2px solid #00ffaa; padding: 30px; border-radius: 8px; margin-top: 30px; cursor: pointer;" onclick="loadArticle('${item.id}')">
                <div style="font-size: 12px; color: #00ffaa; letter-spacing: 2px; margin-bottom: 10px;">OPTIMAL SELECTION</div>
                <h1 style="margin: 0; font-size: 32px; color: #fff;">${item.name}</h1>
                <p style="color: #a1abb8; margin: 15px 0;">${item.primaryUses}</p>
                <div style="color: #00ffaa; font-weight: bold;">CLICK TO VIEW FULL PROFILE ></div>
            </div>
            <button class="cyber-btn" onclick="loadQuickFinderView()" style="margin-top: 30px; width: auto;">RESET_DIAGNOSTIC</button>
        `;
    }

    container.innerHTML = content;
    mount.appendChild(container);
}

window.setFinderData = function(key, val) {
    finderData[key] = val;
    finderStep++;
    renderFinderStep();
}

function calculateFinderResult() {
    const g = finderData.goal;
    const r = finderData.risk;

    if (g === 'muscle') {
        if (r === 'low') return { id: 'testosterone' };
        if (r === 'mid') return { id: 'nandrolone' };
        return { id: 'trenbolone' };
    }
    if (g === 'shred') {
        if (r === 'low') return { id: 'anavar' };
        if (r === 'mid') return { id: 'winstrol' };
        return { id: 'clenbuterol' };
    }
    if (g === 'mental') {
        if (r === 'low') return { id: 'nootropics' };
        if (r === 'mid') return { id: 'modafinil' };
        return { id: 'amphetamine' };
    }
    if (g === 'relief') {
        if (r === 'low') return { id: 'phenibut' };
        if (r === 'mid') return { id: 'alprazolam' };
        return { id: 'barbiturates' };
    }
    if (g === 'fun') {
        if (r === 'low') return { id: 'cannabis' };
        if (r === 'mid') return { id: 'mdma' };
        return { id: 'lsd' };
    }
    return { id: 'testosterone' };
}

// PCT Clearance Calculator
const HALF_LIVES = {
    'testosterone_enanthate': 7.5,
    'testosterone_cypionate': 8,
    'testosterone_propionate': 2,
    'nandrolone_decanoate': 15,
    'trenbolone_acetate': 1,
    'trenbolone_enanthate': 8,
    'boldenone_undecylenate': 15,
    'primobolan_enanthate': 10,
    'masteron_propionate': 2,
    'masteron_enanthate': 8,
    'sustanon_250': 15 // Mixed, usually based on longest ester
};

function loadPCTView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('pct-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "PCT CALCULATOR";

    const mount = document.getElementById('article-mount');
    
    mount.innerHTML = `
        <div class="pct-view">
            <div class="ai-header">
                <h2><span class="glitch" data-text="CLEARANCE CALCULATOR">CLEARANCE CALCULATOR</span></h2>
                <p>Calculate metabolic half-life to determine the precise window for HPTA recovery initialization.</p>
            </div>
            
            <div class="generator-form">
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label>Select Last Compound Used</label>
                    <select id="pct-compound" style="background: rgba(0,0,0,0.5); color: #fff; width: 100%; padding: 10px; border: 1px solid var(--border);">
                        <option value="testosterone_enanthate">Testosterone Enanthate (7.5 days)</option>
                        <option value="testosterone_cypionate">Testosterone Cypionate (8 days)</option>
                        <option value="testosterone_propionate">Testosterone Propionate (2 days)</option>
                        <option value="nandrolone_decanoate">Nandrolone Decanoate / Deca (15 days)</option>
                        <option value="trenbolone_acetate">Trenbolone Acetate (1 day)</option>
                        <option value="trenbolone_enanthate">Trenbolone Enanthate (8 days)</option>
                        <option value="boldenone_undecylenate">Boldenone / Equipoise (15 days)</option>
                        <option value="primobolan_enanthate">Primobolan Enanthate (10 days)</option>
                        <option value="masteron_propionate">Masteron Propionate (2 days)</option>
                        <option value="sustanon_250">Sustanon 250 (15 days)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Last Dose (mg)</label>
                    <input type="number" id="pct-dose" placeholder="e.g. 250">
                </div>
                <div class="form-group">
                    <label>Date of Last Injection</label>
                    <input type="date" id="pct-date">
                </div>
                <button class="cyber-btn" onclick="calculatePCT()" style="grid-column: 1 / -1; border-color: #ff3a5c; color: #ff3a5c; margin-top:10px;">ANALYZE_CLEARANCE</button>
            </div>

            <div id="pct-result" class="pct-result-display" style="display: none; margin-top: 30px; padding: 25px; border: 1px solid var(--red); background: rgba(255,58,92,0.05); border-radius: 8px;">
            </div>
        </div>
    `;

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('pct-date').value = today;
}

window.calculatePCT = function() {
    const compound = document.getElementById('pct-compound').value;
    const dose = parseInt(document.getElementById('pct-dose').value);
    const dateStr = document.getElementById('pct-date').value;
    const resultDiv = document.getElementById('pct-result');

    if (!dose || !dateStr) {
        alert("Please enter dose and date.");
        return;
    }

    const hl = HALF_LIVES[compound];
    const lastDate = new Date(dateStr);
    
    // Recovery usually starts at 4.5 half-lives (95%+ clearance)
    const daysToClearance = Math.ceil(hl * 4.5);
    const clearanceDate = new Date(lastDate);
    clearanceDate.setDate(lastDate.getDate() + daysToClearance);

    // Mid-way point for levels dropping significantly
    const lowLevelDate = new Date(lastDate);
    lowLevelDate.setDate(lastDate.getDate() + Math.ceil(hl * 2));

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3 style="color: #ff3a5c; border-bottom: 1px solid #ff3a5c; padding-bottom: 10px; margin-bottom: 15px;">CLEARANCE DIAGNOSTIC</h3>
        <p style="font-size: 16px; margin-bottom: 10px;">Metabolic Half-Life: <span style="color: #fff;">${hl} days</span></p>
        <p style="font-size: 16px; margin-bottom: 10px;">Last Dose Saturation: <span style="color: #fff;">${dose}mg</span></p>
        <hr style="border: 0; border-top: 1px solid rgba(255,58,92,0.2); margin: 15px 0;">
        
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 4px; border-left: 4px solid #ff3a5c;">
            <p style="color: #ff3a5c; font-weight: bold; font-size: 14px; margin-bottom: 5px;">ESTIMATED PCT START DATE:</p>
            <p style="font-size: 24px; color: #fff; font-family: var(--font-m);">${clearanceDate.toDateString().toUpperCase()}</p>
            <p style="font-size: 12px; color: var(--muted); margin-top: 5px;">* This date represents ~95% systemic clearance (4.5 half-lives). Initializing SERMs earlier may result in failed pituitary restart.</p>
        </div>

        <div style="margin-top: 20px; font-size: 13px; line-height: 1.6; color: #a1abb8;">
            <p><strong>Clinical Note:</strong> For long esters like Nandrolone Decanoate, the clearance window is exceptionally wide (60+ days) due to their storage in adipose tissue. Bloodwork is recommended to confirm hormone levels have dropped below 300ng/dL before starting Nolvadex/Clomid.</p>
        </div>
    `;
}

// Lab Verifier / COA View
function loadLabVerifierView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(document.getElementById('lab-nav-btn')) document.getElementById('lab-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "LAB VERIFIER";

    const mount = document.getElementById('article-mount');
    
    mount.innerHTML = `
        <div class="lab-verifier-view">
            <div class="lab-header">
                <h2><i class="fas fa-microscope"></i> ECLIPSE ANALYTICS // BATCH_VERIFICATION</h2>
                <p>Generate a certified Lab Report (COA) for any substance in the biotech databank.</p>
            </div>

            <div class="lab-controls">
                <select id="lab-item-select">
                    <option value="">-- SELECT SUBSTANCE --</option>
                    ${WIKI_DATA.map(item => `<option value="${item.id}">${item.name}</option>`).join('')}
                </select>
                <button class="cyber-btn" onclick="generateCOA()" style="margin: 0; width: 230px; border-color: #00ff00; color: #00ff00;">GENERATE_LAB_REPORT</button>
            </div>

            <div id="coa-output" class="coa-output-container">
                <div class="coa-placeholder">SELECT PARAMETERS TO INITIALIZE ASSAY...</div>
            </div>
        </div>
    `;
}

window.generateCOA = function() {
    const id = document.getElementById('lab-item-select').value;
    if(!id) return;

    const item = WIKI_DATA.find(d => d.id === id);
    const output = document.getElementById('coa-output');
    
    const batchId = "ECL-" + Math.floor(Math.random()*10000) + "-X" + (Math.random()*10).toFixed(0);
    const purity = (98.5 + Math.random()*1.4).toFixed(2);

    output.innerHTML = `
        <div class="coa-document">
            <div class="coa-header">
                <div class="coa-logo">ECLIPSE_ANALYTICS</div>
                <div class="coa-title">CERTIFICATE OF ANALYSIS</div>
            </div>

            <div class="coa-meta-grid">
                <div class="meta-box"><span>SUBSTANCE:</span> <strong>${item.name.toUpperCase()}</strong></div>
                <div class="meta-box"><span>BATCH_ID:</span> <strong>${batchId}</strong></div>
                <div class="meta-box"><span>TEST_DATE:</span> <strong>${new Date().toLocaleDateString()}</strong></div>
                <div class="meta-box"><span>STATUS:</span> <strong style="color: #00ff00;">PASS</strong></div>
            </div>

            <table class="coa-table">
                <thead>
                    <tr>
                        <th>PARAMETER</th>
                        <th>SPECIFICATION</th>
                        <th>RESULT</th>
                        <th>METHOD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>IDENTIFICATION</td>
                        <td>Matches Standard</td>
                        <td>Confirmed</td>
                        <td>FTIR / HPLC</td>
                    </tr>
                    <tr>
                        <td>PURITY (ASSAY)</td>
                        <td>≥ 98.00%</td>
                        <td style="color: #00ff00; font-weight: 700;">${purity}%</td>
                        <td>HPLC-UV</td>
                    </tr>
                    <tr>
                        <td>HEAVY METALS</td>
                        <td>< 1.0 ppm</td>
                        <td>0.12 ppm</td>
                        <td>ICP-MS</td>
                    </tr>
                    <tr>
                        <td>BACTERIAL ENDOTOXINS</td>
                        <td>< 0.5 EU/ml</td>
                        <td>Negative</td>
                        <td>LAL Test</td>
                    </tr>
                </tbody>
            </table>

            <div class="coa-hplc-section">
                <h3>SIMULATED HPLC CHROMATOGRAM</h3>
                <div class="hplc-chart">
                    <div class="hplc-peak" style="left: 45%; height: 90%;"></div>
                    <div class="hplc-peak small" style="left: 10%; height: 5%;"></div>
                    <div class="hplc-peak small" style="left: 80%; height: 3%;"></div>
                    <div class="hplc-baseline"></div>
                </div>
            </div>

            <div class="coa-footer">
                <div class="signature">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Foreman_Signature.png" style="filter: invert(1); opacity: 0.5; height: 30px;">
                    <p>DR. ARIS KALE (HEAD OF ANALYTICS)</p>
                </div>
                <div class="btn-group">
                    <button class="cyber-btn" onclick="window.print()" style="margin: 0; padding: 5px 15px; font-size: 10px; border-color: #666; color: #666;">PRINT_EXPORT</button>
                    <div class="stamp">OFFICIAL_VERIFIED</div>
                </div>
            </div>
            </div>
        </div>
    `;
}

// --- Three.js Hologram Engine ---
let holoScene, holoCamera, holoRenderer, holoMesh, holoRequestID;

function initHologram(type) {
    const container = document.getElementById('hologram-canvas-container');
    if (!container) return;

    if (holoRequestID) cancelAnimationFrame(holoRequestID);
    if (holoRenderer) {
        container.innerHTML = '';
        holoRenderer.dispose();
    }

    holoScene = new THREE.Scene();
    holoCamera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    holoCamera.position.z = 5;

    holoRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    holoRenderer.setSize(container.offsetWidth, container.offsetHeight);
    holoRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(holoRenderer.domElement);

    const material = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.6 });

    const group = new THREE.Group();

    if (type === 'pill') {
        const geometry = new THREE.CapsuleGeometry(0.8, 1.2, 3, 16);
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

        for(let i=0; i<15; i++) {
            const p = new THREE.Mesh(new THREE.SphereGeometry(0.04, 4, 4), material);
            const r = 0.5 * Math.sqrt(Math.random());
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 1.5;
            p.position.set(r * Math.cos(theta), y, r * Math.sin(theta));
            group.add(p);
        }
        // Revert to vertical standing for pills
        group.rotation.z = 0;
    } else if (type === 'vial') {
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 2, 16), material);
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16), material);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16), material);
        const shoulder = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 4, 16), material);
        
        shoulder.rotation.x = Math.PI/2;
        shoulder.position.y = 1.0;
        neck.position.y = 1.35;
        cap.position.y = 1.6;
        
        const liquidGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 8);
        const liquidMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.2 });
        const liquid = new THREE.Mesh(liquidGeo, liquidMat);
        liquid.position.y = -0.3;
        
        group.add(body, neck, cap, shoulder, liquid);
        // Standing vertical for stability
        group.rotation.z = 0;
    } else if (type === 'dna') {
        const curve1 = [];
        const curve2 = [];
        for (let i = 0; i < 40; i++) {
            const angle = i * 0.4;
            const y = i * 0.1 - 2;
            const x = Math.sin(angle) * 0.8;
            const z = Math.cos(angle) * 0.8;
            
            const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), material);
            s1.position.set(x, y, z);
            group.add(s1);
            curve1.push(new THREE.Vector3(x, y, z));

            const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), material);
            s2.position.set(-x, y, -z);
            group.add(s2);
            curve2.push(new THREE.Vector3(-x, y, -z));

            if (i % 2 === 0) {
                const points = [new THREE.Vector3(x, y, z), new THREE.Vector3(-x, y, -z)];
                const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
                group.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xb5ff4d, transparent: true, opacity: 0.3 })));
            }
        }
        const b1Geo = new THREE.BufferGeometry().setFromPoints(curve1);
        const b2Geo = new THREE.BufferGeometry().setFromPoints(curve2);
        group.add(new THREE.Line(b1Geo, material));
        group.add(new THREE.Line(b2Geo, material));
        // DNA often looks better horizontal for depth
        group.rotation.z = Math.PI / 2;
    } else { // molecule
        const atoms = [
            { pos: [0,0,0], size: 0.5 },
            { pos: [1,0.5,0], size: 0.3 }, { pos: [-1,-0.5,0], size: 0.3 },
            { pos: [0.5,1,0.5], size: 0.3 }, { pos: [-0.5,-1,-0.5], size: 0.3 },
            { pos: [0,0.5,1], size: 0.3 }, { pos: [0,-0.5,-1], size: 0.3 },
            { pos: [1.5,0,1], size: 0.2 }, { pos: [-1.5,0,-1], size: 0.2 }
        ];

        atoms.forEach((a, idx) => {
            const mesh = new THREE.Mesh(new THREE.SphereGeometry(a.size, 12, 12), material);
            mesh.position.set(...a.pos);
            group.add(mesh);

            atoms.slice(idx + 1).forEach(target => {
                const dist = new THREE.Vector3(...a.pos).distanceTo(new THREE.Vector3(...target.pos));
                if (dist < 1.8) {
                    const points = [new THREE.Vector3(...a.pos), new THREE.Vector3(...target.pos)];
                    const geo = new THREE.BufferGeometry().setFromPoints(points);
                    group.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.2 })));
                }
            });
        });
    }

    holoScene.add(group);
    holoMesh = group;

    // --- Interactive Rotation Logic ---
    let isDragging = false;
    let previousMouseX = 0;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMouseX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging && holoMesh) {
            const deltaX = e.clientX - previousMouseX;
            holoMesh.rotation.y += deltaX * 0.01;
            previousMouseX = e.clientX;
        }
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (isDragging && holoMesh) {
            const deltaX = e.touches[0].clientX - previousMouseX;
            holoMesh.rotation.y += deltaX * 0.01;
            previousMouseX = e.touches[0].clientX;
        }
    });

    const animate = () => {
        holoRequestID = requestAnimationFrame(animate);
        
        // Auto-rotation (subtle if not dragging)
        if (!isDragging) {
            holoMesh.rotation.y += 0.005;
        }
        
        holoMesh.position.y = Math.sin(Date.now() * 0.002) * 0.1;

        if (holoRenderer && holoScene && holoCamera) {
            holoRenderer.render(holoScene, holoCamera);
        }
    };
    animate();
}

// Biological Heat Map Logic
function updateHeatMap(item) {
    let impact = item.impact;
    
    // Intelligent Fallback Logic - Calculate baseline if explicit data is missing
    if (!impact) {
        impact = { brain: 0, heart: 0, liver: 0, kidneys: 0, blood: 0, hair: 0, joints: 0 };
        
        if (item.category === 'anabolic') {
            impact.blood = 4;
            impact.heart = 2;
            impact.hair = 2;
            
            if (item.folder === 'Oral Anabolics' || item.type === '17aa') {
                impact.liver = 6;
                impact.blood = 6;
            }
            if (item.folder === 'Nandrolone Derivatives') {
                impact.brain = 3;
            }
            if (item.id.includes('trenbolone')) {
                impact.brain = 8; impact.heart = 8; impact.kidneys = 6; impact.blood = 7;
            }
        }
        
        if (item.category === 'peptides') {
            if (item.folder === 'Regeneration & Recovery') impact.joints = -7;
            if (item.folder === 'Metabolism & Fat Loss') impact.blood = 3;
        }

        if (item.type === 'AI') {
            impact.joints = 4; // Drying effect
        }
    }

    const list = document.getElementById('impact-zones-list');
    if (!list) return;

    const zones = [
        { id: 'brain', label: getT('neurological'), val: impact.brain },
        { id: 'heart', label: getT('cardiovascular'), val: impact.heart },
        { id: 'liver', label: getT('hepatotoxicity'), val: impact.liver },
        { id: 'kidneys', label: getT('renal_strain'), val: impact.kidneys },
        { id: 'blood', label: getT('lipid_stress'), val: impact.blood },
        { id: 'hair', label: getT('hair_health'), val: impact.hair },
        { id: 'joints', label: getT('joint_health'), val: impact.joints }
    ];

    list.innerHTML = zones.map(z => {
        let statusText = getT('status_safe');
        let statusClass = 'status-neutral';
        let colorClass = '';
        
        if (z.val > 7) { 
            statusText = getT('status_critical'); 
            statusClass = 'status-critical'; 
            colorClass = 'heat-high'; 
        } else if (z.val > 4) { 
            statusText = getT('status_elevated'); 
            statusClass = 'status-elevated'; 
            colorClass = 'heat-med'; 
        } else if (z.val > 0) { 
            statusText = getT('status_monitor'); 
            statusClass = 'status-neutral'; 
            colorClass = 'heat-low'; 
        } else if (z.val < 0) { 
            statusText = currentLang === 'en' ? 'THERAPEUTIC' : getT('status_safe'); 
            statusClass = 'status-therapeutic'; 
            colorClass = 'heat-heal'; 
        }

        return `
            <div class="impact-zone-item">
                <div class="zone-label">
                    <span>${z.label}</span>
                    <span class="zone-status ${statusClass}">${statusText}</span>
                </div>
                <div class="impact-bar-bg">
                    <div class="impact-bar-fill" style="width: ${Math.abs(z.val) * 10}%; background: ${z.val < 0 ? '#00ff00' : (z.val > 7 ? 'var(--red)' : (z.val > 4 ? 'orange' : 'var(--cyan)'))}"></div>
                </div>
            </div>
        `;
    }).join('');
}
// --- Changelog View ---
function loadChangelogView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const btn = document.getElementById('logs-nav-btn');
    if (btn) btn.classList.add('active');
    document.getElementById('current-category').innerText = "SYSTEM_LOGS";

    const mount = document.getElementById('article-mount');
    
    const logs = [
        {
            ver: 'v3.5.2',
            date: '2026.04.22',
            title: 'I18N_CORE_UPGRADE',
            desc: 'Implemented recursive deep-merge translation engine. Synchronized real-time UI updates for drug profiles and sidebar navigation.',
            tags: ['CORE', 'I18N']
        },
        {
            ver: 'v3.4.0',
            date: '2026.04.20',
            title: 'DATABANK_EXPANSION',
            desc: 'Added comprehensive pharmacological profiles for 50+ new compounds across Anabolic, Psychedelic, and Nootropic categories.',
            tags: ['DATA']
        },
        {
            ver: 'v3.2.5',
            date: '2026.04.18',
            title: 'HOLO_MESH_v2',
            desc: 'Upgraded Three.js rendering engine with context-aware geometry (DNA Spirals, Vials, and Molecular clusters).',
            tags: ['GFX']
        },
        {
            ver: 'v3.0.0',
            date: '2026.04.15',
            title: 'AI_CORTEX_SYNC',
            desc: 'Integrated the Eclipse_AI reasoning module for real-time risk assessment and protocol analysis.',
            tags: ['AI', 'MAJOR']
        },
        {
            ver: 'v2.8.0',
            date: '2026.04.10',
            title: 'MOBILE_NODES_ACTIVE',
            desc: 'Optimized touch-gestures and edge-swipe sidebar interactions for mobile-link research environments.',
            tags: ['UX']
        }
    ];

    mount.innerHTML = `
        <div class="changelog-view">
            <div class="ai-header">
                <h2><span class="glitch" data-text="SYSTEM UPDATES">SYSTEM UPDATES</span></h2>
                <p>Tracking the evolution of the Eclipse Biotech terminal hardware and software protocols.</p>
            </div>
            
            <div class="timeline">
                ${logs.map(log => `
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <div class="log-meta">
                                <span class="log-ver">${log.ver}</span>
                                <span class="log-date">${log.date}</span>
                            </div>
                            <h3 class="log-title">${log.title}</h3>
                            <p class="log-desc">${log.desc}</p>
                            <div class="log-tags">
                                ${log.tags.map(t => `<span class="log-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
