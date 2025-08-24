// Tema
    const toggle = document.getElementById('toggleTema');

    // começa no modo escuro (sem a classe "light")
    document.documentElement.classList.remove('light');

    toggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
    });

    // Ano no rodapé
    document.getElementById('ano').textContent = new Date().getFullYear();

    // Efeito tilt nos cards
    const cards = document.querySelectorAll('.pc-card');
    
    cards.forEach(card => {
      const wrapper = card.parentElement;
      
      const clamp = (value, min = 0, max = 100) =>
        Math.min(Math.max(value, min), max);

      const round = (value, precision = 3) =>
        parseFloat(value.toFixed(precision));

      const adjust = (value, fromMin, fromMax, toMin, toMax) =>
        round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

      const updateCardTransform = (offsetX, offsetY) => {
        const width = card.clientWidth;
        const height = card.clientHeight;
        const percentX = clamp((100 / width) * offsetX);
        const percentY = clamp((100 / height) * offsetY);
        const centerX = percentX - 50;
        const centerY = percentY - 50;
        
        const properties = {
          "--pointer-x": `${percentX}%`,
          "--pointer-y": `${percentY}%`,
          "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
          "--pointer-from-top": `${percentY / 100}`,
          "--pointer-from-left": `${percentX / 100}`,
          "--rotate-x": `${round(-(centerX / 5))}deg`,
          "--rotate-y": `${round(centerY / 4)}deg`,
        };
        
        Object.entries(properties).forEach(([property, value]) => {
          wrapper.style.setProperty(property, value);
        });
      };

      card.addEventListener('pointerenter', () => {
        wrapper.classList.add('active');
        card.classList.add('active');
      });

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        updateCardTransform(
          event.clientX - rect.left,
          event.clientY - rect.top
        );
      });

      card.addEventListener('pointerleave', () => {
        wrapper.classList.remove('active');
        card.classList.remove('active');
        
        // Reset to center position
        updateCardTransform(card.clientWidth / 2, card.clientHeight / 2);
      });
    });