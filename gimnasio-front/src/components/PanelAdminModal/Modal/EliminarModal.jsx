import Modal from "react-modal";
import "../../ListaActividadesModal/Modal/Modal.css";
// Sirve para eliminar una actividad o una categoría.
const EliminarModal = ({ isOpen, onRequestClose, nombre, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Eliminar"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h5 className="modal-title fw-bold">Eliminar</h5>
        <button type="button" className="btn-close" aria-label="Cerrar" onClick={onRequestClose}></button>
      </div>
      <div className="modal-body">
        <p>¿Seguro que querés eliminar <strong>{nombre}</strong>? Esta acción no se puede deshacer.</p>
        <div className="alert alert-warning small mb-0">
          <i className="bi bi-info-circle"></i> No se puede eliminar una actividad con inscripciones, ni una categoría con actividades asociadas.
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-secondary" onClick={onRequestClose}>
          Cancelar
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Eliminar
        </button>
      </div>
    </Modal>
  )
}

export default EliminarModal
