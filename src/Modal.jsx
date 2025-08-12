import "./Modal.css";

export function Modal({ children, show, onClose }) {
  if (show) {
    return (
      <div className="modal-background" role="dialog" aria-modal="true">
        <section className="modal-main">
          {children}
          <button 
            className="close" 
            type="button" 
            onClick={onClose}
            aria-label="Close modal"
          >
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}