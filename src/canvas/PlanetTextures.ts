// Procedural planet textures, ported from the original vanilla build.
// A deep-violet basalt diffuse map with an etched "cmd" wordmark, plus a
// matching bump map. Generated on a 2D canvas → CanvasTexture.
// NOTE: call these only after document.fonts.ready so the etched "cmd"
// renders in Fraunces, not a fallback face.

const ETCH_FONT = 'italic 600 210px "Fraunces Variable", Georgia, serif';

export function createPlanetTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0a081a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Faint atmospheric colour blooms.
  for (let i = 0; i < 6; i++) {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height;
    const radius = 250 + Math.random() * 300;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, 'rgba(42, 35, 66, 0.45)');
    grad.addColorStop(0.5, 'rgba(26, 15, 61, 0.2)');
    grad.addColorStop(1, 'rgba(10, 8, 26, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine basalt dust.
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.5;
    ctx.fillStyle = `rgba(200, 168, 255, ${Math.random() * 0.12})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hairline fissures.
  ctx.strokeStyle = 'rgba(200, 168, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    ctx.moveTo(x, y);
    for (let j = 0; j < 15; j++) {
      x += (Math.random() - 0.5) * 140;
      y += (Math.random() - 0.5) * 140;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Etched "cmd" (repeated so it wraps seamlessly on the sphere).
  ctx.font = ETCH_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const drawDiffuseText = (x: number, y: number) => {
    ctx.fillStyle = '#060510';
    ctx.fillText('cmd', x, y);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText('cmd', x, y);
    ctx.fillStyle = 'rgba(200, 168, 255, 0.2)';
    ctx.fillText('cmd', x + 2, y + 2);
    ctx.fillStyle = '#060510';
    ctx.fillText('cmd', x, y);
  };
  drawDiffuseText(1024, 512);
  drawDiffuseText(2048, 512);
  drawDiffuseText(0, 512);

  return canvas;
}

export function createPlanetBumpMap(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgb(128,128,128)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  for (let i = 0; i < 35; i++) {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height;
    const radius = 25 + Math.random() * 70;
    const rim = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius);
    rim.addColorStop(0, 'rgba(128,128,128,0)');
    rim.addColorStop(0.5, 'rgba(180,180,180,0.4)');
    rim.addColorStop(1, 'rgba(128,128,128,0)');
    ctx.fillStyle = rim;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    const bowl = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.75);
    bowl.addColorStop(0, 'rgba(60,60,60,0.5)');
    bowl.addColorStop(0.7, 'rgba(95,95,95,0.25)');
    bowl.addColorStop(1, 'rgba(128,128,128,0)');
    ctx.fillStyle = bowl;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.75, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = 'rgba(40,40,40,0.45)';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    ctx.moveTo(x, y);
    for (let j = 0; j < 12; j++) {
      x += (Math.random() - 0.5) * 110;
      y += (Math.random() - 0.5) * 110;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.font = ETCH_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const drawEtchedText = (x: number, y: number) => {
    ctx.filter = 'blur(8px)';
    ctx.fillStyle = 'rgb(75,75,75)';
    ctx.fillText('cmd', x, y);
    ctx.filter = 'blur(4px)';
    ctx.fillStyle = 'rgb(45,45,45)';
    ctx.fillText('cmd', x, y);
    ctx.filter = 'none';
    ctx.fillStyle = 'rgb(20,20,20)';
    ctx.fillText('cmd', x, y);
    ctx.fillStyle = 'rgb(180,180,180)';
    ctx.fillText('cmd', x + 3, y + 3);
    ctx.fillStyle = 'rgb(20,20,20)';
    ctx.fillText('cmd', x, y);
  };
  drawEtchedText(1024, 512);
  drawEtchedText(2048, 512);
  drawEtchedText(0, 512);

  return canvas;
}
