/* Placeholder — Gemini Nano-Banana slot
   Renders a black dashed-border card containing:
   - the prompt to feed Gemini
   - what it is + where it lives
   - the motion it's tied to
   The user replaces this with the generated image when ready.
*/

function Placeholder(props) {
  const { id, title, aspectRatio, prompt, motion, dimensions, style } = props;

  const wrapStyle = { ...(style || {}) };
  if (aspectRatio) wrapStyle.aspectRatio = aspectRatio;

  return (
    <div className="placeholder" data-placeholder-id={id} style={wrapStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <span className="placeholder-tag">▮ Nano-Banana</span>
        <span className="placeholder-title">{id}</span>
      </div>

      <div className="placeholder-title">{title}</div>

      <div className="placeholder-prompt">{prompt}</div>

      {motion ? (
        <div className="placeholder-motion">
          <span>{'>'} Motion</span>
          <span>{motion}</span>
        </div>
      ) : null}

      <div className="placeholder-meta">
        <span>{dimensions || ''}</span>
        <span>Drop image here</span>
      </div>
    </div>
  );
}

window.Placeholder = Placeholder;
