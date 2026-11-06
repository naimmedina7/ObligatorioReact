import Modal from "react-modal";
import "../../ListaActividadesModal/Modal/Modal.css";
import EditarInscripcionForm from "../Formulario/EditarInscripcionForm";


const EditarInscripcionModal = ({ isOpen, onRequestClose, inscripcion, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Inscripción"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <EditarInscripcionForm inscripcion={inscripcion} onSave={onSave} onCancel={onRequestClose} />
    </Modal>
  )
}

export default EditarInscripcionModal
