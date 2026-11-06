import Modal from "react-modal";
import "../../ListaActividadesModal/Modal/Modal.css";

// DELETE /v1/inscripciones/:id
// No lleva formulario: es solo una confirmación
const CancelarInscripcionModal = ({ isOpen, onRequestClose, inscripcion, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cancelar Inscripción"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h5 className="modal-title fw-bold">Cancelar inscripción</h5>
        <button type="button" className="btn-close" aria-label="Cerrar" onClick={onRequestClose}></button>
      </div>
      <div className="modal-body">
        ¿Seguro que querés cancelar tu inscripción a{" "}
        <strong>{inscripcion?.activityName}</strong>? Vas a liberar tu lugar.
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-secondary" onClick={onRequestClose}>
          Volver
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onConfirm(inscripcion)}>
          Sí, cancelar
        </button>
      </div>
    </Modal>
  )
}

export default CancelarInscripcionModal
