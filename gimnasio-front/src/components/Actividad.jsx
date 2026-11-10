const Actividad = ({ actividad, categoria, onInscribir, onEditar, puedeEditar = false }) => {

  return (
    <div className="col-sm-6 col-lg-4">
      <div className="card card-hover h-100">
        <div className="card-body d-flex flex-column">
          <span className="badge text-bg-light align-self-start mb-2">
            {categoria || "Sin categoría"}
          </span>
          <h5 className="fw-bold">{actividad.name}</h5>
          <p className="text-muted small flex-grow-1">{actividad.description}</p>
          <div className="d-flex gap-3 small text-muted mb-3">
            <span>
              <i className="bi bi-clock"></i> {actividad.schedule}
            </span>
          </div>
          <div className="d-flex gap-2">
            {puedeEditar && (
              <button type="button" className="btn btn-outline-secondary btn-sm flex-fill" onClick={() => onEditar?.(actividad)}>
                <i className="bi bi-pencil"></i> Editar
              </button>
            )}
            <button type="button" className="btn btn-brand btn-sm flex-fill" onClick={() => onInscribir?.(actividad)}>
              Inscribirme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividad;
