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
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const projectType = document.getElementById('project-type').value;
            const budget = document.getElementById('budget').value;
            const details = document.getElementById('project-details').value;
            
            // Validação básica
            if (!name || !email || !details) {
                alert('Por favor, preencha os campos obrigatórios.');
                return;
            }
            
            // Aqui você normalmente enviaria os dados para um servidor
            // Para demonstração, apenas mostramos uma mensagem de sucesso
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
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
});
