/**
 * Dead by Daylight Interactive Skill Check Engine
 */
import { audio } from './audio.js';

export class SkillCheckGame {
  constructor(containerId, onResultCallback) {
    this.container = document.getElementById(containerId);
    this.onResult = onResultCallback;
    this.canvas = null;
    this.ctx = null;
    this.isRunning = false;
    this.animFrame = null;
    this.angle = 0; // In radians
    this.speed = 0.055; // Rotation speed
    this.warningTime = 800; // ms warning before needle moves
    this.state = 'idle'; // idle, warning, spinning, finished
    
    // Skill check arc definitions (in radians from -PI/2)
    this.successStart = 0;
    this.successEnd = 0;
    this.greatStart = 0;
    this.greatEnd = 0;
    
    this.score = 0;
    this.streak = 0;
    this.discountUnlocked = 0;

    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="skillcheck-modal-backdrop" id="scBackdrop">
        <div class="skillcheck-card">
          <button class="skillcheck-close" id="scCloseBtn" aria-label="Cerrar">&times;</button>
          
          <div class="skillcheck-header">
            <span class="sc-badge">⚡ MINIJUEGO DE LA NIEBLA</span>
            <h2 class="sc-title">Prueba de Habilidad</h2>
            <p class="sc-desc">Acierta la aguja en la zona de éxito y gana hasta <strong>20% de descuento</strong></p>
          </div>

          <div class="skillcheck-arena">
            <div class="sc-canvas-wrapper" id="scCanvasWrapper">
              <canvas id="scCanvas" width="200" height="200"></canvas>
              <div class="sc-center-hub">
                <span class="sc-hub-icon">⚙️</span>
                <span class="sc-prompt-text">ESPACIO</span>
              </div>
              <div class="sc-sparks" id="scSparks"></div>
            </div>

            <div class="sc-status-message" id="scStatusMsg">
              Presiona <strong>"Iniciar"</strong> o pulsa <strong>Espacio</strong>
            </div>

            <div class="sc-rewards-bar">
              <div class="sc-stat-pill">
                <span class="label">Racha:</span>
                <span class="val" id="scStreakVal">0</span>
              </div>
              <div class="sc-stat-pill highlight">
                <span class="label">Bono:</span>
                <span class="val" id="scBPVal">+0 BP</span>
              </div>
              <div class="sc-stat-pill gold">
                <span class="label">Desc:</span>
                <span class="val" id="scDiscountVal">0%</span>
              </div>
            </div>
          </div>

          <div class="skillcheck-actions">
            <button class="btn-dbd btn-killer" id="scStartBtn">
              <span class="btn-glow"></span>
              <span class="btn-text">🔧 Iniciar Reparación</span>
            </button>
            <button class="btn-dbd btn-ghost" id="scHitBtn" style="display:none;">
              <span class="btn-text">💥 ¡GOLPEAR!</span>
            </button>
            <button class="btn-dbd btn-survivor" id="scApplyCouponBtn" style="display:none;">
              <span class="btn-text">🎁 Usar Cupón en Pedido</span>
            </button>
          </div>
          
          <div class="sc-hint-footer">
            <span>💡 <strong>Consejo:</strong> Atento al sonido <em>"¡Ting!"</em> justo antes del giro.</span>
          </div>
        </div>
      </div>
    `;

    this.canvas = document.getElementById('scCanvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }
  }

  bindEvents() {
    const closeBtn = document.getElementById('scCloseBtn');
    const startBtn = document.getElementById('scStartBtn');
    const hitBtn = document.getElementById('scHitBtn');
    const applyBtn = document.getElementById('scApplyCouponBtn');
    const backdrop = document.getElementById('scBackdrop');
    const canvasWrap = document.getElementById('scCanvasWrapper');

    if (closeBtn) closeBtn.addEventListener('click', () => this.hide());
    if (backdrop) backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.hide();
    });

    if (startBtn) startBtn.addEventListener('click', () => this.startRound());
    if (hitBtn) hitBtn.addEventListener('click', () => this.attemptHit());
    if (canvasWrap) canvasWrap.addEventListener('click', () => {
      if (this.state === 'spinning') {
        this.attemptHit();
      }
    });

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        if (this.onResult) {
          this.onResult(this.discountUnlocked, this.score);
        }
        this.hide();
      });
    }

    // Spacebar listener
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.isVisible()) {
        e.preventDefault();
        if (this.state === 'spinning') {
          this.attemptHit();
        } else if (this.state === 'idle' || this.state === 'finished') {
          this.startRound();
        }
      }
    });
  }

  show() {
    const bd = document.getElementById('scBackdrop');
    if (bd) {
      bd.classList.add('active');
      this.drawInitialRing();
    }
  }

  hide() {
    this.stopAnimation();
    const bd = document.getElementById('scBackdrop');
    if (bd) bd.classList.remove('active');
  }

  isVisible() {
    const bd = document.getElementById('scBackdrop');
    return bd && bd.classList.contains('active');
  }

  startRound() {
    if (this.state === 'spinning' || this.state === 'warning') return;

    const startBtn = document.getElementById('scStartBtn');
    const hitBtn = document.getElementById('scHitBtn');
    const applyBtn = document.getElementById('scApplyCouponBtn');
    const statusMsg = document.getElementById('scStatusMsg');
    
    if (startBtn) startBtn.style.display = 'none';
    if (applyBtn) applyBtn.style.display = 'none';
    if (hitBtn) hitBtn.style.display = 'inline-flex';

    if (statusMsg) {
      statusMsg.innerHTML = '<span class="status-warning">⚠️ ¡Atento al sonido del Ente...!</span>';
    }

    this.state = 'warning';

    // Play warning sound
    audio.playSkillCheckWarning();

    // Randomize zone placement
    // Needle starts at 0 (top: -PI/2) and goes clockwise up to 2*PI
    // Success zone placed between 120 deg (2.09 rad) and 300 deg (5.23 rad)
    const minStart = Math.PI * 0.7;
    const maxStart = Math.PI * 1.4;
    this.successStart = minStart + Math.random() * (maxStart - minStart);
    const successLength = 0.45; // ~26 degrees
    this.successEnd = this.successStart + successLength;

    // Great zone is the first 25% of the success zone
    const greatLength = 0.12;
    this.greatStart = this.successStart;
    this.greatEnd = this.successStart + greatLength;

    this.angle = 0; // Starts at top (-PI/2)

    setTimeout(() => {
      if (!this.isVisible()) return;
      this.state = 'spinning';
      if (statusMsg) {
        statusMsg.innerHTML = '<span class="status-active">⚡ ¡PRESIONA ESPACIO EN LA ZONA ROJA O BLANCA!</span>';
      }
      this.lastTime = performance.now();
      this.animate();
    }, 600);
  }

  animate() {
    if (this.state !== 'spinning') return;

    this.angle += this.speed;

    this.render();

    // If needle goes past full circle (2*PI) without hitting -> FAIL
    if (this.angle >= Math.PI * 2) {
      this.handleMiss();
      return;
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  attemptHit() {
    if (this.state !== 'spinning') return;
    this.stopAnimation();

    // Check hit position
    if (this.angle >= this.greatStart && this.angle <= this.greatEnd) {
      this.handleGreatHit();
    } else if (this.angle >= this.successStart && this.angle <= this.successEnd) {
      this.handleGoodHit();
    } else {
      this.handleMiss();
    }
  }

  handleGreatHit() {
    this.state = 'finished';
    this.streak += 1;
    const bpAward = 10000 * this.streak;
    this.score += bpAward;
    this.discountUnlocked = Math.min(25, 10 + this.streak * 5);

    audio.playSkillCheckGreat();
    audio.playBloodpointClaim();

    this.updateStats(bpAward, '¡GREAT SKILL CHECK! ¡PERFECTO!');
    this.renderHitEffect('#00ffaa');
    this.showFinishControls(true);
  }

  handleGoodHit() {
    this.state = 'finished';
    this.streak += 1;
    const bpAward = 5000 * this.streak;
    this.score += bpAward;
    this.discountUnlocked = Math.max(this.discountUnlocked, 10);

    audio.playSkillCheckGood();
    audio.playBloodpointClaim();

    this.updateStats(bpAward, '¡Buen acierto! Reparación exitosa.');
    this.renderHitEffect('#ffffff');
    this.showFinishControls(true);
  }

  handleMiss() {
    this.state = 'finished';
    this.streak = 0;

    audio.playSkillCheckFail();

    const statusMsg = document.getElementById('scStatusMsg');
    if (statusMsg) {
      statusMsg.innerHTML = '<span class="status-fail">💥 ¡FALLASTE! El generador explotó y el Ente se alertó.</span>';
    }

    this.triggerExplosionAnimation();
    this.showFinishControls(false);
  }

  updateStats(bpGained, message) {
    const streakVal = document.getElementById('scStreakVal');
    const bpVal = document.getElementById('scBPVal');
    const discountVal = document.getElementById('scDiscountVal');
    const statusMsg = document.getElementById('scStatusMsg');

    if (streakVal) streakVal.textContent = this.streak;
    if (bpVal) bpVal.textContent = `+${this.score.toLocaleString()} BP`;
    if (discountVal) discountVal.textContent = `${this.discountUnlocked}%`;
    if (statusMsg) {
      statusMsg.innerHTML = `<span class="status-success">✨ ${message} (+${bpGained.toLocaleString()} BP | ${this.discountUnlocked}% OFF)</span>`;
    }
  }

  showFinishControls(success) {
    const startBtn = document.getElementById('scStartBtn');
    const hitBtn = document.getElementById('scHitBtn');
    const applyBtn = document.getElementById('scApplyCouponBtn');

    if (hitBtn) hitBtn.style.display = 'none';
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.querySelector('.btn-text').textContent = '🔄 Probar Otra Vez';
    }
    if (applyBtn && this.discountUnlocked > 0) {
      applyBtn.style.display = 'inline-flex';
      applyBtn.querySelector('.btn-text').textContent = `🎁 Usar Cupón ${this.discountUnlocked}% en Pedido`;
    }
  }

  triggerExplosionAnimation() {
    const canvasWrap = document.getElementById('scCanvasWrapper');
    if (canvasWrap) {
      canvasWrap.classList.remove('explode-shake');
      void canvasWrap.offsetWidth; // trigger reflow
      canvasWrap.classList.add('explode-shake');
    }
  }

  renderHitEffect(glowColor) {
    const canvasWrap = document.getElementById('scCanvasWrapper');
    if (canvasWrap) {
      canvasWrap.style.boxShadow = `0 0 40px ${glowColor}`;
      setTimeout(() => {
        canvasWrap.style.boxShadow = '';
      }, 500);
    }
  }

  stopAnimation() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }
  }

  drawInitialRing() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, 200, 200);
    const cx = 100;
    const cy = 100;
    const r = 78;

    // Track circle
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, 200, 200);
    const cx = 100;
    const cy = 100;
    const r = 78;
    const baseOffset = -Math.PI / 2; // top is zero in our game

    // Background track ring
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(25, 28, 38, 0.9)';
    this.ctx.lineWidth = 12;
    this.ctx.stroke();

    // Subtle outer border
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r + 7, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(255, 42, 75, 0.3)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    // 1. Success Zone (White/Grayish Arc)
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, baseOffset + this.successStart, baseOffset + this.successEnd);
    this.ctx.strokeStyle = 'rgba(230, 235, 245, 0.95)';
    this.ctx.lineWidth = 12;
    this.ctx.stroke();

    // 2. Great Success Zone (Red/Crimson Glow Arc)
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, baseOffset + this.greatStart, baseOffset + this.greatEnd);
    this.ctx.strokeStyle = '#ff204e';
    this.ctx.lineWidth = 14;
    this.ctx.stroke();

    // Inner gold indicator in great zone
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, baseOffset + this.greatStart, baseOffset + this.greatEnd);
    this.ctx.strokeStyle = '#ffdf6d';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    // 3. Rotating Needle (Red line with glow)
    const currentNeedleAngle = baseOffset + this.angle;
    const nx1 = cx + Math.cos(currentNeedleAngle) * (r - 20);
    const ny1 = cy + Math.sin(currentNeedleAngle) * (r - 20);
    const nx2 = cx + Math.cos(currentNeedleAngle) * (r + 14);
    const ny2 = cy + Math.sin(currentNeedleAngle) * (r + 14);

    this.ctx.save();
    this.ctx.shadowColor = '#ff204e';
    this.ctx.shadowBlur = 10;
    this.ctx.beginPath();
    this.ctx.moveTo(nx1, ny1);
    this.ctx.lineTo(nx2, ny2);
    this.ctx.strokeStyle = '#ff3366';
    this.ctx.lineWidth = 3.5;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Needle tip pip
    this.ctx.beginPath();
    this.ctx.arc(nx2, ny2, 3.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.restore();
  }
}
