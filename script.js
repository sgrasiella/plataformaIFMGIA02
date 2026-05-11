document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Adjust for sticky header height
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the class 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // 4. Chatbot Interaction
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBot = document.getElementById('close-bot');
    const botBadge = document.querySelector('.bot-badge');
    const chatMessages = document.getElementById('chatbot-messages');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const inputField = document.getElementById('chatbot-input-field');

    const toggleChatbot = () => {
        chatbotWindow.classList.toggle('active');
        if (botBadge && chatbotWindow.classList.contains('active')) {
            botBadge.style.display = 'none';
        }
    };

    chatbotToggler.addEventListener('click', toggleChatbot);
    closeBot.addEventListener('click', toggleChatbot);

    const handleChat = () => {
        const message = inputField.value.trim();
        if(!message) return;
        
        // Append user message
        const userMsgDiv = document.createElement('div');
        userMsgDiv.classList.add('user-message');
        userMsgDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMsgDiv);
        
        inputField.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate Bot typing
        setTimeout(() => {
            const botMsgDiv = document.createElement('div');
            botMsgDiv.classList.add('bot-message');
            // Mock responses
            let botReply = "Que interessante! Atualmente o IFMG está investindo em diversas frentes para incorporar a tecnologia ao dia a dia. Para detalhes específicos, recomendo verificar as trilhas de curso em nossa plataforma.";
            if (message.toLowerCase().includes('curso')) {
                botReply = "Temos cursos presenciais, EaD e híbridos! Navegue na seção 'Cursos' acima para ver qual se encaixa melhor no seu perfil.";
            } else if (message.toLowerCase().includes('ferramenta')) {
                botReply = "Nossas ferramentas de IA recomendadas incluem Ollama, Hugging Face e Microsoft Copilot. Veja detalhes rolando a página!";
            } else if (message.toLowerCase().includes('olá') || message.toLowerCase().includes('oi')) {
                botReply = "Olá! É muito bom ter você por aqui. Qual sua dúvida sobre a integração de Inteligência Artificial no IFMG?";
            }
            
            botMsgDiv.innerHTML = `<p>${botReply}</p>`;
            chatMessages.appendChild(botMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    };

    sendBtn.addEventListener('click', handleChat);
    inputField.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleChat();
    });
});
