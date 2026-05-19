import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

const FLOWER_ASSETS = [
  'anemone.webp', 'camellia.webp', 'carnation.webp', 'cosmos.webp', 'dahlia.webp',
  'daisy.webp', 'hibiscus.webp', 'iris.webp', 'lily.webp', 'lotus.webp',
  'magnolia.webp', 'marigold.webp', 'peony.webp', 'plumeria.webp', 'poppy.webp',
  'ranunculus.webp', 'rose.webp', 'sunflower.webp', 'tulip.webp', 'zinnia.webp'
];
const HEART_EMOJIS = ['\u2764\uFE0F', '\u{1FA77}', '\u{1F495}', '\u{1F496}', '\u{1F497}', '\u{1F493}', '\u2728', '\u{1F338}'];

const LETTER_TEXT = "Cayangkuu, just to let you knowww you are my favourite person ever. In the way small things turn into thoughts of you. And how my days is getting a lot more warmer and cozy with you in it. We can be mad with other or anything but never ignore each other ever! No matter what happen I'll stay with you the longest my cayang ♥. ";

const YOUTUBE_VIDEO_ID = 'GQ9wrkFWbTs';

const POLAROIDS = [
  { img: './template-assets/polaroid1.jpg', caption: 'First memory \u2728', tape: 'pink', rotate: -3, tapeStyle: { top: '-12px', left: '60px', transform: 'rotate(-8deg)' } },
  { img: './template-assets/polaroid2.jpg', caption: 'That perfect day \u2600\uFE0F', tape: 'mint', rotate: 4, tapeStyle: { top: '-14px', left: '30px', transform: 'rotate(5deg)' } },
  { img: './template-assets/polaroid3.png', caption: 'Us, always \u{1F49B}', tape: 'gold', rotate: -2, tapeStyle: { top: '-10px', right: '20px', transform: 'rotate(-12deg)' } },
  { img: './template-assets/polaroid4.jpeg', caption: 'The sunset \u{1F305}', tape: 'lavender', rotate: 5, tapeStyle: { top: '-13px', left: '50px', transform: 'rotate(9deg)' } },
  { img: './template-assets/polaroid5.jpeg', caption: 'Golden hour \u2728', tape: 'pink', rotate: -5, tapeStyle: { top: '-11px', left: '70px', transform: 'rotate(3deg)' } },
  { img: './template-assets/polaroid6.jpeg', caption: 'My favorite smile \u{1F970}', tape: 'mint', rotate: 2, tapeStyle: { top: '-14px', right: '40px', transform: 'rotate(-6deg)' } },
];

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [showContinue, setShowContinue] = useState(true);
  const [bouquetEnlarged, setBouquetEnlarged] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const waxSealRef = useRef<HTMLDivElement>(null);
  const flowerContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const isYtReadyRef = useRef(false);
  const letterTypedRef = useRef(false);
  const scene5SetupRef = useRef(false);
  const polaroidsSetupRef = useRef(false);

  const transitionToScene = useCallback((sceneNumber: number) => {
    setCurrentScene(sceneNumber);
    setShowContinue(sceneNumber === 0 || sceneNumber === 0.5 || sceneNumber === 0.6 || sceneNumber === 2);
  }, []);

  // Flower explosion
  const triggerFlowerExplosion = useCallback(() => {
    const container = flowerContainerRef.current;
    if (!container) return;
    const overlay = document.getElementById('scene-flowers');
    if (overlay) overlay.classList.add('active');

    const FLOWER_COUNT = 120;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < FLOWER_COUNT; i++) {
      const flowerEl = document.createElement('img');
      const randomFlower = FLOWER_ASSETS[Math.floor(Math.random() * FLOWER_ASSETS.length)];
      flowerEl.src = `./template-assets/flowers/${randomFlower}`;
      flowerEl.className = 'flower-particle';

      const size = Math.random() * 60 + 30;
      flowerEl.style.width = `${size}px`;
      flowerEl.style.position = 'absolute';
      flowerEl.style.left = `${cx}px`;
      flowerEl.style.top = `${cy}px`;
      flowerEl.style.transformOrigin = 'center center';
      flowerEl.style.zIndex = '9999';
      flowerEl.style.pointerEvents = 'none';
      flowerEl.style.userSelect = 'none';

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(window.innerWidth, window.innerHeight) * 1.2;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const rot = Math.random() * 360 - 180;
      const delay = Math.random() * 0.4;
      const duration = Math.random() * 1.5 + 1.5;

      flowerEl.animate([
        { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: '1' },
        { transform: `translate(calc(-50% + ${tx * 0.6}px), calc(-50% + ${ty * 0.6}px)) scale(${Math.random() * 1.5 + 1.5}) rotate(${rot}deg)`, opacity: '1', offset: 0.6 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${Math.random() * 1.5 + 2.5}) rotate(${rot + 90}deg)`, opacity: '0' }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'both'
      });

      container.appendChild(flowerEl);
    }

    setTimeout(() => {
      if (overlay) overlay.classList.remove('active');
      setTimeout(() => {
        if (container) container.innerHTML = '';
      }, 800);
    }, 3200);
  }, []);

  // Scene 1: Envelope
  useEffect(() => {
    const waxSeal = waxSealRef.current;
    const envelope = envelopeRef.current;
    if (!waxSeal || !envelope) return;

    let isOpened = false;
    const handleSealClick = () => {
      if (isOpened) return;
      isOpened = true;

      waxSeal.classList.add('broken');
      envelope.classList.add('open');
      waxSeal.classList.remove('pulse-anim');

      const hint = document.querySelector('.drag-hint');
      if (hint) (hint as HTMLElement).style.opacity = '0';

      setTimeout(() => {
        triggerFlowerExplosion();
      }, 600);

      setTimeout(() => {
        const wrapper = document.getElementById('envelope-container');
        if (wrapper) {
          wrapper.style.transition = 'opacity 0.8s ease';
          wrapper.style.opacity = '0';
        }
        transitionToScene(2);
      }, 2500);
    };

    waxSeal.addEventListener('click', handleSealClick);
    return () => waxSeal.removeEventListener('click', handleSealClick);
  }, [triggerFlowerExplosion, transitionToScene]);

  // Scene 2: Typewriter effect
  useEffect(() => {
    if (currentScene !== 2 || letterTypedRef.current) return;
    letterTypedRef.current = true;

    const contentEl = document.getElementById('letter-content');
    if (!contentEl) return;

    let i = 0;
    
    // Add invisible text to force layout height
    const invisibleP = document.createElement('p');
    invisibleP.style.visibility = 'hidden';
    invisibleP.textContent = LETTER_TEXT;
    contentEl.appendChild(invisibleP);

    let currentP = document.createElement('p');
    const typeOverlay = document.createElement('div');
    typeOverlay.style.position = 'absolute';
    typeOverlay.style.top = '0';
    typeOverlay.style.left = '0';
    typeOverlay.style.right = '0';
    contentEl.style.position = 'relative';
    contentEl.appendChild(typeOverlay);
    typeOverlay.appendChild(currentP);

    const typeWriter = () => {
      if (i < LETTER_TEXT.length) {
        if (LETTER_TEXT.charAt(i) === '\n') {
          currentP = document.createElement('p');
          typeOverlay.appendChild(currentP);
        } else {
          currentP.innerHTML += LETTER_TEXT.charAt(i);
        }
        i++;
        setTimeout(typeWriter, 15 + Math.random() * 15);
      }
    };

    setTimeout(typeWriter, 300);

    return () => {
      letterTypedRef.current = false;
    };
  }, [currentScene]);

  // Scene 3: Polaroid drag
  useEffect(() => {
    if (currentScene !== 3 || polaroidsSetupRef.current) return;
    polaroidsSetupRef.current = true;

    const polaroids = document.querySelectorAll('.polaroid');
    const handlers: { el: Element; start: (e: Event) => void; move: (e: Event) => void; end: () => void }[] = [];

    polaroids.forEach(p => {
      let isDragging = false;
      let startX = 0, startY = 0, initialX = 0, initialY = 0;

      const dragStart = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        (p as HTMLElement).style.zIndex = '1000';
        (p as HTMLElement).style.transition = 'none';

        if ('touches' in e) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        } else {
          startX = e.clientX;
          startY = e.clientY;
        }

        const transform = window.getComputedStyle(p as HTMLElement).getPropertyValue('transform');
        if (transform !== 'none') {
          const matrix = new DOMMatrix(transform);
          initialX = matrix.m41;
          initialY = matrix.m42;
        }
      };

      const drag = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        let currentX: number, currentY: number;
        if ('touches' in e) {
          currentX = e.touches[0].clientX;
          currentY = e.touches[0].clientY;
        } else {
          currentX = e.clientX;
          currentY = e.clientY;
        }
        const dx = currentX - startX;
        const dy = currentY - startY;
        (p as HTMLElement).style.transform = `translate(${initialX + dx}px, ${initialY + dy}px) scale(1.05) rotate(${dx * 0.05}deg)`;
      };

      const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        (p as HTMLElement).style.zIndex = '';
        (p as HTMLElement).style.transition = 'transform .4s cubic-bezier(.34, 1.56, .64, 1), box-shadow .3s ease, filter .3s ease';
        const originalRot = (p as HTMLElement).getAttribute('style')?.match(/rotate\((.*?)\)/);
        const rot = originalRot ? originalRot[0] : 'rotate(0deg)';
        (p as HTMLElement).style.transform = rot;
      };

      p.addEventListener('mousedown', dragStart as EventListener);
      p.addEventListener('touchstart', dragStart as EventListener, { passive: true });
      window.addEventListener('mousemove', drag as EventListener);
      window.addEventListener('touchmove', drag as EventListener, { passive: true });
      window.addEventListener('mouseup', dragEnd);
      window.addEventListener('touchend', dragEnd);

      handlers.push({ el: p, start: dragStart as EventListener, move: drag as EventListener, end: dragEnd });
    });

    return () => {
      polaroidsSetupRef.current = false;
      handlers.forEach(({ el, start, move, end }) => {
        el.removeEventListener('mousedown', start);
        el.removeEventListener('touchstart', start);
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move);
        window.removeEventListener('mouseup', end);
        window.removeEventListener('touchend', end);
      });
    };
  }, [currentScene]);

  // Scene 4: YouTube player
  useEffect(() => {
    if (currentScene !== 4) return;

    const initPlayer = () => {
      if (!(window as any).YT || !(window as any).YT.Player) return;
      ytPlayerRef.current = new (window as any).YT.Player('youtube-player', {
        events: {
          onReady: () => { isYtReadyRef.current = true; },
          onStateChange: (event: any) => {
            const dialNext = document.getElementById('dial-next');
            if (!dialNext) return;
            const playIcon = dialNext.querySelector('.play-icon') as HTMLElement;
            const pauseIcon = dialNext.querySelector('.pause-icon') as HTMLElement;
            if (event.data === 1) {
              if (playIcon) playIcon.style.display = 'none';
              if (pauseIcon) pauseIcon.style.display = 'block';
            } else if (event.data === 2 || event.data === 0) {
              if (playIcon) playIcon.style.display = 'block';
              if (pauseIcon) pauseIcon.style.display = 'none';
            }
          }
        }
      });
    };

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
    };
  }, [currentScene]);

  // Scene 4: TV controls
  useEffect(() => {
    if (currentScene !== 4) return;

    const dialNext = document.getElementById('dial-next');
    const dialPrev = document.getElementById('dial-prev');

    const handlePlayPause = () => {
      if (!isYtReadyRef.current || !ytPlayerRef.current) return;
      const state = ytPlayerRef.current.getPlayerState();
      if (state === 1) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    };

    const handleReplay = () => {
      if (!isYtReadyRef.current || !ytPlayerRef.current) return;
      ytPlayerRef.current.seekTo(0);
      ytPlayerRef.current.playVideo();
    };

    dialNext?.addEventListener('click', handlePlayPause);
    dialPrev?.addEventListener('click', handleReplay);

    return () => {
      dialNext?.removeEventListener('click', handlePlayPause);
      dialPrev?.removeEventListener('click', handleReplay);
    };
  }, [currentScene]);

  // Scene 5: Finale
  useEffect(() => {
    if (currentScene !== 5 || scene5SetupRef.current) return;
    scene5SetupRef.current = true;

    const scene = document.getElementById('scene-5');
    const canvas = scene?.querySelector('.finale-canvas') as HTMLElement;
    if (canvas) canvas.style.opacity = '0';

    // Create leaves
    for (let i = 0; i < 55; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.style.left = `${Math.random() * 150 - 50}vw`;
      leaf.style.top = `${Math.random() * -20 - 10}vh`;
      const size = Math.random() * 15 + 10;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.backgroundColor = Math.random() > 0.5 ? 'var(--color-pastel-pink)' : '#FFB6C1';
      leaf.style.setProperty('--end-x', `${Math.random() * 120 + 30}vw`);
      leaf.style.setProperty('--end-y', `${Math.random() * 60 + 100}vh`);
      leaf.style.setProperty('--end-rot', `${(Math.floor(Math.random() * 4) + 2) * 360}deg`);
      leaf.style.animation = `wind-blow ${Math.random() * 8 + 6}s linear ${Math.random() * 3}s infinite`;
      scene?.appendChild(leaf);
    }

    // Orchestrated sequence
    setTimeout(() => {
      if (canvas) {
        canvas.style.transition = 'opacity 0.8s ease-out';
        canvas.style.opacity = '1';
      }
      setTimeout(() => {
        document.querySelectorAll('.svg-text-draw').forEach(el => {
          el.classList.add('animate-draw');
        });
        setTimeout(() => spawnHeartBurst(), 2200);
      }, 400);
    }, 300);

    return () => {
      scene5SetupRef.current = false;
    };
  }, [currentScene]);

  const spawnHeartBurst = () => {
    const HEART_COUNT = 28;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < HEART_COUNT; i++) {
      const heart = document.createElement('div');
      heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      heart.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        font-size: ${Math.random() * 22 + 14}px;
        pointer-events: none;
        z-index: 9990;
        user-select: none;
        will-change: transform, opacity;
      `;

      const angle = (i / HEART_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = Math.random() * 260 + 100;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const delay = Math.random() * 300;

      document.body.appendChild(heart);

      heart.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
        { transform: `translate(calc(-50% + ${tx * 0.4}px), calc(-50% + ${ty * 0.4}px)) scale(1.4)`, opacity: 1, offset: 0.3 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.8)`, opacity: 0 }
      ], {
        duration: 1400 + Math.random() * 600,
        delay,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both'
      }).onfinish = () => heart.remove();
    }
  };

  // Set vh for mobile
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // Initial scene activation
  useEffect(() => {
    setTimeout(() => {
      const scene0 = document.getElementById('scene-0');
      if (scene0) scene0.classList.add('active');
    }, 150);
  }, []);

  // Scene 0.7: SIKE animation
  useEffect(() => {
    if (currentScene !== 0.7) return;
    const sikeText = document.getElementById('sike-text');
    const realBouquet = document.getElementById('real-bouquet');
    if (!sikeText || !realBouquet) return;

    sikeText.style.opacity = '1';
    realBouquet.style.opacity = '0';

    const t1 = setTimeout(() => {
      sikeText.style.transition = 'opacity 0.8s ease';
      sikeText.style.opacity = '0';
      setTimeout(() => { sikeText.style.pointerEvents = 'none'; }, 800);
    }, 1800);

    const t2 = setTimeout(() => {
      realBouquet.style.transition = 'opacity 1s ease';
      realBouquet.style.opacity = '1';
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [currentScene]);

  const handleContinue = () => {
    if (currentScene === 0) {
      transitionToScene(0.5);
    } else if (currentScene === 0.5) {
      transitionToScene(0.6);
    } else if (currentScene === 0.6) {
      transitionToScene(0.7);
    } else if (currentScene === 0.7) {
      transitionToScene(1);
    } else if (currentScene === 2) {
      transitionToScene(5);
    } else if (currentScene < 5) {
      transitionToScene(currentScene + 1);
    }
  };

  return (
    <>
      {/* SVG Filters */}
      <svg style={{ display: 'none' }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={3} stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0" />
        </filter>
      </svg>

      {/* Texture Overlay */}
      <div id="texture-overlay" />

      <main id="app">
        {/* ===== SCENE 0: INTRO ===== */}
        <section id="scene-0" className={`scene ${currentScene === 0 ? 'active' : ''}`}>
          <div className="decor background-layer dotted-paper" />
          <div className="decor sticker float-smooth" style={{ top: '20%', left: '10%' }}>
            <img src="./template-assets/heart.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker pulse-anim" style={{ bottom: '20%', right: '15%' }}>
            <img src="./template-assets/stars.png" width="40" alt="decor" />
          </div>
          
          <h2 className="scene-header interactive-object" style={{ top: 'auto', position: 'relative', fontSize: '3.5rem', padding: '0 20px', lineHeight: 1.3, textAlign: 'center', zIndex: 10 }}>
            Hey to my<br/>favourite person ever
          </h2>
        </section>

        {/* ===== SCENE 0.5: SECOND INTRO ===== */}
        <section id="scene-0-5" className={`scene ${currentScene === 0.5 ? 'active' : ''}`} style={{ flexDirection: 'column' }}>
          <div className="decor background-layer gingham" style={{ opacity: 0.5 }} />
          
          <h2 className="scene-header interactive-object" style={{ top: '15%', position: 'absolute', fontSize: '2.5rem', padding: '0 20px', textAlign: 'center', zIndex: 10 }}>
            here i have something for you
          </h2>

          <div className="interactive-object float-slow" style={{ transitionDelay: '1.5s', marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="./template-assets/section2.gif" style={{ width: '200px', height: 'auto', filter: 'drop-shadow(2px 4px 10px rgba(0,0,0,0.2))' }} alt="Something for you" />
            <div style={{ fontFamily: 'var(--handwriting-font)', fontSize: '2rem', color: 'var(--color-deep-rose)', marginTop: '20px' }}>
              a rose mwahahha
            </div>
          </div>
        </section>

        {/* ===== SCENE 0.6: KISSY ===== */}
        <section id="scene-0-6" className={`scene ${currentScene === 0.6 ? 'active' : ''}`} style={{ flexDirection: 'column' }}>
          <div className="decor background-layer checked-wallpaper" />
          <div className="decor sticker float-fast" style={{ top: '15%', right: '12%' }}>
            <img src="./template-assets/heart.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker drift" style={{ bottom: '18%', left: '8%' }}>
            <img src="./template-assets/pink-scribble.png" width="40" alt="decor" />
          </div>

          <h2 className="scene-header interactive-object" style={{ top: '15%', position: 'absolute', fontSize: '2.5rem', padding: '0 20px', textAlign: 'center', zIndex: 10 }}>
            here is kissy for you
          </h2>

          <div className="interactive-object float-slow" style={{ transitionDelay: '1.5s', marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="./template-assets/section3.gif" style={{ width: '220px', height: 'auto', filter: 'drop-shadow(2px 4px 10px rgba(0,0,0,0.2))', borderRadius: '12px' }} alt="Kissy" />
          </div>
        </section>

        {/* ===== SCENE 0.7: SIKE / BOUQUET ===== */}
        <section id="scene-0-7" className={`scene ${currentScene === 0.7 ? 'active' : ''}`} style={{ flexDirection: 'column' }}>
          <div className="decor background-layer dotted-paper" />
          <div className="decor sticker rotate-slow" style={{ top: '20%', left: '10%' }}>
            <img src="./template-assets/ribbon.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker float-smooth" style={{ bottom: '15%', right: '10%' }}>
            <img src="./template-assets/stars.png" width="40" alt="decor" />
          </div>

          {/* SIKE text - shown first, then fades out */}
          <div id="sike-text" className="interactive-object" style={{ position: 'absolute', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <h2 style={{ fontFamily: 'var(--handwriting-font)', fontSize: '4rem', color: 'var(--color-deep-rose)', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.1)', transform: 'rotate(-3deg)' }}>
              SIKE ITS NOT
            </h2>
          </div>

          {/* Real bouquet - fades in after */}
          <div id="real-bouquet" style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 15, position: 'relative' }}>
            <h2 className="scene-header" style={{ position: 'relative', top: 'auto', fontSize: '2.2rem', padding: '0 20px', textAlign: 'center', marginBottom: '20px' }}>
              here is the real bouquet for you
            </h2>

            <div
              onClick={() => setBouquetEnlarged(true)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              className="float-slow"
            >
              <img
                src="./template-assets/section4.png"
                style={{ width: '220px', height: 'auto', filter: 'drop-shadow(2px 4px 10px rgba(0,0,0,0.2))', borderRadius: '12px', transition: 'transform 0.3s ease' }}
                alt="Cat with bouquet"
              />
              <div style={{ fontFamily: 'var(--handwriting-font)', fontSize: '1.4rem', color: 'var(--color-deep-rose)', marginTop: '12px', opacity: 0.8 }}>
                tap me! ✨
              </div>
            </div>
          </div>
        </section>

        {/* Bouquet Enlarged Overlay */}
        {bouquetEnlarged && (
          <div
            onClick={() => {
              setBouquetEnlarged(false);
              transitionToScene(1);
            }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
              zIndex: 10000, cursor: 'pointer',
              animation: 'fadeIn 0.5s ease forwards'
            }}
          >
            <img
              src="./template-assets/bouquet.png"
              style={{ maxWidth: '85vw', maxHeight: '65vh', objectFit: 'contain', filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.4))', animation: 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards, bouquetFloat 3s ease-in-out 0.5s infinite' }}
              alt="Full bouquet"
            />
            <div style={{ fontFamily: 'var(--handwriting-font)', fontSize: '2rem', color: 'white', marginTop: '20px', textShadow: '1px 1px 4px rgba(0,0,0,0.5)', animation: 'fadeIn 1s ease 0.6s both' }}>
              for you 💐
            </div>
            <div style={{ fontFamily: 'var(--handwriting-font)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginTop: '12px', animation: 'fadeIn 1s ease 1.2s both' }}>
              tap to continue
            </div>
          </div>
        )}

        {/* ===== SCENE 1: ENVELOPE ===== */}
        <section id="scene-1" className={`scene ${currentScene === 1 ? 'active' : ''}`}>
          <div className="decor background-layer gingham" />

          <div className="decor sticker float-slow pos-s1-1">
            <img src="./template-assets/stars.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker float-fast pos-s1-2">
            <img src="./template-assets/love-balloons.png" width="40" alt="decor" />
          </div>
          <div className="decor tape top-left" />
          <div className="decor tape bottom-right" />
          <div className="decor sticker drift pos-s1-3">
            <img src="./template-assets/pink-scribble.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker rotate-slow pos-s1-4">
            <img src="./template-assets/ribbon.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker float-slow pos-s1-5">
            <img src="./template-assets/cat-scribble.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker float-fast pos-s1-6">
            <img src="./template-assets/flowers.png" width="40" alt="decor" />
          </div>

          <div id="envelope-container" className="interactive-object float-slow">
            <div className="envelope" id="envelope" ref={envelopeRef}>
              <div className="envelope-back" />
              <div className="envelope-front-left" />
              <div className="envelope-front-right" />
              <div className="envelope-front" />
              <div className="envelope-flap" />
              <div className="wax-seal pulse-anim" id="wax-seal" ref={waxSealRef}>
                <div className="seal-inner">
                  <img src="./template-assets/heart.png" alt="heart" style={{ width: 22, height: 22, objectFit: 'contain' }} />
                </div>
              </div>
            </div>
            <div className="drag-hint pulse-anim">Tap seal to open &#9829;</div>
          </div>
        </section>

        {/* ===== SCENE 2: LOVE LETTER ===== */}
        <section id="scene-2" className={`scene ${currentScene === 2 ? 'active' : ''}`}>
          <div className="decor background-layer dotted-paper" />

          <div className="decor tape top-left pos-s2-1" />
          <div className="decor tape top-left pos-s2-2" style={{ top: '10%', right: '10%', left: 'auto', transform: 'rotate(25deg)' }} />
          <div className="decor sticker float-slow pos-s2-3">
            <img src="./template-assets/flowers.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker float-fast pos-s2-4">
            <img src="./template-assets/stars.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker drift pos-s2-5">
            <img src="./template-assets/pink-scribble.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker rotate-slow pos-s2-6">
            <img src="./template-assets/heart.png" width="40" alt="decor" />
          </div>

          <h2 className="scene-header interactive-object">A letter for you...</h2>

          <div className="letter opened interactive-object" id="love-letter">
            <div className="letter-content" id="letter-content" />
          </div>
        </section>

        {/* ===== SCENE 3: POLAROIDS ===== */}
        <section id="scene-3" className={`scene ${currentScene === 3 ? 'active' : ''}`}>
          <div className="decor background-layer checked-wallpaper" />

          <div className="decor tape top-left pos-s3-1" />
          <div className="decor tape bottom-right pos-s3-2" style={{ bottom: '15%', left: '10%', right: 'auto', transform: 'rotate(-15deg)' }} />
          <div className="decor sticker float-smooth pos-s3-3">
            <img src="./template-assets/heart.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker drift pos-s3-4">
            <img src="./template-assets/pink-scribble.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker rotate-slow pos-s3-5">
            <img src="./template-assets/ribbon.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker pulse-anim pos-s3-6">
            <img src="./template-assets/stars.png" width="40" alt="decor" />
          </div>

          <h2 className="scene-header interactive-object">Our Memories</h2>

          <div className="photo-grid interactive-object" id="photo-grid">
            {POLAROIDS.map((p, idx) => (
              <div className="polaroid" key={idx} style={{ transform: `rotate(${p.rotate}deg)` }}>
                <div className={`washi-tape ${p.tape}`} style={p.tapeStyle} />
                <img className="polaroid-img" src={p.img} alt={p.caption} />
                <span className="polaroid-caption">{p.caption}</span>
              </div>
            ))}
          </div>

          <div className="drag-hint pulse-anim tv-hint">Swipe photos away!</div>
        </section>

        {/* ===== SCENE 4: TV ===== */}
        <section id="scene-4" className={`scene ${currentScene === 4 ? 'active' : ''}`}>
          <div className="decor background-layer retro-stripes" />

          <div className="decor tape bottom-right pos-s4-1" />
          <div className="decor sticker float-fast pos-s4-2">
            <img src="./template-assets/guitar.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker float-smooth pos-s4-3">
            <img src="./template-assets/heart.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker drift pos-s4-4">
            <img src="./template-assets/pink-scribble.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker rotate-slow pos-s4-5">
            <img src="./template-assets/love-balloons.png" width="40" alt="decor" />
          </div>
          <div className="decor sticker float-slow pos-s4-6">
            <img src="./template-assets/ribbon.png" width="40" alt="decor" />
          </div>

          <h2 className="scene-header interactive-object">Our Song</h2>

          <div id="retro-tv" className="interactive-object float-slow">
            <div className="tv-antennas">
              <div className="antenna left" />
              <div className="antenna right" />
            </div>
            <div className="tv-body">
              <div className="tv-screen-bezel">
                <div className="tv-screen-glass" id="tv-screen">
                  <iframe
                    id="youtube-player"
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&playsinline=1&controls=1&rel=0&showinfo=0&modestbranding=1&disablekb=1`}
                    style={{ width: '100%', height: '100%' }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
              <div className="tv-controls">
                <button className="tv-btn" id="dial-prev" title="Replay">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                  </svg>
                </button>
                <button className="tv-btn" id="dial-next" title="Play/Pause">
                  <svg className="play-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <svg className="pause-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ display: 'none' }}>
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                </button>
                <div className="speaker-holes" />
              </div>
            </div>
            <div className="drag-hint pulse-anim tv-hint">Tap the buttons to Play/Pause!</div>
          </div>
        </section>

        {/* ===== SCENE 5: FINALE ===== */}
        <section id="scene-5" className={`scene ${currentScene === 5 ? 'active' : ''}`}>
          <div className="decor background-layer finale-gradient" />

          <div className="finale-canvas interactive-object">
            <svg width="100%" height="300" viewBox="0 0 600 300" style={{ overflow: 'visible' }}>
              <text
                id="finale-text-desktop"
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="svg-text-draw desktop-text"
                pathLength={100}
              >
                I Love You Cayangku
              </text>
              <text
                id="finale-text-mobile"
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="svg-text-draw mobile-text"
                pathLength={100}
              >
                <tspan x="50%" dy="-1.8em">I Love</tspan>
                <tspan x="50%" dy="1.2em">You</tspan>
                <tspan x="50%" dy="1.2em">Cayangku</tspan>
              </text>
            </svg>
          </div>
        </section>
      </main>

      {/* Flower Explosion Overlay */}
      <div id="scene-flowers" className="scene-flowers-l5" aria-hidden="true">
        <div className="flower-container-l5" ref={flowerContainerRef} />
      </div>

      {/* Global Continue Button */}
      <button
        id="global-continue-btn"
        className={`global-continue ${showContinue ? 'visible show' : ''}`}
        onClick={handleContinue}
      >
        Continue &#10132;
      </button>
    </>
  );
}

export default App;
