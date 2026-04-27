// Variables from data.js: WIKI_DATA, CATEGORIES

// --- Neural Canvas Background ---
const canvas = document.getElementById('particle-canvas');
let ctx = canvas ? canvas.getContext('2d') : null;

// --- Supabase Cloud Sync Configuration ---
// TO ENABLE CLOUD ACCOUNTS: Replace these placeholders with your Supabase credentials
const SUPABASE_URL = ''; 
const SUPABASE_KEY = ''; 
let sb = null;

if (SUPABASE_URL && SUPABASE_KEY) {
    try {
        sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("ECLIPSE_DATABASE: CLOUD_SYNC_INITIALIZED");
    } catch (e) {
        console.error("ECLIPSE_DATABASE: CLOUD_SYNC_FAILED", e);
    }
} else {
    console.warn("ECLIPSE_DATABASE: LOCAL_ONLY_MODE (No credentials found)");
}

let width, height;
let particles = [];
let currentParticleMode = localStorage.getItem('eclipse_particle_mode') || 'neural';
let currentVelocityScale = parseFloat(localStorage.getItem('eclipse_velocity_scale') || '1');
const CONNECTION_DISTANCE = 150;

const PARTICLE_COUNT = 60;
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error("ECLIPSE_CRITICAL_ERROR:", msg, "at", url, ":", lineNo);
    showNotify("SYSTEM_ERROR: " + msg, 10000);
    return false;
};

function resize() { 
    if (!canvas) return;
    width = canvas.width = window.innerWidth; 
    height = canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize); resize();

class Particle {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.resetVelocity();
    }
    resetVelocity() {
        const baseSpeed = currentParticleMode === 'stars' ? 3 : 1.5;
        this.vx = (Math.random() - 0.5) * baseSpeed * currentVelocityScale;
        this.vy = (Math.random() - 0.5) * baseSpeed * currentVelocityScale;
        if (currentParticleMode === 'stars') {
            this.vx = (Math.random() * 2 + 1) * currentVelocityScale;
            this.vy = (Math.random() - 0.5) * 0.5 * currentVelocityScale;
        }
        if (currentParticleMode === 'snow') {
            this.vy = (Math.random() * 1 + 0.5) * currentVelocityScale;
            this.vx = (Math.random() - 0.5) * 0.5 * currentVelocityScale;
        }
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (currentParticleMode === 'neural') {
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        } else {
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        if (mouse.x && mouse.y && currentParticleMode === 'neural') {
            let dx = mouse.x - this.x, dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) { this.x -= dx * 0.02; this.y -= dy * 0.02; }
        }
    }
    draw() {
        if (!ctx) return;
        ctx.beginPath();
        if (currentParticleMode === 'stars') {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.vx * 4, this.y - this.vy * 4);
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
            ctx.stroke();
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = currentParticleMode === 'snow' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 240, 255, 0.6)';
            ctx.fill();
        }
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function animateParticles() {
    if (!ctx || currentParticleMode === 'none') {
        if (ctx) ctx.clearRect(0, 0, width, height);
        requestAnimationFrame(animateParticles);
        return;
    }
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        if (currentParticleMode === 'neural') {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < CONNECTION_DISTANCE) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 * (1 - distance / CONNECTION_DISTANCE)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
initParticles(); 
if (ctx) animateParticles();
// --------------------------------
// --- Custom Dialog System ---
function showNotify(message, duration = 4000) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'notification';
    toast.innerHTML = `<i class="fas fa-info-circle" style="margin-right: 10px; color: var(--accent)"></i> ${message}`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

function showConfirm(message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const msgEl = document.getElementById('confirm-message');
    const okBtn = document.getElementById('confirm-ok-btn');
    const cancelBtn = document.getElementById('confirm-cancel-btn');
    
    if (!modal || !msgEl) return;
    
    msgEl.innerText = message;
    modal.style.display = 'flex';
    
    okBtn.onclick = () => {
        modal.style.display = 'none';
        if (onConfirm) onConfirm();
    };
    
    cancelBtn.onclick = () => {
        modal.style.display = 'none';
    };
}
// --------------------------------
// --- Ambient Audio Logic ---
// --------------------------------
// --- Ambient Audio Logic ---
const bgMusic = document.getElementById('bgMusic');
const introAudio = document.getElementById('introAudio');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');

const SONG_LIBRARY = [
    { id: 'main', name: 'MAIN_THEME', artist: 'Eclipse Biotech', url: 'bg_music.mp3' },
    { id: 'track2', name: 'Something To Me', artist: 'Josh Baker', url: 'Josh Baker - Something To Me.mp3' },
    { id: 'track3', name: 'Torino', artist: 'Unknown', url: 'Torino.mp3' },
    { id: 'track4', name: 'Make U Whole', artist: 'Unknown', url: 'Make U Whole.mp3' }
];

let isAudioInitialized = false;
let currentTrackIndex = parseInt(localStorage.getItem('eclipse_track_index') || '0');

function updateAudioUI() {
    if (!volumeIcon || !muteBtn) return;
    const isMuted = bgMusic.paused || bgMusic.volume === 0;
    if (isMuted) {
        volumeIcon.className = 'fas fa-volume-mute';
        muteBtn.classList.add('muted');
        muteBtn.classList.remove('playing');
        if (volumeSlider) volumeSlider.classList.add('muted');
    } else {
        volumeIcon.className = 'fas fa-volume-up';
        muteBtn.classList.add('playing');
        muteBtn.classList.remove('muted');
        if (volumeSlider) volumeSlider.classList.remove('muted');
    }
}

function initAudio(skipPlay = false) {
    if (isAudioInitialized && !skipPlay) return;
    const savedVol = localStorage.getItem('eclipse_volume');
    const initialVol = savedVol !== null ? parseFloat(savedVol) : 0.6;
    if (!bgMusic.src || bgMusic.src.includes('undefined')) {
        bgMusic.src = SONG_LIBRARY[currentTrackIndex].url;
    }
    bgMusic.volume = initialVol;
    if (volumeSlider) volumeSlider.value = initialVol;
    if (skipPlay) { isAudioInitialized = true; return; }
    
    // Fallback logic for missing files
    bgMusic.onerror = () => {
        console.warn("ECLIPSE_AUDIO: Source error, falling back to main theme.");
        if (currentTrackIndex !== 0) {
            currentTrackIndex = 0;
            localStorage.setItem('eclipse_track_index', 0);
            bgMusic.src = SONG_LIBRARY[0].url;
            bgMusic.play().catch(e => {});
            if (typeof initTrackSelector === 'function') initTrackSelector();
            showNotify("AUDIO_RECOVERY: Default theme restored.", 3000);
        }
    };

    const playAttempt = bgMusic.play();
    if (playAttempt !== undefined) {
        playAttempt.then(() => {
            isAudioInitialized = true;
            updateAudioUI();
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        }).catch(error => {
            if (error.name === 'NotAllowedError') {
                console.log("Autoplay blocked, waiting for interaction.");
            } else {
                console.error("Playback failed:", error);
            }
        });
    }
}

function toggleMusic() {
    if (bgMusic.paused) bgMusic.play();
    else bgMusic.pause();
    updateAudioUI();
}

if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isAudioInitialized) initAudio();
        else toggleMusic();
    });
}
if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        bgMusic.volume = val;
        localStorage.setItem('eclipse_volume', val);
        updateAudioUI();
    });
}
document.addEventListener('click', initAudio);
document.addEventListener('keydown', initAudio);
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

// --- Google Translate Bridge ---
function triggerGoogleTranslate(langCode) {
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change'));
    } else {
        // If it's not loaded yet, try again in a moment
        setTimeout(() => triggerGoogleTranslate(langCode), 500);
    }
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

    if (!window.WIKI_DATA) {
        console.warn("ECLIPSE_CORE: WIKI_DATA not found during merge.");
        return;
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
                <span class="splash-sub">BIOTECH_CORE_v4.1.0</span>
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
                    setTimeout(() => {
                        overlay.remove();
                        // Final safety check to ensure app is visible
                        const appWindow = document.querySelector('.app-window');
                        if (appWindow) {
                            appWindow.style.opacity = '1';
                            appWindow.style.filter = 'blur(0)';
                        }
                    }, 1000);
                    initApp();
                }, 500);
            }
        }, 200); // Fast technical log
    }, 2500); // Splash screen duration
}

// --- Bio-ID Account System ---
let currentUser = JSON.parse(localStorage.getItem('eclipse_user')) || null;

function updateBioIdUI() {
    const btnText = document.getElementById('bioIdText');
    if (currentUser) {
        btnText.innerText = `OPERATOR: ${currentUser.username.toUpperCase()}`;
    } else {
        btnText.innerText = 'ENROLL_BIO_ID';
    }
}

function initBioIdSystem() {
    const bioIdBtn = document.getElementById('bioIdBtn');
    const bioModal = document.getElementById('bio-id-modal');
    const cancelBtn = document.getElementById('cancel-enroll-btn');
    const confirmBtn = document.getElementById('confirm-enroll-btn');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const modalTitle = document.getElementById('modal-title');
    const authStatus = document.getElementById('auth-status');
    
    let mode = 'login'; // 'login' or 'signup'

    const switchMode = (newMode) => {
        mode = newMode;
        if (mode === 'login') {
            tabLogin.classList.add('active');
            tabSignup.classList.remove('active');
            modalTitle.innerText = 'SYSTEM ACCESS';
            modalTitle.setAttribute('data-text', 'SYSTEM ACCESS');
            confirmBtn.innerText = 'VERIFY_ID';
        } else {
            tabSignup.classList.add('active');
            tabLogin.classList.remove('active');
            modalTitle.innerText = 'BIO ENROLLMENT';
            modalTitle.setAttribute('data-text', 'BIO ENROLLMENT');
            confirmBtn.innerText = 'ENROLL_ID';
        }
        authStatus.innerText = '';
    };

    tabLogin.onclick = () => switchMode('login');
    tabSignup.onclick = () => switchMode('signup');
    
    bioIdBtn.onclick = () => {
        if (currentUser) {
            showConfirm(`SYSTEM_LOGOUT: DISCONNECT BIO-ID [${currentUser.username}]?`, () => {
                currentUser = null;
                localStorage.removeItem('eclipse_user');
                updateBioIdUI();
                goHome();
            });
        } else {
            switchMode('login');
            bioModal.style.display = 'flex';
        }
    };

    cancelBtn.onclick = () => {
        bioModal.style.display = 'none';
    };

    confirmBtn.onclick = async () => {
        const username = document.getElementById('bio-username').value;
        const pass = document.getElementById('bio-password').value;

        if (username.length < 3 || pass.length < 4) {
            authStatus.innerHTML = '<span style="color: var(--red)">ERROR: IDENTIFIER STRINGS TOO SHORT</span>';
            return;
        }

        confirmBtn.innerText = 'VERIFYING...';
        confirmBtn.disabled = true;

        let success = false;

        if (mode === 'login') {
            if (username.toUpperCase() === 'ADMIN' && pass === 'ECLIPSE_MASTER') {
                currentUser = { username: 'Admin', access: 'admin', enrolled: 'SYSTEM_GENESIS' };
                success = true;
            } else if (sb) {
                // Cloud Sync Login
                const { data, error } = await sb.from('users').select('*').eq('username', username).eq('password', pass).single();
                if (data) {
                    currentUser = { username: data.username, access: data.access, enrolled: data.created_at };
                    success = true;
                } else {
                    authStatus.innerHTML = '<span style="color: var(--red)">ERROR: CLOUD_SYNC_INVALID_ID</span>';
                }
            } else {
                // Local Fallback Login
                const stored = JSON.parse(localStorage.getItem('eclipse_registered_user'));
                if (stored && stored.username === username && stored.password === pass) {
                    currentUser = { username: stored.username, access: stored.access, enrolled: stored.enrolled };
                    success = true;
                } else {
                    authStatus.innerHTML = '<span style="color: var(--red)">ERROR: INVALID_LOCAL_ID</span>';
                }
            }
        } else {
            // Signup logic
            if (sb) {
                // Cloud Sync Signup
                const { data, error } = await sb.from('users').insert([{ username, password: pass, access: 'standard' }]).select();
                if (error) {
                    authStatus.innerHTML = `<span style="color: var(--red)">ERROR: CLOUD_SYNC_FAILED [${error.message}]</span>`;
                } else {
                    currentUser = { username: data[0].username, access: data[0].access, enrolled: data[0].created_at };
                    success = true;
                }
            } else {
                // Local Fallback Signup
                const newUser = { username, password: pass, access: 'standard', enrolled: new Date().toISOString() };
                localStorage.setItem('eclipse_registered_user', JSON.stringify(newUser));
                currentUser = { username: newUser.username, access: newUser.access, enrolled: newUser.enrolled };
                success = true;
            }
        }

        if (success) {
            localStorage.setItem('eclipse_user', JSON.stringify(currentUser));
            setTimeout(() => {
                bioModal.style.display = 'none';
                confirmBtn.innerText = mode === 'login' ? 'VERIFY_ID' : 'ENROLL_ID';
                confirmBtn.disabled = false;
                updateBioIdUI();
                goHome();
                showNotify(`SUCCESS: BIO-ID [${currentUser.username.toUpperCase()}] SYNCHRONIZED.`);
            }, 1200);
        } else {
            confirmBtn.innerText = mode === 'login' ? 'VERIFY_ID' : 'ENROLL_ID';
            confirmBtn.disabled = false;
        }
    };

    updateBioIdUI();
}

function initApp() {
    applySidebarStagger();
    startUptimeCounter();
    initBackToTop();
    initTrackSelector();
    mergeTranslations();
    updateUIStrings();
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        if (window.innerWidth <= 1024) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }
    
    // Verify Data Integrity
    console.log("ECLIPSE_CORE: Verifying data presence...");
    const checkData = () => {
        if (!window.WIKI_DATA || !window.CATEGORIES) {
            console.error("ECLIPSE_CORE: CRITICAL DATA MISSING");
            showNotify("CRITICAL: DATABASE OFFLINE", "error");
            return false;
        }
        return true;
    };

    const tryRender = (retries = 0) => {
        if (!checkData() && retries < 20) {
            console.log(`ECLIPSE_CORE: Retrying database connection... (${retries})`);
            setTimeout(() => tryRender(retries + 1), 500);
            return;
        }
        
        try {
            renderSidebar(); applySidebarStagger();
        } catch (e) {
            console.error("ECLIPSE_CORE: renderSidebar failed", e);
        }
    };
    
    tryRender();
    
    try {
        initBioIdSystem();
    } catch (e) {
        console.error("ECLIPSE_CORE: initBioIdSystem failed", e);
    }
    
    // Smoothly reveal the app
    const appWindow = document.querySelector('.app-window');
    if (appWindow) {
        appWindow.style.opacity = '1';
        appWindow.style.filter = 'blur(0)';
    }

    try {
        goHome();
    } catch (e) {
        console.error("ECLIPSE_CORE: goHome failed", e);
    }

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
    const appWindow = document.querySelector('.app-window');
    if (appWindow) {
        appWindow.style.opacity = '0'; // Start hidden
        appWindow.style.filter = 'blur(20px)';
        appWindow.style.pointerEvents = 'none'; // Non-interactable until boot
    }
    attachInitListener();
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderSidebar(e.target.value);
        });
    }
    
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
                const searchInput = document.getElementById('searchInput');
                renderSidebar(searchInput ? searchInput.value : '');
                
                // Trigger Google Translate
                triggerGoogleTranslate(val);
                
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

    const toggleSidebar = () => {
        if (!sidebar) return;
        sidebar.classList.toggle('collapsed');
        console.log("ECLIPSE_CORE: Sidebar toggled", sidebar.classList.contains('collapsed'));
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            toggleSidebar();
        }
    });

    const mobileOverlay = document.getElementById('mobile-sidebar-overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.add('collapsed');
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

    // --- Back to Top Logic ---
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollArea = document.getElementById('article-mount');

    if (backToTopBtn && scrollArea) {
        scrollArea.addEventListener('scroll', () => {
            if (scrollArea.scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
    mount.classList.remove('article-loading');
    void mount.offsetWidth; // trigger reflow
    mount.classList.add('article-loading');
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

// Render Sidebar helper

function renderSidebar(filter = '') {
    const navEl = document.getElementById('sidebar-nav');
    if (!navEl) return;
    navEl.innerHTML = '';
    
    const categories = window.CATEGORIES || {};
    const wikiData = window.WIKI_DATA || [];
    const currentLang = localStorage.getItem('eclipse_lang') || 'en';
    
    console.log("ECLIPSE_SIDEBAR: Initializing render", { 
        catCount: Object.keys(categories).length, 
        wikiCount: wikiData.length,
        filter: filter 
    });
    
    // Add Dynamic Compounds
    for (const [catKey, catData] of Object.entries(categories)) {
        try {
            const items = wikiData.filter(item => {
                if (!item) return false;
                const searchStr = (filter || "").toLowerCase();
                const nameMatch = (item.name || "").toLowerCase().includes(searchStr);
                const idMatch = (item.id || "").toLowerCase().includes(searchStr);
                const folderMatch = (item.folder || "").toLowerCase().includes(searchStr);
                const akaMatch = (item.aka || "").toLowerCase().includes(searchStr);
                const estersMatch = (item.esters || "").toLowerCase().includes(searchStr);
                return item.category === catKey && (nameMatch || idMatch || folderMatch || akaMatch || estersMatch);
            });

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
                folderDiv.className = 'nav-folder' + (filter !== '' ? ' open' : '');
                
                const folderHead = document.createElement('div');
                folderHead.className = 'nav-folder-head';
                folderHead.innerHTML = `
                    <i class="fas fa-folder folder-icon"></i>
                    <span>${folderName.toUpperCase()}</span>
                    <i class="fas fa-chevron-right arrow"></i>
                `;
                folderHead.onclick = () => {
                    folderDiv.classList.toggle('open');
                    const icon = folderHead.querySelector('.folder-icon');
                    if (folderDiv.classList.contains('open')) {
                        icon.classList.replace('fa-folder', 'fa-folder-open');
                    } else {
                        icon.classList.replace('fa-folder-open', 'fa-folder');
                    }
                };
                
                const folderContent = document.createElement('div');
                folderContent.className = 'nav-folder-content';
                if (filter !== '') {
                    folderContent.style.maxHeight = 'none'; // Ensure visibility if searching
                }
                
                folderItems.forEach(item => renderNavItem(item, folderContent, true)); // True means sub-item
                
                folderDiv.appendChild(folderHead);
                folderDiv.appendChild(folderContent);
                navEl.appendChild(folderDiv);
            }
        }
    } catch (err) {
        console.error("ECLIPSE_SIDEBAR: Error rendering category", catKey, err);
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

        const vaultBtn = document.createElement('div');
        vaultBtn.className = 'nav-item';
        vaultBtn.innerText = '> _RESEARCH_VAULT';
        vaultBtn.id = 'vault-nav-btn';
        vaultBtn.style.color = '#00d4ff';
        vaultBtn.onclick = () => loadVaultView();
        navEl.appendChild(vaultBtn);

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

    // Add Support Button
    if (filter === '') {
        const supportWrap = document.createElement('div');
        supportWrap.className = 'donate-trigger-wrap';
        supportWrap.innerHTML = `
            <button class="cyber-btn donate-trigger" onclick="openDonationModal()">
                <i class="fas fa-heart"></i> _CONTRIBUTE
            </button>
        `;
        navEl.appendChild(supportWrap);
    }

    if (navEl.innerHTML === '') {
        const empty = document.createElement('div');
        empty.className = 'nav-item';
        empty.style.color = 'var(--muted)';
        empty.innerText = filter === '' ? '> NO_RECORDS_FOUND' : '> NO_MATCHES_FOUND';
        navEl.appendChild(empty);
    }
}

// Modal Logic
function openDonationModal() {
    document.getElementById('donation-modal').classList.add('active');
}

function closeDonationModal() {
    document.getElementById('donation-modal').classList.remove('active');
}

function copyAddress(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        // Find the button in the same crypto-card
        const codeEl = document.getElementById(id);
        const card = codeEl.closest('.crypto-card');
        const btn = card.querySelector('.copy-btn');
        
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check" style="color: var(--accent2)"></i>';
        setTimeout(() => {
            btn.innerHTML = originalIcon;
        }, 2000);
    });
}
 
function signalTransfer() {
    var modal = document.querySelector('.donation-window');
    if (modal) modal.classList.add('thank-you-active');
}

// Load AI View
function loadAIView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(document.getElementById('ai-nav-btn')) document.getElementById('ai-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "ECLIPSE_CORTEX_AI";

    const mount = document.getElementById('article-mount');
    
    if (!currentUser) {
        mount.innerHTML = `
            <div class="empty-state">
                <div class="glitch-icon" style="color: var(--red)"><i class="fas fa-brain"></i></div>
                <h2 class="glitch-small" data-text="NEURAL_LINK_FAILED" style="color: var(--red)">NEURAL_LINK_FAILED</h2>
                <p style="max-width: 400px; line-height: 1.6; margin-bottom: 25px;">The Cortex AI requires a secure neural handshake via a verified BIO-ID to process heuristic research queries.</p>
                <button onclick="document.getElementById('bioIdBtn').click()" class="cyber-btn">ENROLL_BIO_ID_FOR_ACCESS</button>
            </div>
        `;
        return;
    }
    
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
            if (window.innerWidth > 768) inputEl.focus(); 
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
        "SYNTHESIZING_RESPONSE_MATRIX",
        "EVALUATING_HEURISTIC_PROJECTIONS",
        "CALIBRATING_INTERACTION_MATRIX",
        "SIMULATING_METABOLIC_DEGRADATION",
        "VERIFYING_RECEPTOR_AFFINITY",
        "ACCESSING_ARCHIVAL_RESEARCH_LOGS"
    ];
    // Dynamic selection based on query complexity
    const complexity = query.length > 30 ? 6 : 4;
    const count = complexity + Math.floor(Math.random() * 3);
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
        
        const chatContainer = document.querySelector('.ai-chat-container');
        if (chatContainer) chatContainer.classList.add('neural-pulse');

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

        const chatContainer = document.querySelector('.ai-chat-container');
        if (chatContainer) chatContainer.classList.remove('neural-pulse');

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

function analyzeInteractions(c1, c2) {
    let risks = [];
    let synergy = [];
    
    // 1. Cardiovascular Impact
    if (c1.impact.heart >= 7 && c2.impact.heart >= 7) {
        risks.push("CRITICAL_CARDIOVASCULAR_STRAIN: Both compounds exhibit high cardiac toxicity.");
    }
    
    // 2. Stimulant + AAS (The classic risk)
    if ((c1.category === 'recreational' && c2.category === 'anabolic') || (c1.category === 'anabolic' && c2.category === 'recreational')) {
        risks.push("HEURISTIC_WARNING: Stimulant use during high-androgen phases significantly elevates LVH risk.");
    }

    // 3. Multi-Oral Liver Strain
    const isOral = (c) => c.dosage.toLowerCase().includes('oral') || c.id.match(/dbol|anavar|winny|sdrol|tbol/);
    if (isOral(c1) && isOral(c2)) {
        risks.push("HEPATOTOXIC_ALERT: Simultaneous C17-aa oral administration detected. Severe liver enzyme elevation probable.");
    }

    // 4. SSRI + MAOI (Lethal)
    if ((c1.type === 'SSRI' && c2.type === 'MAOI') || (c1.type === 'MAOI' && c2.type === 'SSRI')) {
        risks.push("LETHAL_INTERACTION: Combination of SSRIs and MAOIs carries a high risk of Serotonin Syndrome.");
    }

    // 5. Growth Synergy
    if ((c1.id.includes('somatropin') && c2.id.includes('insulin')) || (c1.id.includes('insulin') && c2.id.includes('somatropin'))) {
        synergy.push("ANABOLIC_SYNERGY: HGH and Insulin exhibit potent synergistic nutrient partitioning effects.");
    }

    // 6. Test Base Requirement
    if (c1.category === 'anabolic' && c2.category === 'anabolic') {
        if (!c1.id.includes('testosterone') && !c2.id.includes('testosterone')) {
            risks.push("PHYSIOLOGICAL_CRASH: Dual non-testosterone AAS usage without an androgenic base detected.");
        }
    }

    return { risks, synergy };
}

function generateHeuristicProjection(c) {
    const impacts = [];
    if (c.impact.heart > 5) impacts.push("Weeks 2-4: Progressive Left Ventricular strain detected.");
    if (c.impact.liver > 5) impacts.push("Weeks 1-6: Hepatic enzyme (AST/ALT) elevation trend.");
    if (c.impact.brain > 5) impacts.push("Phase 1: Significant neurotransmitter receptor downregulation.");
    if (impacts.length === 0) impacts.push("Phase 1: Gradual homeostatic adjustment with minimal systemic flux.");
    
    return impacts.map(i => `<div>> ${i}</div>`).join('');
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
        aiSession.lastCompound = identifiedCompound;
        const c = identifiedCompound;
        const msgHeader = `<div class="msg-meta">[TARGET: ${originalTerm}]</div>`;
        
        // --- Multi-Compound Detection (v4.0) ---
        const secondaryCompound = WIKI_DATA.find(alt => alt.id !== c.id && (query.includes(alt.name.toLowerCase()) || query.includes(alt.id)));
        
        if (secondaryCompound) {
            const analysis = analyzeInteractions(c, secondaryCompound);
            let report = `<div class="msg-meta">[MATRIX_ANALYSIS: ${c.name} + ${secondaryCompound.name}]</div>`;
            report += `<div class="ai-report-section">`;
            report += `<div class="report-header">[HEURISTIC_INTERACTION_REPORT]</div>`;
            
            if (analysis.risks.length > 0) {
                report += `<div class="report-risk-list">`;
                analysis.risks.forEach(r => report += `<div style="color:var(--red); margin-bottom: 5px;">> ${r}</div>`);
                report += `</div>`;
            } else {
                report += `<p>No critical contraindications identified between identified entities.</p>`;
            }

            if (analysis.synergy.length > 0) {
                report += `<div class="report-synergy-list" style="margin-top: 10px; border-top: 1px solid var(--border); padding-top: 10px;">`;
                analysis.synergy.forEach(s => report += `<div style="color:var(--accent)">> ${s}</div>`);
                report += `</div>`;
            }
            
            report += `</div>`;
            report += `<div class="ai-suggestion">Interaction matrix finalized. Should I simulate a prolonged metabolic projection for this combination?</div>`;
            return report;
        }

        // --- New: Heuristic Projection Trigger ---
        if (query.includes('project') || query.includes('timeline') || query.includes('weeks')) {
            const projection = generateHeuristicProjection(c);
            return `${msgHeader}<div class="ai-report-section">
                <div class="report-header">[METABOLIC_PROJECTION_MODEL]</div>
                <div class="projection-log">${projection}</div>
            </div>
            <div class="ai-suggestion">Projection model based on heuristic markers. Clinical results may vary.</div>`;
        }

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
            
            report += `<div class="ai-suggestion">Analysis complete. Would you like to project these effects over a standard 12-week timeline?</div>`;
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
                ${item.aka ? `<div class="aka-row"><i class="fas fa-tags"></i> AKA: <span class="aka-names">${item.aka}</span></div>` : ''}
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
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderSidebar(e.target.value);
    });
}

// -------------------------
// Initialization
// -------------------------

let customStack = [];

// Load Cycle Coach View
function loadCoachView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(document.getElementById('coach-nav-btn')) document.getElementById('coach-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "AI CYCLE ARCHITECT";

    const mount = document.getElementById('article-mount');
    
    if (!currentUser) {
        mount.innerHTML = `
            <div class="empty-state">
                <div class="glitch-icon" style="color: var(--red)"><i class="fas fa-lock"></i></div>
                <h2 class="glitch-small" data-text="ACCESS RESTRICTED" style="color: var(--red)">ACCESS RESTRICTED</h2>
                <p style="max-width: 400px; line-height: 1.6; margin-bottom: 25px;">The AI Cycle Architect requires a verified BIO-ID to initialize biological parameter calculations and protocol synthesis.</p>
                <button onclick="document.getElementById('bioIdBtn').click()" class="cyber-btn">ENROLL_BIO_ID_TO_CONTINUE</button>
            </div>
        `;
        return;
    }
    
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
                    <div style="display: flex; gap: 10px; grid-column: 1 / -1;">
                        <button id="download-protocol-btn" class="cyber-btn" style="flex: 1; border-color: var(--muted); color: var(--muted); margin-top:5px; display: none;" onclick="downloadProtocol()">EXPORT_TXT</button>
                        <button id="save-protocol-btn" class="cyber-btn" style="flex: 1; border-color: var(--accent); color: var(--accent); margin-top:5px; display: none;" onclick="saveProtocolToVault()">SAVE_TO_VAULT</button>
                    </div>
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
    document.getElementById('save-protocol-btn').style.display = 'block';
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

window.saveProtocolToVault = async function() {
    const content = document.getElementById('cycle-result').innerHTML;
    const title = document.querySelector('#cycle-result h3')?.innerText || "Untitled Protocol";
    
    const newEntry = {
        id: 'prot_' + Date.now(),
        title: title,
        content: content,
        timestamp: new Date().toISOString(),
        type: 'AI_ARCHITECT'
    };

    if (sb) {
        const { error } = await sb.from('vault').insert([{ 
            user_id: currentUser.username, 
            data: newEntry 
        }]);
        if (error) {
            showNotify("CLOUD_SAVE_FAILED: " + error.message);
            return;
        }
    } else {
        const vault = JSON.parse(localStorage.getItem('eclipse_vault') || '[]');
        vault.push(newEntry);
        localStorage.setItem('eclipse_vault', JSON.stringify(vault));
    }

    showNotify("PROTOCOL_SYNCED: Saved to Research Vault.");
}

function loadVaultView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(document.getElementById('vault-nav-btn')) document.getElementById('vault-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "RESEARCH VAULT";

    const mount = document.getElementById('article-mount');
    
    if (!currentUser) {
        mount.innerHTML = `
            <div class="empty-state">
                <div class="glitch-icon" style="color: var(--red)"><i class="fas fa-lock"></i></div>
                <h2 class="glitch-small" data-text="ACCESS RESTRICTED" style="color: var(--red)">ACCESS RESTRICTED</h2>
                <p style="max-width: 400px; line-height: 1.6; margin-bottom: 25px;">The Research Vault requires a verified BIO-ID to decrypt and load personal pharmacological data logs.</p>
                <button onclick="document.getElementById('bioIdBtn').click()" class="cyber-btn">ENROLL_BIO_ID_FOR_ACCESS</button>
            </div>
        `;
        return;
    }

    mount.innerHTML = `
        <div class="vault-view">
            <div class="vault-header">
                <h2><i class="fas fa-database"></i> RESEARCH_VAULT // ${currentUser.username.toUpperCase()}</h2>
                <p>Personalized dossier of archived protocols, stacks, and clinical assessments.</p>
            </div>
            
            <div id="vault-list" class="vault-list">
                <div class="loading-msg">SYNCHRONIZING_WITH_VAULT...</div>
            </div>
        </div>
    `;

    renderVaultItems();
}

async function renderVaultItems() {
    const listEl = document.getElementById('vault-list');
    let items = [];

    if (sb) {
        const { data, error } = await sb.from('vault').select('*').eq('user_id', currentUser.username);
        if (data) items = data.map(d => d.data);
    } else {
        items = JSON.parse(localStorage.getItem('eclipse_vault') || '[]');
    }

    if (items.length === 0) {
        listEl.innerHTML = `
            <div class="empty-vault-msg">
                <i class="fas fa-folder-open"></i>
                <p>Vault is empty. Generate and save protocols in the Cycle Architect to populate this sector.</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = items.reverse().map(item => `
        <div class="vault-card">
            <div class="vault-card-header">
                <div class="vault-card-title">${item.title}</div>
                <div class="vault-card-meta">${item.type} // ${new Date(item.timestamp).toLocaleDateString()}</div>
            </div>
            <div class="vault-card-body">${item.content}</div>
            <div class="vault-card-actions">
                <button class="cyber-btn tiny" onclick="deleteFromVault('${item.id}')">DELETE_ENTRY</button>
            </div>
        </div>
    `).join('');
}

window.deleteFromVault = async function(id) {
    showConfirm("PERMANENT_DELETE: Are you sure you want to purge this data log from the vault?", async () => {
        if (sb) {
            // Complex to delete by nested data ID in Supabase if using one row, 
            // but for now we'll just assume a simpler table structure or filter local for MVP
            showNotify("CLOUD_DELETE: Not implemented for MVP. Please use local mode.");
        } else {
            let vault = JSON.parse(localStorage.getItem('eclipse_vault') || '[]');
            vault = vault.filter(v => v.id !== id);
            localStorage.setItem('eclipse_vault', JSON.stringify(vault));
            renderVaultItems();
            showNotify("ENTRY_PURGED: Data log removed.");
        }
    });
}

// Synthesis Oracle View
function loadSynthesisView() {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(document.getElementById('synthesis-nav-btn')) document.getElementById('synthesis-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "SYNTHESIS ORACLE";

    const mount = document.getElementById('article-mount');
    
    if (!currentUser) {
        mount.innerHTML = `
            <div class="empty-state">
                <div class="glitch-icon" style="color: var(--red)"><i class="fas fa-vial"></i></div>
                <h2 class="glitch-small" data-text="DATABASE_LOCKED" style="color: var(--red)">DATABASE_LOCKED</h2>
                <p style="max-width: 400px; line-height: 1.6; margin-bottom: 25px;">Synthesis protocols for peptide structures and chemical precursors are restricted to authorized research Bio-IDs.</p>
                <button onclick="document.getElementById('bioIdBtn').click()" class="cyber-btn">VERIFY_BIO_ID_FOR_SYNTHESIS</button>
            </div>
        `;
        return;
    }

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

    if (window.innerWidth > 768) document.getElementById('oracle-search').focus();
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
    if(document.getElementById('pathology-nav-btn')) document.getElementById('pathology-nav-btn').classList.add('active');
    document.getElementById('current-category').innerText = "PATHOLOGY SOLVER";

    const mount = document.getElementById('article-mount');
    
    if (!currentUser) {
        mount.innerHTML = `
            <div class="empty-state">
                <div class="glitch-icon" style="color: var(--red)"><i class="fas fa-heartbeat"></i></div>
                <h2 class="glitch-small" data-text="MEDICAL_BLOCKADE" style="color: var(--red)">MEDICAL_BLOCKADE</h2>
                <p style="max-width: 400px; line-height: 1.6; margin-bottom: 25px;">The Pathology Solver module contains sensitive clinical data. BIO-ID verification is mandatory for symptomatic cross-referencing.</p>
                <button onclick="document.getElementById('bioIdBtn').click()" class="cyber-btn">AUTHENTICATE_TO_SOLVE</button>
            </div>
        `;
        return;
    }
    
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
            if (window.innerWidth > 768) input.focus();
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
        'energy': ['stimulant', 'focus', 'amphetamine', 'caffeine'],
        'sad': ['antidepressants', 'depression', 'fluoxetine', 'sertraline', 'mood'],
        'depressed': ['antidepressants', 'depression', 'mood'],
        'longevity': ['longevity', 'anti-aging', 'nad+', 'mots-c'],
        'aging': ['anti-aging', 'nad+', 'mots-c', 'longevity'],
        'healing': ['healing', 'tb-500', 'tb4', 'growth factors', 'peptides'],
        'recovery': ['healing', 'tb-500', 'growth factors'],
        'pain': ['opioids', 'analgesic', 'morphine', 'codeine', 'oxycodone'],
        'hurt': ['pain', 'analgesic', 'morphine']
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
    if(document.getElementById('finder-nav-btn')) document.getElementById('finder-nav-btn').classList.add('active');
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
    if(document.getElementById('pct-nav-btn')) document.getElementById('pct-nav-btn').classList.add('active');
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
        showNotify("Please enter dose and date.");
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
    
    if (!currentUser) {
        mount.innerHTML = `
            <div class="empty-state">
                <div class="glitch-icon" style="color: var(--red)"><i class="fas fa-microscope"></i></div>
                <h2 class="glitch-small" data-text="VERIFICATION_HALTED" style="color: var(--red)">VERIFICATION_HALTED</h2>
                <p style="max-width: 400px; line-height: 1.6; margin-bottom: 25px;">Certificate of Analysis generation requires a validated operator ID to prevent unauthorized forensic data retrieval.</p>
                <button onclick="document.getElementById('bioIdBtn').click()" class="cyber-btn">VALIDATE_BIO_ID</button>
            </div>
        `;
        return;
    }
    
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
    var container = document.getElementById('hologram-canvas-container');
    if (!container) return;
    if (holoRequestID) cancelAnimationFrame(holoRequestID);
    if (holoRenderer) { container.innerHTML = ''; holoRenderer.dispose(); }

    holoScene = new THREE.Scene();

    holoCamera = new THREE.PerspectiveCamera(40, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    holoCamera.position.set(0, 1.5, 6);
    holoCamera.lookAt(0, 0, 0);

    holoRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    holoRenderer.setSize(container.offsetWidth, container.offsetHeight);
    holoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(holoRenderer.domElement);

    // Lighting
    holoScene.add(new THREE.AmbientLight(0x40a0b0, 2.5));
    var keyLight = new THREE.PointLight(0x00f0ff, 4, 25);
    keyLight.position.set(3, 3, 3);
    holoScene.add(keyLight);
    var fillLight = new THREE.PointLight(0xb5ff4d, 2.5, 20);
    fillLight.position.set(-3, -1, 2);
    holoScene.add(fillLight);
    var rimLight = new THREE.PointLight(0xff3a5c, 1.5, 18);
    rimLight.position.set(0, -3, -3);
    holoScene.add(rimLight);

    // Materials
    var cyMat = new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x004060, transparent: true, opacity: 0.55, wireframe: true, shininess: 100 });
    var cyFill = new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x003040, transparent: true, opacity: 0.18, shininess: 80 });
    var grMat = new THREE.MeshPhongMaterial({ color: 0xb5ff4d, emissive: 0x204000, transparent: true, opacity: 0.55, wireframe: true });
    var rdMat = new THREE.MeshPhongMaterial({ color: 0xff3a5c, emissive: 0x400020, transparent: true, opacity: 0.55, wireframe: true });
    var orMat = new THREE.MeshPhongMaterial({ color: 0xff9d00, emissive: 0x402000, transparent: true, opacity: 0.55, wireframe: true });
    var glowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.08 });
    var lineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 });

    var group = new THREE.Group();

    // Base plate
    var baseGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.06, 48);
    var baseMat = new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x001015, transparent: true, opacity: 0.15 });
    var base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -2.2;
    group.add(base);
    var baseRing = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.02, 8, 64), new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 }));
    baseRing.rotation.x = Math.PI/2; baseRing.position.y = -2.17;
    group.add(baseRing);
    // Grid on base
    for (var gi = -2; gi <= 2; gi += 0.4) {
        var pts1 = [new THREE.Vector3(gi, -2.17, -2.3), new THREE.Vector3(gi, -2.17, 2.3)];
        var pts2 = [new THREE.Vector3(-2.3, -2.17, gi), new THREE.Vector3(2.3, -2.17, gi)];
        var gMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.06 });
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts1), gMat));
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), gMat));
    }

    // Scan ring helper
    function addScan(g, r) {
        var sr = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 8, 64), new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.5 }));
        sr.rotation.x = Math.PI/2; sr.userData.scan = true; g.add(sr);
    }
    // Particles
    function addDust(g, n, s) {
        for (var i=0;i<n;i++) {
            var p = new THREE.Mesh(new THREE.SphereGeometry(0.015+Math.random()*0.02,4,4), new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.3+Math.random()*0.5 }));
            p.position.set((Math.random()-0.5)*s,(Math.random()-0.5)*s,(Math.random()-0.5)*s);
            p.userData.drift = {spd:0.001+Math.random()*0.003, off:Math.random()*6.28}; g.add(p);
        }
    }

    if (type === 'pill') {
        var outer = new THREE.Mesh(new THREE.CapsuleGeometry(0.85,1.5,12,32), cyMat);
        var fill = new THREE.Mesh(new THREE.CapsuleGeometry(0.85,1.5,12,32), cyFill);
        var inner = new THREE.Mesh(new THREE.CapsuleGeometry(0.45,0.9,6,16), grMat);
        var band = new THREE.Mesh(new THREE.TorusGeometry(0.87,0.04,12,48), new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, transparent: true, opacity: 0.8 }));
        band.rotation.x = Math.PI/2;
        var glow = new THREE.Mesh(new THREE.CapsuleGeometry(1.1,1.8,6,16), glowMat);
        group.add(outer, fill, inner, band, glow);
        for (var i=0;i<50;i++) {
            var sz = 0.02+Math.random()*0.04;
            var mat = i%4===0 ? grMat : (i%5===0 ? rdMat : cyMat);
            var dot = new THREE.Mesh(new THREE.SphereGeometry(sz,6,6), mat);
            var r=0.55*Math.sqrt(Math.random()), th=Math.random()*6.28, y=(Math.random()-0.5)*1.8;
            dot.position.set(r*Math.cos(th),y,r*Math.sin(th)); group.add(dot);
        }
        addScan(group,1.1); addDust(group,35,4);

    } else if (type === 'vial') {
        var body = new THREE.Mesh(new THREE.CylinderGeometry(0.65,0.65,2.2,32), cyMat);
        var bodyF = new THREE.Mesh(new THREE.CylinderGeometry(0.65,0.65,2.2,32), cyFill);
        var btm = new THREE.Mesh(new THREE.SphereGeometry(0.65,32,16,0,6.28,1.57,1.57), cyFill);
        btm.position.y = -1.1;
        var shldr = new THREE.Mesh(new THREE.CylinderGeometry(0.35,0.65,0.4,32), cyMat);
        shldr.position.y = 1.3;
        var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.35,0.35,0.5,32), cyMat);
        neck.position.y = 1.6;
        var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.42,0.25,32), new THREE.MeshPhongMaterial({ color: 0xb5ff4d, emissive: 0xb5ff4d, transparent: true, opacity: 0.6, wireframe: true }));
        cap.position.y = 1.95;
        var liq = new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.55,1.4,24), new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x003040, transparent: true, opacity: 0.15 }));
        liq.position.y = -0.2; liq.userData.liquid = true;
        group.add(body,bodyF,btm,shldr,neck,cap,liq);
        // Measurement ticks
        for (var m=0;m<7;m++) { var ly=-0.9+m*0.3, tl=m%2===0?0.18:0.1;
            group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.66,ly,0), new THREE.Vector3(0.66+tl,ly,0)]), lineMat));
        }
        // Bubbles
        for (var b=0;b<15;b++) {
            var bub = new THREE.Mesh(new THREE.SphereGeometry(0.025+Math.random()*0.035,8,8), new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x004050, transparent: true, opacity: 0.25 }));
            bub.position.set((Math.random()-0.5)*0.7,-0.8+Math.random()*1.2,(Math.random()-0.5)*0.7);
            bub.userData.bub = {spd:0.002+Math.random()*0.004, off:Math.random()*6.28}; group.add(bub);
        }
        var glow2 = new THREE.Mesh(new THREE.CylinderGeometry(0.9,0.9,2.8,16), glowMat);
        group.add(glow2);
        addScan(group,0.85); addDust(group,30,3.5);

    
    } else if (type === 'dna') {
        var N=70, R=0.95, H=5.5, c1=[], c2=[];
        var dnaGroup = new THREE.Group();
        for (var i=0;i<N;i++) {
            var t=i/N, a=t*Math.PI*8, y=t*H-H/2;
            var x1=Math.sin(a)*R, z1=Math.cos(a)*R;
            var x2=Math.sin(a+Math.PI)*R, z2=Math.cos(a+Math.PI)*R;
            var s1=new THREE.Mesh(new THREE.SphereGeometry(0.055,10,10), cyMat);
            s1.position.set(x1,y,z1); dnaGroup.add(s1); c1.push(new THREE.Vector3(x1,y,z1));
            var s2=new THREE.Mesh(new THREE.SphereGeometry(0.055,10,10), cyMat);
            s2.position.set(x2,y,z2); dnaGroup.add(s2); c2.push(new THREE.Vector3(x2,y,z2));
            if (i%2===0) {
                var mx=(x1+x2)/2, mz=(z1+z2)/2;
                var c1m = i%4===0 ? 0xb5ff4d : 0xff9d00;
                var c2m = i%4===0 ? 0xff3a5c : 0x00f0ff;
                dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x1,y,z1),new THREE.Vector3(mx,y,mz)]), new THREE.LineBasicMaterial({color:c1m,transparent:true,opacity:0.5})));
                dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(mx,y,mz),new THREE.Vector3(x2,y,z2)]), new THREE.LineBasicMaterial({color:c2m,transparent:true,opacity:0.5})));
                var hb=new THREE.Mesh(new THREE.OctahedronGeometry(0.04,0), new THREE.MeshPhongMaterial({color:0xffffff,emissive:0x404040,transparent:true,opacity:0.6}));
                hb.position.set(mx,y,mz); dnaGroup.add(hb);
            }
            if (i%6===0) {
                var nd=new THREE.Mesh(new THREE.OctahedronGeometry(0.1,0), grMat);
                nd.position.set(x1,y,z1); dnaGroup.add(nd);
            }
        }
        dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(c1), new THREE.LineBasicMaterial({color:0x00f0ff,transparent:true,opacity:0.7})));
        dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(c2), new THREE.LineBasicMaterial({color:0x00f0ff,transparent:true,opacity:0.7})));
        addDust(dnaGroup,50,5); addScan(dnaGroup,1.3);
        dnaGroup.rotation.z = Math.PI/2;
        group.add(dnaGroup);

        

    } else {
        var atoms = [
            {p:[0,0,0],s:0.5,c:0x00f0ff},{p:[1.3,0.3,0.2],s:0.3,c:0x00f0ff},
            {p:[-1.1,-0.4,0.3],s:0.3,c:0xb5ff4d},{p:[0.4,1.2,0.6],s:0.3,c:0x00f0ff},
            {p:[-0.3,-1.1,-0.5],s:0.3,c:0xb5ff4d},{p:[0.1,0.4,1.3],s:0.25,c:0xff9d00},
            {p:[-0.2,-0.3,-1.2],s:0.25,c:0xff9d00},{p:[1.7,0.9,0.8],s:0.2,c:0xff3a5c},
            {p:[-1.5,0.6,-0.7],s:0.2,c:0xff3a5c},{p:[0.8,-1.3,0.9],s:0.2,c:0xb5ff4d},
            {p:[-0.9,1.4,-0.4],s:0.2,c:0x00f0ff},{p:[1.9,-0.5,-0.3],s:0.15,c:0x00f0ff},
            {p:[-1.8,-0.8,0.5],s:0.15,c:0xff9d00},{p:[0.5,1.8,-0.8],s:0.15,c:0xb5ff4d}
        ];
        atoms.forEach(function(a,idx){
            var am=new THREE.MeshPhongMaterial({color:a.c,emissive:a.c,emissiveIntensity:0.15,transparent:true,opacity:0.45,wireframe:true,shininess:120});
            var af=new THREE.MeshPhongMaterial({color:a.c,emissive:a.c,emissiveIntensity:0.05,transparent:true,opacity:0.1});
            var m=new THREE.Mesh(new THREE.SphereGeometry(a.s,20,20),am);
            var f=new THREE.Mesh(new THREE.SphereGeometry(a.s,20,20),af);
            m.position.set(a.p[0],a.p[1],a.p[2]); f.position.set(a.p[0],a.p[1],a.p[2]);
            group.add(m,f);
            if(a.s>0.2){
                var sh=new THREE.Mesh(new THREE.SphereGeometry(a.s*1.7,10,10),new THREE.MeshBasicMaterial({color:a.c,transparent:true,opacity:0.04}));
                sh.position.set(a.p[0],a.p[1],a.p[2]); group.add(sh);
            }
            atoms.slice(idx+1).forEach(function(t){
                var d=new THREE.Vector3(a.p[0],a.p[1],a.p[2]).distanceTo(new THREE.Vector3(t.p[0],t.p[1],t.p[2]));
                if(d<2.0){
                    var dir=new THREE.Vector3(t.p[0]-a.p[0],t.p[1]-a.p[1],t.p[2]-a.p[2]).normalize();
                    var perp=new THREE.Vector3(-dir.y,dir.x,0).normalize().multiplyScalar(0.04);
                    var pa=new THREE.Vector3(a.p[0],a.p[1],a.p[2]), pb=new THREE.Vector3(t.p[0],t.p[1],t.p[2]);
                    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([pa.clone().add(perp),pb.clone().add(perp)]),lineMat));
                    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([pa.clone().sub(perp),pb.clone().sub(perp)]),lineMat));
                }
            });
        });
        addDust(group,45,5); addScan(group,1.8);
    }

    holoScene.add(group); holoMesh = group;

    // Interaction
    var drag=false, prevX=0;
    container.addEventListener('mousedown',function(e){drag=true;prevX=e.clientX;});
    window.addEventListener('mouseup',function(){drag=false;});
    window.addEventListener('mousemove',function(e){if(drag&&holoMesh){holoMesh.rotation.y+=(e.clientX-prevX)*0.01;prevX=e.clientX;}});
    container.addEventListener('touchstart',function(e){drag=true;prevX=e.touches[0].clientX;});
    window.addEventListener('touchend',function(){drag=false;});
    window.addEventListener('touchmove',function(e){if(drag&&holoMesh){holoMesh.rotation.y+=(e.touches[0].clientX-prevX)*0.01;prevX=e.touches[0].clientX;}});

    // Animation
    var time0 = Date.now();
    var animate = function() {
        holoRequestID = requestAnimationFrame(animate);
        if (!holoMesh) return;
        var t = (Date.now()-time0)*0.001;
        if (!drag) holoMesh.rotation.y += 0.003;
        holoMesh.position.y = Math.sin(t*1.2)*0.1;
        // Pulse lights
        keyLight.intensity = 2 + Math.sin(t*2)*0.5;
        fillLight.intensity = 1 + Math.sin(t*1.5+1)*0.3;
        holoMesh.traverse(function(ch){
            if(ch.userData.scan){ch.position.y=Math.sin(t*1.5)*1.8;ch.material.opacity=0.3+Math.sin(t*3)*0.2;}
            if(ch.userData.drift){ch.position.y+=Math.sin(t*2+ch.userData.drift.off)*0.0008;}
            if(ch.userData.bub){ch.position.y+=ch.userData.bub.spd*0.3;if(ch.position.y>1.2)ch.position.y=-0.8;}
            if(ch.userData.liquid){ch.rotation.z=Math.sin(t*0.8)*0.02;}
        });
        if(holoRenderer&&holoScene&&holoCamera) holoRenderer.render(holoScene,holoCamera);
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
            ver: 'v4.1.0',
            date: '2026.04.26',
            title: 'DATABANK_EXPANSION_&_SEARCH_UPGRADE',
            desc: 'Upgraded search query logic to parse global aliases (esters/aka). Mass injection of Antidepressants, Longevity Peptides (MOTS-c, NAD+), GABAergics, and Opioids (Codeine, Morphine). Fixed mobile top-bar UI overflow.',
            tags: ['MAJOR', 'DATA', 'UI']
        },
        {
            ver: 'v3.7.5',
            date: '2026.04.22',
            title: 'CONTRIBUTION_PORTAL_ACTIVE',
            desc: 'Deployed secure cryptocurrency contribution module with glassmorphism modal architecture and clipboard sync.',
            tags: ['UI', 'SYSTEM']
        },
        {
            ver: 'v3.7.0',
            date: '2026.04.22',
            title: 'GLOBAL_GLOW_PROTOCOL',
            desc: 'Broadcasted reactive photonic effects across all primary UI nodes and interactive clusters. Enhanced tactile feedback for buttons and headers.',
            tags: ['MAJOR', 'UI']
        },
        {
            ver: 'v3.6.8',
            date: '2026.04.22',
            title: 'GLOW_MATRIX_REACTIVE',
            desc: 'Implemented photonic glow effects and kinetic hover states across all navigation nodes for enhanced tactile feedback.',
            tags: ['UI', 'FX']
        },
        {
            ver: 'v3.6.0',
            date: '2026.04.22',
            title: 'GOOGLE_TRANSLATE_SYNC',
            desc: 'Integrated automated translation engine with custom UI bridging and banner suppression. Added support for 100+ global languages.',
            tags: ['MAJOR', 'I18N']
        },
        {
            ver: 'v3.5.3',
            date: '2026.04.22',
            title: 'LOGS_VISIBILITY_PATCH',
            desc: 'Enhanced color contrast for the System Logs utility and finalized production server synchronization protocols.',
            tags: ['UI', 'SYNC']
        },
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

// Logo Kinetic Overhaul
const scrambleTarget = document.getElementById('scramble-target');
const mainLogo = document.getElementById('main-logo');// Ensure all clicks work by re-attaching listeners if needed
document.addEventListener('click', (e) => {
    const target = e.target.closest('[onclick]');
    if (target) {
        const attr = target.getAttribute('onclick');
        if (attr && attr.includes('()')) {
            console.log("ECLIPSE_DEBUG: Click captured on", target.id || target.className);
        }
    }
});

if (mainLogo && scrambleTarget) {
    const chars = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ$%&#@!?';
    let isScrambling = false;

    const scramble = () => {
        if (isScrambling) return;
        isScrambling = true;
        
        const original = scrambleTarget.getAttribute('data-text');
        let iteration = 0;
        
        const interval = setInterval(() => {
            scrambleTarget.innerText = original.split('')
                .map((letter, index) => {
                    if (index < iteration) return original[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= original.length) {
                clearInterval(interval);
                isScrambling = false;
            }
            
            iteration += 1 / 3;
        }, 30);
    };

    mainLogo.addEventListener('mouseenter', scramble);
}



// --- Neural Uplink ---
function startNeuralUplink() {
    const mount = document.getElementById('boot-mount');
    const appWindow = document.querySelector('.app-window');
    const initOverlay = document.getElementById('init-trigger-overlay');
    if (!mount) return;

    if (initOverlay) initOverlay.style.display = 'none';
    mount.style.display = 'flex';
    mount.style.opacity = '1';
    mount.style.pointerEvents = 'auto';
    if (appWindow) { appWindow.style.opacity = '0'; appWindow.style.pointerEvents = 'none'; }

    let phase1Fired = false, phase2Fired = false, logIdx = 0;
    let logArea, progBar, statusText, pctText, logTimer = null;
    const now = new Date();
    const LOG_INTERVAL_MS = 320;

    const bootLogs = [
        { msg: 'BIOS_HANDSHAKE // SECURE_BOOT_VERIFIED', type: '' },
        { msg: 'LOADING_KERNEL: eclipse_core.sys', type: '' },
        { msg: 'MOUNTING_ENCRYPTED_VOLUME: /dev/pharma_idx', type: '' },
        { msg: 'DECRYPTING_COMPOUND_DATABASE... 2,912 ENTRIES', type: '' },
        { msg: 'INITIALIZING_NEURAL_MESH_INTERFACE', type: '' },
        { msg: 'ESTABLISHING_SYNAPTIC_BRIDGE: PORT 8832', type: '' },
        { msg: 'WARNING: ELEVATED_CLEARANCE_REQUIRED', type: 'warning' },
        { msg: 'CLEARANCE_GRANTED: OMEGA_LEVEL_ACCESS', type: 'success' },
        { msg: 'SYNCING_CLINICAL_TRIAL_DATA... 14.2 GB', type: '' },
        { msg: 'LOADING_MOLECULAR_RENDERER_v3.2', type: '' },
        { msg: 'CALIBRATING_DOPAMINE_PATHWAY_MODELS', type: '' },
        { msg: 'VERIFYING_BLOCKCHAIN_INTEGRITY... OK', type: 'success' },
        { msg: 'SPAWNING_AI_INFERENCE_ENGINE: 8 THREADS', type: '' },
        { msg: 'LOADING_SYNTHESIS_ORACLE', type: '' },
        { msg: 'BINDING_BIOMETRIC_SIGNATURE', type: '' },
        { msg: 'ALL_SUBSYSTEMS_NOMINAL', type: 'success' },
        { msg: 'NEURAL_UPLINK_ESTABLISHED', type: 'success' },
        { msg: 'DATABANK_EXPANSION: v4.1.0_PATCH_APPLIED', type: 'success' },
    ];

    function pushLog() {
        if (!logArea || logIdx >= bootLogs.length) { if (logTimer) clearInterval(logTimer); return; }
        const entry = bootLogs[logIdx];
        const line = document.createElement('div');
        line.className = 'intro-log-line' + (entry.type ? ' ' + entry.type : '');
        const ts = new Date(now.getTime() + logIdx * LOG_INTERVAL_MS);
        const timeStr = ts.toTimeString().split(' ')[0] + '.' + String(ts.getMilliseconds()).padStart(3,'0');
        line.innerHTML = '<span class="timestamp">' + timeStr + '</span> > ' + entry.msg;
        logArea.appendChild(line);
        logArea.scrollTop = logArea.scrollHeight;
        const pct = Math.round(((logIdx + 1) / bootLogs.length) * 100);
        if (progBar) progBar.style.width = pct + '%';
        if (pctText) pctText.innerText = pct + '%';
        if (statusText) statusText.innerText = entry.msg.split('...')[0].split(':')[0];
        logIdx++;
    }

    function startPhase1(v) {
        if (phase1Fired) return; phase1Fired = true;
        v.innerHTML = '<div class="intro-hex-grid"></div>' +
            '<div class="intro-corner tl"></div><div class="intro-corner tr"></div>' +
            '<div class="intro-corner bl"></div><div class="intro-corner br"></div>' +
            '<div class="intro-data-readout left" style="animation-delay:0.1s">NODE_ADDR: 0x7F3A92<br>CIPHER: AES-512-GCM<br>CLEARANCE: OMEGA</div>' +
            '<div class="intro-data-readout right" style="animation-delay:0.2s">KERNEL: v5.1.882<br>LATENCY: 4ms<br>UPTIME: 99.97%</div>' +
            '<div class="intro-boot-terminal">' +
                '<div class="intro-term-header"><div class="intro-term-dots"><span></span><span></span><span></span></div><span>ECLIPSE_KERNEL // BOOT_SEQUENCE</span></div>' +
                '<div class="intro-log-area" id="intro-log-area"></div>' +
                '<div class="intro-progress-wrap"><div class="intro-progress-bar" id="intro-progress-bar"></div></div>' +
                '<div class="intro-progress-text"><span id="intro-status-text">INITIALIZING...</span><span id="intro-pct-text">0%</span></div>' +
            '</div>';
        logArea = document.getElementById('intro-log-area');
        progBar = document.getElementById('intro-progress-bar');
        statusText = document.getElementById('intro-status-text');
        pctText = document.getElementById('intro-pct-text');
        logTimer = setInterval(pushLog, LOG_INTERVAL_MS);
    }

    function startPhase2(v) {
        if (phase2Fired) return; phase2Fired = true;
        if (logTimer) clearInterval(logTimer);
        while (logIdx < bootLogs.length) pushLog();
        const flash = document.createElement('div');
        flash.className = 'intro-access-granted';
        flash.innerHTML = '<div class="intro-access-text">ACCESS_GRANTED</div>';
        document.body.appendChild(flash);
        setTimeout(function() { flash.remove(); }, 1500);
        setTimeout(function() {
            if (introAudio) {
                const fadeOut = setInterval(function() {
                    if (introAudio.volume > 0.05) introAudio.volume -= 0.05;
                    else { clearInterval(fadeOut); introAudio.pause(); bgMusic.play().catch(function(e){}); }
                }, 60);
            } else { bgMusic.play().catch(function(e){}); }
            v.classList.add('fade-out');
            setTimeout(function() {
                mount.classList.add('fade-out');
                mount.style.pointerEvents = 'none';
                if (appWindow) { appWindow.style.opacity = '1'; appWindow.style.filter = 'blur(0)'; appWindow.style.pointerEvents = 'auto'; }
                setTimeout(function() { mount.style.display = 'none'; initApp(); }, 500);
            }, 1000);
        }, 400);
    }

    // ====== PHASE 0: THE VOID ======
    mount.innerHTML = '';
    const void0 = document.createElement('div');
    void0.className = 'intro-void';
    void0.innerHTML = '<div class="intro-hex-grid"></div>' +
        '<div class="intro-scan-sweep"></div>' +
        '<div class="intro-corner tl"></div><div class="intro-corner tr"></div>' +
        '<div class="intro-corner bl"></div><div class="intro-corner br"></div>' +
        '<div class="intro-data-readout left">NODE_ADDR: 0x7F3A92<br>CIPHER: AES-512-GCM<br>REGION: EU-WEST-3<br>CLEARANCE: OMEGA</div>' +
        '<div class="intro-data-readout right">KERNEL: v5.1.882<br>LATENCY: 4ms<br>UPTIME: 99.97%<br>THREAT_LVL: NULL</div>' +
        '<div class="intro-data-readout bottom-left">SESSION: ' + Date.now().toString(16).toUpperCase() + '<br>PROTOCOL: NEURAL_LINK_v3</div>' +
        '<div class="intro-data-readout bottom-right">TEMP: 31.2\u00B0C<br>PWR_DRAW: 847W</div>' +
        '<div class="intro-title-wrap">' +
            '<div class="intro-main-title" id="introGlitchTitle">ECLIPSE</div>' +
            '<div style="display:flex;justify-content:center;"><div class="intro-subtitle">BIOTECH RESEARCH TERMINAL v5.1</div></div>' +
        '</div>';
    mount.appendChild(void0);

    // Title scramble
    var titleEl = document.getElementById('introGlitchTitle');
    if (titleEl) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var original = 'ECLIPSE';
        var iter = 0;
        var glitchInterval = setInterval(function() {
            titleEl.innerText = original.split('').map(function(c, i) {
                if (i < iter) return original[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            iter += 0.4;
            if (iter >= original.length) { clearInterval(glitchInterval); titleEl.innerText = original; }
        }, 40);
    }

    // ====== AUDIO-SYNCED TRIGGERS ======
    if (introAudio) {
        introAudio.volume = bgMusic.volume;
        introAudio.currentTime = 0;
        introAudio.play().catch(function(e){});
        var onTimeUpdate = function() {
            var t = introAudio.currentTime;
            if (t >= 3.0 && !phase1Fired) startPhase1(void0);
            if (t >= 8.5 && !phase2Fired) startPhase2(void0);
        };
        introAudio.addEventListener('timeupdate', onTimeUpdate);
        introAudio.addEventListener('ended', function() {
            introAudio.removeEventListener('timeupdate', onTimeUpdate);
            if (!phase2Fired) startPhase2(void0);
        }, { once: true });
    } else {
        setTimeout(function() { startPhase1(void0); }, 3000);
        setTimeout(function() { startPhase2(void0); }, 8500);
    }
}

function initTrackSelector() {
    var trackToggle = document.getElementById('trackToggle');
    var trackSelector = document.getElementById('trackSelector');
    var trackList = document.getElementById('trackDropdown');
    var activeTrackDisplay = document.getElementById('activeTrackName');
    if (!trackToggle || !trackSelector || !trackList) return;

    trackList.innerHTML = SONG_LIBRARY.map(function(track, i) {
        return '<div class="track-item ' + (i === currentTrackIndex ? 'active' : '') + '" data-idx="' + i + '">' +
            '<div class="track-info"><div class="track-name">' + track.name + '</div>' +
            '<div class="track-artist">' + track.artist + '</div></div></div>';
    }).join('');

    if (activeTrackDisplay) activeTrackDisplay.innerText = SONG_LIBRARY[currentTrackIndex].name;

    // Toggle open/close
    trackToggle.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        trackSelector.classList.toggle('active');
    };

    // Each track item click
    var items = trackList.querySelectorAll('.track-item');
    for (var j = 0; j < items.length; j++) {
        items[j].addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var idx = parseInt(this.getAttribute('data-idx'));
            if (!isNaN(idx)) window.selectTrack(idx);
            trackSelector.classList.remove('active');
        });
    }

    // Prevent dropdown clicks from closing
    trackList.addEventListener('click', function(e) { e.stopPropagation(); });
}

window.selectTrack = function(index) {
    if (index === currentTrackIndex && !bgMusic.paused) return;
    currentTrackIndex = index;
    localStorage.setItem('eclipse_track_index', currentTrackIndex);
    bgMusic.src = SONG_LIBRARY[index].url;
    initTrackSelector();
    bgMusic.play().then(() => { isAudioInitialized = true; updateAudioUI(); }).catch(e => {
        showNotify(`ERROR: Audio file missing: ${SONG_LIBRARY[index].url}`);
        selectTrack(0);
    });
}

function attachInitListener() {
    const initBtn = document.getElementById('init-btn');
    const overlay = document.getElementById('init-trigger-overlay');
    if (initBtn) {
        initBtn.onclick = () => {
            console.log("ECLIPSE_CORE: Initialization triggered.");
            if (overlay) overlay.style.display = 'none';
            initAudio(true);
            startNeuralUplink();
        };
    }
}

function toggleVisuals() {
    const modal = document.getElementById('visualsModal');
    if (!modal) return;
    const isVisible = modal.classList.contains('active');
    if (isVisible) {
        modal.classList.remove('active');
    } else {
        modal.classList.add('active');
        // Set active button
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById('m-' + currentParticleMode);
        if (activeBtn) activeBtn.classList.add('active');
        // Set range values
        const densityInput = document.getElementById('particleDensity');
        if (densityInput) densityInput.value = particles.length;
        const speedInput = document.getElementById('particleSpeed');
        if (speedInput) speedInput.value = currentVelocityScale;
    }
}

function changeParticleMode(mode) {
    currentParticleMode = mode;
    localStorage.setItem('eclipse_particle_mode', mode);
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById('m-' + mode);
    if (btn) btn.classList.add('active');
    particles.forEach(p => p.resetVelocity());
    showNotify(`ATMOSPHERE_CORE: MODE_SET_TO_${mode.toUpperCase()}`, 2000);
}

function updateParticleSpeed() {
    const input = document.getElementById('particleSpeed');
    if (input) {
        currentVelocityScale = parseFloat(input.value);
        localStorage.setItem('eclipse_velocity_scale', currentVelocityScale);
        particles.forEach(p => p.resetVelocity());
    }
}

function updateVisuals() {
    const scanlines = document.getElementById('toggleScanlines');
    const overlay = document.querySelector('.scan-line-v');
    if (scanlines && overlay) {
        overlay.style.display = scanlines.checked ? 'block' : 'none';
    }
}

function initParticles() {
    const densityInput = document.getElementById('particleDensity');
    const count = densityInput ? parseInt(densityInput.value) : (PARTICLE_COUNT || 60);
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
}

// Gold Standard: Sidebar stagger animation
function applySidebarStagger() {
    const items = document.querySelectorAll('.sidebar-nav .nav-item-wrapper, .sidebar-nav .nav-category, .sidebar-nav .nav-item:not(.nav-item-wrapper .nav-item)');
    items.forEach((item, i) => {
        item.style.animationDelay = (i * 30) + 'ms';
    });
}

// Gold Standard: Live uptime counter
function startUptimeCounter() {
    const telemetry = document.querySelector('.card-telemetry');
    if (!telemetry) return;
    const startTime = Date.now();
    setInterval(() => {
        const elapsed = Date.now() - startTime;
        const secs = Math.floor(elapsed / 1000);
        const mins = Math.floor(secs / 60);
        const hrs = Math.floor(mins / 60);
        const uptimeStr = String(hrs).padStart(2,'0') + ':' + String(mins%60).padStart(2,'0') + ':' + String(secs%60).padStart(2,'0');
        telemetry.innerText = 'CONNECTED_NODE: 0x882 // LATENCY: ' + (3 + Math.floor(Math.random()*3)) + 'ms // UPTIME: ' + uptimeStr;
    }, 1000);
}

// Gold Standard: Back-to-top visibility
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    const scrollArea = document.querySelector('.article-scroll-area');
    if (!btn || !scrollArea) return;
    scrollArea.addEventListener('scroll', () => {
        if (scrollArea.scrollTop > 300) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => {
        scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Gold Standard: Smooth scroll behavior
(function() {
    const scrollArea = document.querySelector('.article-scroll-area');
    if (scrollArea) scrollArea.style.scrollBehavior = 'smooth';
})();
