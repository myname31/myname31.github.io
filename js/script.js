//    <!-- MAIN ENGINE CORE CONTROL LOGIC -->
        // ==================== [SYSTEM GLOBAL CONFIGURATION] ====================
        const CFG_GITHUB_USER = "myname31"; // Ganti dengan username GitHub asli Anda
        const CFG_QUOTES = "Code. Learn. Improve. Technology never stops evolving, and neither should we.";
        
        // Konfigurasi Sosial Media. Jika dikosongkan "", ikon akan otomatis disembunyikan dari sistem
        const CFG_SOCIALS = {
            github: `https://github.com/${CFG_GITHUB_USER}`,
            instagram: "https://instagram.com/albuchori__",
            discord: "",
            facebook: "", 
            youtube: "",
            tiktok: "",
            telegram: "https://t.me/alxyz67"
        };
        // ========================================================================

        // 1. Theme Color Matrix Injection Engine
        function setGlobalTheme(primaryHex, glowRgba) {
            document.documentElement.style.setProperty('--primary', primaryHex);
            document.documentElement.style.setProperty('--primary-glow', glowRgba);
            localStorage.setItem('portfolio-accent-hex', primaryHex);
            localStorage.setItem('portfolio-accent-glow', glowRgba);
        }

        // 2. Floating Particle Fabric Generator
        function buildBackgroundParticles() {
            const container = document.getElementById('particles');
            const particleCount = window.innerWidth < 768 ? 6 : 14; // Hemat resource di device mobile
            for (let idx = 0; idx < particleCount; idx++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                const dimension = Math.random() * 8 + 4;
                bubble.style.width = `${dimension}px`;
                bubble.style.height = `${dimension}px`;
                bubble.style.left = `${Math.random() * 100}%`;
                bubble.style.animationDelay = `${Math.random() * 8}s`;
                bubble.style.animationDuration = `${Math.random() * 6 + 8}s`;
                container.appendChild(bubble);
            }
        }

        // 3. Digital Clock Interface (GMT+7 Synchronization)
        function runDigitalClock() {
            const clockNode = document.getElementById('digital-clock');
            setInterval(() => {
                const now = new Date();
                // Konversi paksa waktu sistem lokal browser klien ke UTC+7 (WIB)
                const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
                const wibTime = new Date(utc + (3600000 * 7));
                
                let hh = String(wibTime.getHours()).padStart(2, '0');
                let mm = String(wibTime.getMinutes()).padStart(2, '0');
                let ss = String(wibTime.getSeconds()).padStart(2, '0');
                clockNode.innerText = `${hh}:${mm}:${ss}`;
            }, 1000);
        }

        // 4. Multi-text Infinite Typewriter Engine
        const stringsToType = ["JavaScript Developer|", "NodeJS Developer|", "Open Source Enthusiast|"];
        let sIdx = 0, cIdx = 0, reverse = false;
        function coreTypewriter() {
            const node = document.getElementById('typing-hook');
            const fullStr = stringsToType[sIdx];
            
            if (!reverse) {
                node.innerText = fullStr.substring(0, cIdx + 1);
                cIdx++;
                if (cIdx === fullStr.length) { reverse = true; setTimeout(coreTypewriter, 1800); return; }
            } else {
                node.innerText = fullStr.substring(0, cIdx - 1);
                cIdx--;
                if (cIdx === 0) { reverse = false; sIdx = (sIdx + 1) % stringsToType.length; }
            }
            setTimeout(coreTypewriter, reverse ? 45 : 95);
        }

        // 5. Native Background Music System Toggle Handler
        function toggleMusic() {
            const audio = document.getElementById('bg-music');
            const icon = document.getElementById('music-icon');
            if (audio.paused) {
                audio.play().catch(() => console.log("User interaction required first"));
                icon.className = "fa-solid fa-volume-high text-primary-custom";
            } else {
                audio.pause();
                icon.className = "fa-solid fa-volume-xmark";
            }
        }

        // 6. Dynamic GitHub Async Rest API Orchestration
        async function loadGitHubGateway() {
            try {
                // Setup Graph Image Target URL
                document.getElementById('gh-graph-link').href = `https://github.com/${CFG_GITHUB_USER}`;
                document.getElementById('gh-graph-img').src = `https://ghchart.rshah.org/00eaff/${CFG_GITHUB_USER}`;

                // Base User Profile Request
                const profileRes = await fetch(`https://api.github.com/users/${CFG_GITHUB_USER}`);
                if (!profileRes.ok) throw new Error();
                const pData = await profileRes.json();

                if(pData.avatar_url) document.getElementById('gh-avatar').src = pData.avatar_url;
                document.getElementById('api-repos').innerText = pData.public_repos;
                document.getElementById('api-followers').innerText = pData.followers;
                document.getElementById('api-following').innerText = pData.following;

                // Recursive Star Counter Request Module (Maksimal 100 repo teratas)
                const repoRes = await fetch(`https://api.github.com/users/${CFG_GITHUB_USER}/repos?per_page=100`);
                const rData = await repoRes.json();
                let accumulatedStars = 0;
                rData.forEach(repo => accumulatedStars += repo.stargazers_count);
                document.getElementById('api-stars').innerText = accumulatedStars;

            } catch (err) {
                // Fail-safe State fallback visual values if Github limit exceeded
                document.getElementById('api-stars').innerText = "200+";
                document.getElementById('api-repos').innerText = "150";
                document.getElementById('api-followers').innerText = "85";
                document.getElementById('api-following').innerText = "40";
            }
        }

function showRedirect(url,name,icon,message){
    const overlay=document.getElementById("redirect-overlay");
    document.getElementById("redirect-title").innerText=name;
    document.getElementById("redirect-icon").className=icon;
    document.getElementById("redirect-message").innerText=message;
    overlay.classList.add("show");
    const loader=document.querySelector(".loader-fill");
    loader.style.animation="none";
    void loader.offsetWidth;
    loader.style.animation="loading 2s linear forwards";
    setTimeout(()=>{
        window.open(url,"_blank");
        overlay.classList.remove("show");
    },2000);
}

        // 7. Social Links Component Generator Matrix
        function renderSocialEcosystem() {
            const grid = document.getElementById('social-grid');
            const maps = {
                github: { icon: "fa-brands fa-github", color: "hover:text-white" },
                instagram: { icon: "fa-brands fa-instagram", color: "hover:text-pink-500" },
                discord: { icon: "fa-brands fa-discord", color: "hover:text-indigo-400" },
                facebook: { icon: "fa-brands fa-facebook", color: "hover:text-blue-500" },
                youtube: { icon: "fa-brands fa-youtube", color: "hover:text-red-500" },
                tiktok: { icon: "fa-brands fa-tiktok", color: "hover:text-slate-200" },
                telegram: { icon: "fa-brands fa-telegram", color: "hover:text-sky-400" }
            };

            grid.innerHTML = '';
            Object.keys(CFG_SOCIALS).forEach(key => {
                const url = CFG_SOCIALS[key];
                if (url && url.trim() !== "") {
                    const nodeAnchor = document.createElement('a');
                    nodeAnchor.href = url;
                    nodeAnchor.target = "_blank";
                    nodeAnchor.className = `w-10 h-10 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-center text-slate-400 text-sm transition-all duration-300 hover:scale-110 hover:border-primary-custom ${maps[key].color}`;
                    //bounce
                    nodeAnchor.innerHTML = `<i class="${maps[key].icon}"></i>`;
                    
                    
                    nodeAnchor.addEventListener("click",(e)=>{
    e.preventDefault();
    nodeAnchor.classList.remove("social-pop");
    void nodeAnchor.offsetWidth;
    nodeAnchor.classList.add("social-pop");
    const messages={
        github:"Preparing GitHub...",
        instagram:"Opening Instagram...",
        discord:"Connecting Discord...",
        facebook:"Opening Facebook...",
        youtube:"Loading YouTube...",
        telegram:"Opening Telegram...",
        tiktok:"Launching TikTok..."
    };

    showRedirect(
        url,
        key.charAt(0).toUpperCase()+key.slice(1),
        maps[key].icon,
        messages[key]
    );
});
    grid.appendChild(nodeAnchor);                
                
                }
            });
        }

        // 8. Staggered Pipeline Page Entrance Execution Controller
        function triggerSequentialCascade() {
            // Hilangkan loader screen utama
            document.getElementById('site-loader').classList.add('fade-out');

            // List urutan ID element yang akan dimunculkan satu-per-satu secara teratur (smooth transition)
            const targetSequence = ['node-avatar', 'node-about', 'node-stats', 'node-social'];
            
            // Tambahkan class .reveal-node secara dinamis ke semua komponen tersisa di luar sequence utama
            document.querySelectorAll('.reveal-node').forEach(el => {
                if(!targetSequence.includes(el.id)) {
                    setTimeout(() => el.classList.add('show-node'), 700);
                }
            });

            // Jalankan antrean cascade berurutan sesuai perintah
            targetSequence.forEach((id, step) => {
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if(element) element.classList.add('show-node');
                }, step * 250 + 200); // interval jeda 250ms per elemen
            });
        }
//Visitor
    async function loadVisitorCounter() {
    const BASE = "https://countapi.mileshilliard.com/api/v1";
    const KEY = "myname31-github-io";

    try {
        const response = await fetch(
            `${BASE}/hit/${KEY}`
        );

        const data = await response.json();

        document.getElementById("visitor-val").textContent =
            data.value.toLocaleString("id-ID");

    } catch (error) {
        console.error("Visitor Error:", error);
        document.getElementById("visitor-val").textContent = "N/A";
    }
}

        // Bootloader Initialization Event Hook
        window.addEventListener('DOMContentLoaded', () => {
            // Ambil preferensi tema jika ada di cache memory browser
            const cachedHex = localStorage.getItem('portfolio-accent-hex') || '#00eaff';
            const cachedGlow = localStorage.getItem('portfolio-accent-glow') || 'rgba(0,234,255,0.4)';
            setGlobalTheme(cachedHex, cachedGlow);

            document.getElementById('quote-box').innerText = `"${CFG_QUOTES}"`;

            buildBackgroundParticles();
            runDigitalClock();
            coreTypewriter();
            renderSocialEcosystem();

            // Jalankan pipeline setelah proses API fetching selesai atau masuk mode timeout
            Promise.all([
                        loadGitHubGateway(),
                        loadVisitorCounter()
                    ]).finally(() => {
                setTimeout(triggerSequentialCascade, 400);
            });
        });