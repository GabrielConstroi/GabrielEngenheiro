// JavaScript para funcionalidades interativas do site

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('nav a, a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Processamento do formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const statusEl = document.getElementById('form-status');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (statusEl) {
                statusEl.style.display = 'block';
                statusEl.style.color = '#0649C0';
                statusEl.textContent = 'Enviando...';
            }
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    if (statusEl) {
                        statusEl.textContent = 'Mensagem enviada com sucesso!';
                        statusEl.style.color = '#16A34A';
                    }
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(()=>({}));
                    if (statusEl) {
                        statusEl.textContent = data.errors ? data.errors.map(e=>e.message).join(', ') : 'Erro ao enviar. Tente novamente.';
                        statusEl.style.color = '#DC2626';
                    }
                }
            } catch (err) {
                if (statusEl) {
                    statusEl.textContent = 'Falha de conexão. Verifique sua internet.';
                    statusEl.style.color = '#DC2626';
                }
            }
        });
    }

    // Funcionalidade do botão "Voltar ao Topo"
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Efeitos hover para botões
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-download, .btn-submit, .project-link, .project-github, .social-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Corrigir referência ao CSS (caso o arquivo esteja como style.css em vez de styles.css)
    const cssLink = document.querySelector('link[rel="stylesheet"][href="style.css"]');
    if (cssLink && !document.querySelector('link[rel="stylesheet"][href="styles.css"]')) {
        cssLink.href = "styles.css";
    }

    // Menu móvel para responsividade (se for implementado posteriormente)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks2 = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks2) {
        menuToggle.addEventListener('click', function() {
            navLinks2.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Modal de vídeo
    const videoThumbs = document.querySelectorAll('.project-video-thumb');
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeEls = document.querySelectorAll('[data-close-modal]');
    let lastFocused = null;

    function openVideoModal(thumb) {
        if (!modal || !modalVideo) return;
        lastFocused = document.activeElement;
        const mp4 = thumb.getAttribute('data-video-mp4');
        const mov = thumb.getAttribute('data-video-mov');
        const poster = thumb.getAttribute('data-video-poster');
        modalVideo.innerHTML = '';
        if (poster) modalVideo.setAttribute('poster', poster);
        // Preferir MP4 (compatibilidade maior)
        if (mp4) {
            const s = document.createElement('source');
            s.src = mp4;
            s.type = 'video/mp4';
            modalVideo.appendChild(s);
        }
        if (mov) {
            const s2 = document.createElement('source');
            s2.src = mov;
            s2.type = 'video/quicktime';
            modalVideo.appendChild(s2);
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        modalVideo.load();
        modalVideo.play().catch(()=>{});
        // Foco acessível
        const closeBtn = modal.querySelector('.video-modal__close');
        if (closeBtn) closeBtn.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!modal || !modalVideo) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.innerHTML = '';
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }

    videoThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => openVideoModal(thumb));
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoModal(thumb);
            }
        });
        thumb.setAttribute('tabindex', '0');
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('aria-label', 'Abrir vídeo do projeto');
    });

    closeEls.forEach(el => el.addEventListener('click', closeVideoModal));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeVideoModal();
        }
    });
});
