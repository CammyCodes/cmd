/* AssetManifest — developer-facing appendix.
   Lists every Gemini Nano-Banana asset slot in the build with its prompt and motion notes.
   Surfaces at the very end of the page so the live journey stays clean.
*/

function AssetManifest({ slots }) {
  const Placeholder = window.Placeholder;
  const MonoLabel = window.MonoLabel;

  return (
    <section className="scene" id="manifest" data-screen-label="09 Asset Manifest" style={{
      borderTop: '1px solid var(--ink-60)',
      paddingTop: 96,
      paddingBottom: 128,
      minHeight: 'auto',
      alignItems: 'flex-start'
    }}>
      <div className="scene-inner">
        <MonoLabel>{'> 006 / ASSET MANIFEST — FOR PRODUCTION'}</MonoLabel>

        <h2 className="display-l fraunces" style={{ maxWidth: '18ch', marginBottom: 24 }}>
          Hand these to Gemini.
        </h2>

        <p style={{ color: 'var(--ink-20)', maxWidth: '52ch', marginBottom: 64, fontSize: 15, lineHeight: 1.6 }}>
          Every image slot in the prototype is listed below with the prompt to feed Gemini Nano-Banana
          and the motion it's tied to once placed. Drop generated images into the matching slot IDs.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 24
        }}>
          {slots.map(s => (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', minHeight: 360 }}>
              <Placeholder
                id={s.id}
                title={s.title}
                prompt={s.prompt}
                dimensions={s.dimensions}
                motion={s.motion}
                style={{ flex: 1, minHeight: 320 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.AssetManifest = AssetManifest;
