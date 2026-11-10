import Modal from "react-modal";
import "../../ListaActividadesModal/Modal/Modal.css";
import CategoriaForm from "../Formulario/CategoriaForm";

// Sirve para crear y para editar
const CategoriaModal = ({ isOpen, onRequestClose, categoria, onSave, errorApi }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Categoría"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <CategoriaForm
        categoria={categoria}
        onSave={onSave}
        onCancel={onRequestClose}
        errorApi={errorApi}
      />
    </Modal>
  )
}

export default CategoriaModal
