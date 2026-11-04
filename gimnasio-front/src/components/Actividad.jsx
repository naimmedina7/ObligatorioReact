// Estilo (clase de color + ícono) según el nombre de la categoría.
// Las clases cat-* están definidas en App.css.
const estilosPorCategoria = {
  musculacion: { clase: "cat-musculacion", icono: "bi-trophy" },
  funcional: { clase: "cat-funcional", icono: "bi-fire" },
  yoga: { clase: "cat-yoga", icono: "bi-flower1" },
  spinning: { clase: "cat-spinning", icono: "bi-bicycle" },
  natacion: { clase: "cat-natacion", icono: "bi-water" },
  boxeo: { clase: "cat-boxeo", icono: "bi-lightning-fill" },
};

const estiloPorDefecto = { clase: "cat-funcional", icono: "bi-activity" };

// "Natación" -> "natacion" (minúsculas y sin tildes)
const normalizar = (texto = "") =>
  texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

// La API manda la fecha en UTC ("2026-11-25T00:00:00.000Z").
// timeZone: "UTC" evita que en Uruguay se muestre un día antes.
const formatearFecha = (fecha) =>
  fecha
    ? new Date(fecha).toLocaleDateString("es-UY", { timeZone: "UTC" })
    : "-";

const Actividad = ({ actividad, categoria, onInscribir, onEditar, puedeEditar = false }) => {
  const estilo = estilosPorCategoria[normalizar(categoria)] ?? estiloPorDefecto;

  return (
    <div className="col-sm-6 col-lg-4">
      <div className="card card-hover h-100">
        <div className={`activity-cover ${estilo.clase}`}>
          <i className={`bi ${estilo.icono}`}></i>
        </div>
        <div className="card-body d-flex flex-column">
          <span className="badge text-bg-light align-self-start mb-2">
            {categoria || "Sin categoría"}
          </span>
          <h5 className="fw-bold">{actividad.name}</h5>
          <p className="text-muted small flex-grow-1">{actividad.description}</p>
          <div className="d-flex gap-3 small text-muted mb-3">
            <span>
              <i className="bi bi-calendar3"></i> {formatearFecha(actividad.date)}
            </span>
            <span>
              <i className="bi bi-clock"></i> {actividad.schedule}
            </span>
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary btn-sm flex-fill">
              Ver detalle
            </button>
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
