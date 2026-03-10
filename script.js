/**
 * JS for subtle interactions to enhance the premium feel.
 * Focuses on a 3D tilt effect for the link cards.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.tilt-effect');
  
  // Disable 3D tilt on touch devices for better performance/UX
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  if (!isTouchDevice) {
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mouseenter', handleMouseEnter);
    });
  }

  function handleMouseMove(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    // Calculate rotation angles (max 5 degrees)
    const rotateX = -(mouseY / (cardRect.height / 2)) * 5;
    const rotateY = (mouseX / (cardRect.width / 2)) * 5;
    
    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-2px)`;
    card.style.zIndex = '10';
  }

  function handleMouseLeave(e) {
    const card = this;
    // Reset transform smoothly
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)`;
    card.style.zIndex = '1';
    
    // Reset transition
    setTimeout(() => {
        card.style.transition = 'var(--transition-normal)';
    }, 50);
  }

  function handleMouseEnter(e) {
      const card = this;
      // Remove transition for crisp tracking during mousemove
      card.style.transition = 'transform 0.1s ease-out, background 0.3s, border-color 0.3s, box-shadow 0.3s';
  }
});
