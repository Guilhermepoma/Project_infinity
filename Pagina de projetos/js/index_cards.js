// Efeitos 3D para os cards de perfil
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.pc-card-wrapper');
  
  cards.forEach(card => {
    const cardElement = card.querySelector('.pc-card');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      const pointerX = (x / rect.width) * 100;
      const pointerY = (y / rect.height) * 100;
      
      const pointerFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      ) / Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
      
      const pointerFromTop = y / rect.height;
      const pointerFromLeft = x / rect.width;
      
      card.style.setProperty('--pointer-x', `${pointerX}%`);
      card.style.setProperty('--pointer-y', `${pointerY}%`);
      card.style.setProperty('--pointer-from-center', pointerFromCenter);
      card.style.setProperty('--pointer-from-top', pointerFromTop);
      card.style.setProperty('--pointer-from-left', pointerFromLeft);
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
      card.style.setProperty('--card-opacity', '1');
      
      cardElement.classList.add('active');
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--pointer-x', '50%');
      card.style.setProperty('--pointer-y', '50%');
      card.style.setProperty('--pointer-from-center', '0');
      card.style.setProperty('--pointer-from-top', '0');
      card.style.setProperty('--pointer-from-left', '0');
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      card.style.setProperty('--card-opacity', '0.8');
      
      cardElement.classList.remove('active');
    });
  });
});