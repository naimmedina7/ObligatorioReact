import Modal from "react-modal";
import "./Modal.css";
import EditarActividadForm from "../Formulario/EditarActividadForm";


const EditarActividadModal = ({ isOpen, onRequestClose, actividad, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Actividad"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <EditarActividadForm actividad={actividad} onSave={onSave} onCancel={onRequestClose} />
    </Modal>
  )
}

export default EditarActividadModal
