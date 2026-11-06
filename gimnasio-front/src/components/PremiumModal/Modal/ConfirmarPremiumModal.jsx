import Modal from "react-modal";
import "../../ListaActividadesModal/Modal/Modal.css";

// PATCH /v1/usuarios/premium
// No lleva formulario: es solo una confirmación (igual que CancelarInscripcionModal)
const ConfirmarPremiumModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Pasarte a Premium"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h5 className="modal-title fw-bold">Pasarte a Premium</h5>
        <button type="button" className="btn-close" aria-label="Cerrar" onClick={onRequestClose}></button>
      </div>
      <div className="modal-body">
        Vas a cambiar tu plan a <strong>Premium</strong> y vas a poder
        inscribirte a actividades sin límite. ¿Confirmás?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-secondary" onClick={onRequestClose}>
          Cancelar
        </button>
        <button type="button" className="btn btn-brand" onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmarPremiumModal
