export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div style={{
        width: 48,
        height: 48,
        border: '6px solid #eee',
        borderTop: '6px solid #888',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <span style={{ fontSize: 18, color: '#888', marginTop: 16 }}>Loading...</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
