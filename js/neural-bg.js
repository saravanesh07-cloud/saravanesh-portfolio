/**
 * =============================================================================
 * NEURAL NETWORK CANVAS BACKGROUND
 * =============================================================================
 * Lightweight, high-performance HTML5 Canvas rendering an AI/neural network
 * with interconnected particles and subtle interactive response.
 * Respects 'prefers-reduced-motion'.
 */

class NeuralCanvas {
  constructor(canvasId = "neural-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 55;
    this.maxDistance = 140;
    this.mouse = { x: -1000, y: -1000, radius: 150 };
    this.animId = null;
    this.isVisible = true;

    // Check prefers-reduced-motion
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();

    // Event listeners
    window.addEventListener("resize", () => this.resize(), { passive: true });
    
    // Mouse interaction over hero
    const heroSection = document.querySelector(".hero-section") || window;
    heroSection.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }, { passive: true });

    heroSection.addEventListener("mouseleave", () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    }, { passive: true });

    // Touch support
    heroSection.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.touches[0].clientX - rect.left;
        this.mouse.y = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });

    heroSection.addEventListener("touchend", () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    }, { passive: true });

    // Visibility Observer to pause when scrolled out of view
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animId && !this.reducedMotion) {
            this.animate();
          }
        });
      }, { threshold: 0.05 });

      observer.observe(this.canvas);
    }

    if (!this.reducedMotion) {
      this.animate();
    } else {
      // Draw single static frame
      this.draw();
    }
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement || document.body;
    this.width = this.canvas.width = parent.clientWidth;
    this.height = this.canvas.height = parent.clientHeight;
    
    // Scale particle count based on screen width
    if (this.width < 768) {
      this.particleCount = 30;
      this.maxDistance = 100;
    } else {
      this.particleCount = 55;
      this.maxDistance = 140;
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1.2,
        baseAlpha: Math.random() * 0.5 + 0.3,
        color: i % 4 === 0 ? "#00f2fe" : (i % 4 === 1 ? "#a855f7" : (i % 4 === 2 ? "#3b82f6" : "#10b981"))
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw connecting lines between particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDistance) {
          const alpha = (1 - dist / this.maxDistance) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(79, 172, 254, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }

      // Connect to mouse pointer
      const mdx = this.particles[i].x - this.mouse.x;
      const mdy = this.particles[i].y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < this.mouse.radius) {
        const malpha = (1 - mdist / this.mouse.radius) * 0.45;
        this.ctx.beginPath();
        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = `rgba(0, 242, 254, ${malpha})`;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();
      }
    }

    // Draw particle nodes
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.baseAlpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  }

  animate() {
    if (!this.isVisible || this.reducedMotion) {
      this.animId = null;
      return;
    }

    // Update positions
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Bounce on edges
      if (p.x <= 0 || p.x >= this.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= this.height) p.vy *= -1;

      // Gentle mouse avoidance
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * 1.5;
        p.y += Math.sin(angle) * 1.5;
      }
    }

    this.draw();
    this.animId = requestAnimationFrame(() => this.animate());
  }
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new NeuralCanvas("neural-canvas");
});
