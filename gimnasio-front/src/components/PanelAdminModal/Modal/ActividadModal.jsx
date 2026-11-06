import Modal from "react-modal";
import "../../ListaActividadesModal/Modal/Modal.css";
import ActividadForm from "../Formulario/ActividadForm";


// Sirve para crear (actividad = null) y para editar (actividad = la seleccionada)
const ActividadModal = ({ isOpen, onRequestClose, actividad, categorias, onSave, errorApi }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Actividad"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <ActividadForm
        actividad={actividad}
        categorias={categorias}
        onSave={onSave}
        onCancel={onRequestClose}
        errorApi={errorApi}
      />
    </Modal>
  )
}

export default ActividadModal
