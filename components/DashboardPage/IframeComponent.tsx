export default function IframeComponent({ src }: { src: string }) {
  // Note: This will not work for heygen.com due to their CSP. Show a fallback message.
  return (
    <div style={{ width: '100%', height: 500, border: 'none', background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}>
      <span style={{ color: '#888', fontSize: 16, textAlign: 'center', padding: 24 }}>
        Video embedding is not allowed by the source site (CSP restriction).<br />
        <a href={src} target="_blank" rel="noopener noreferrer" style={{ color: '#00BFCB', textDecoration: 'underline' }}>Open video in a new tab</a>
      </span>
    </div>
  );
}
