export default function ErrorMessage({ message, onDismiss }) {
    if (!message) return null;

    return (
        <div className="error-message" role="alert">
            <span>{message}</span>
            {onDismiss && (
                <button className="error-message__dismiss" onClick={onDismiss}>
                    ✕
                </button>
            )}
        </div>
    );
}
