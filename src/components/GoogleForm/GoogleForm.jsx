export default function GoogleForm({ url }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src={url}
        width="100%"
        height="600"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Google Form"
      />
    </div>
  );
}
