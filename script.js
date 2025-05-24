
// 🌐 Autofocus on search bar after load
window.onload = () => {
    document.getElementById('custom-search')?.focus();
  };
  
  // 🔍 Handle search bar Enter key
  function handleSearch(event) {
    if (event.key === 'Enter') {
      const query = event.target.value.trim();
      if (query) {
        const urlPattern = /^https?:\/\//i;
        if (urlPattern.test(query)) {
          window.location.href = query;
        } else {
          window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        }
      }
    }
  }
  
  // 🕒 Live clock
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  // 🔇 Background audio mute toggle
  document.getElementById('mute-toggle')?.addEventListener('click', () => {
    const audio = document.getElementById('bg-music');
    audio.muted = !audio.muted;
    document.getElementById('mute-toggle').textContent = audio.muted ? '🔇' : '🔈';
  });
  
  // 🌸 Sakura animation
  const canvas = document.getElementById('sakura-canvas');
  const ctx = canvas?.getContext('2d');
  let petals = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  if (canvas) {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  
    function createPetal() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 5 + Math.random() * 5,
        speed: 1 + Math.random() * 2,
        drift: 1 - Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.4
      };
    }
  
    function drawPetal(p) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,182,193,${p.opacity})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p, i) => {
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) {
          petals[i] = createPetal();
          petals[i].y = 0;
        }
        drawPetal(p);
      });
      requestAnimationFrame(update);
    }
  
    for (let i = 0; i < 50; i++) petals.push(createPetal());
    update();
  }
// Load YouTube IFrame API
let ytPlayer;
const ytScript = document.createElement('script');
ytScript.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(ytScript);

// Initialize player when API is ready
window.onYouTubeIframeAPIReady = () => {
  ytPlayer = new YT.Player('yt-player-container', {
    height: '0',
    width: '0',
    videoId: 'cIZhlFIyJ_Y',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'cIZhlFIyJ_Y',
    },
    events: {
      onReady: (event) => {
        event.target.setVolume(50); // optional volume preset
      }
    }
  });
};

// Mute toggle button
document.getElementById('mute-toggle')?.addEventListener('click', () => {
  if (!ytPlayer) return;
  const muted = ytPlayer.isMuted();
  if (muted) {
    ytPlayer.unMute();
    document.getElementById('mute-toggle').textContent = '🔈';
  } else {
    ytPlayer.mute();
    document.getElementById('mute-toggle').textContent = '🔇';
  }
});
