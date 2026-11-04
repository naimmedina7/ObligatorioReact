import Modal from "react-modal";
import "./Modal.css";
import InscripcionForm from "../Formulario/InscripcionForm";


const InscripcionModal = ({ isOpen, onRequestClose, actividad, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmar Inscripción"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <InscripcionForm actividad={actividad} onSave={onSave} onCancel={onRequestClose} />
    </Modal>
  )
}

export default InscripcionModal
