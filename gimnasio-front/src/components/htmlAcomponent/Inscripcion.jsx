const Inscripcion = () => {
  return (
    <>
      {/* <!-- LISTADO -> GET /v1/inscripciones?page=1&limit=5 (solo las del usuario del token) --> */}
      <main className="py-5">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
            <div>
              <h1 className="h2 fw-bold mb-1">Mis inscripciones</h1>
              <p className="text-muted mb-0">
                Las actividades a las que estás anotado.
              </p>
            </div>
            <a href="actividades.html" className="btn btn-brand">
              <i className="bi bi-plus-lg"></i> Nueva inscripción
            </a>
          </div>

          {/* <!-- Uso del plan (no premium: máximo 4) --> */}
          <div className="card p-4 mb-4">
            <div className="row align-items-center g-3">
              <div className="col-md-8">
                <div className="d-flex justify-content-between small mb-2">
                  <span className="fw-semibold">Plan Clásico</span>
                  <span className="text-muted">3 de 4 inscripciones</span>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar"
                    style={{ width: "75%", background: "var(--brand)" }}
                  ></div>
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <a href="premium.html" className="btn btn-outline-brand btn-sm">
                  <i className="bi bi-star"></i> Inscripciones ilimitadas
                </a>
              </div>
            </div>
          </div>

          {/* <!-- Tabla de inscripciones --> */}
          <div className="card">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Actividad</th>
                    <th>Fecha</th>
                    <th>Horario</th>
                    <th>Inscripto el</th>
                    <th className="text-end pe-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-4">
                      <strong>Yoga Matutino</strong>
                      <div className="small text-muted">Yoga</div>
                    </td>
                    <td>21/10/2026</td>
                    <td>08:00</td>
                    <td className="text-muted small">14/10/2026</td>
                    <td className="text-end pe-4">
                      <a
                        href="actividad.html"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        <i className="bi bi-eye"></i>
                      </a>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCancelar"
                      >
                        <i className="bi bi-x-lg"></i> Cancelar
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4">
                      <strong>Natación Libre</strong>
                      <div className="small text-muted">Natación</div>
                    </td>
                    <td>24/10/2026</td>
                    <td>10:00</td>
                    <td className="text-muted small">15/10/2026</td>
                    <td className="text-end pe-4">
                      <a
                        href="actividad.html"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        <i className="bi bi-eye"></i>
                      </a>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCancelar"
                      >
                        <i className="bi bi-x-lg"></i> Cancelar
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4">
                      <strong>Boxeo Recreativo</strong>
                      <div className="small text-muted">Boxeo</div>
                    </td>
                    <td>25/10/2026</td>
                    <td>20:00</td>
                    <td className="text-muted small">16/10/2026</td>
                    <td className="text-end pe-4">
                      <a
                        href="actividad.html"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        <i className="bi bi-eye"></i>
                      </a>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCancelar"
                      >
                        <i className="bi bi-x-lg"></i> Cancelar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Anterior
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Siguiente
                </a>
              </li>
            </ul>
          </nav>

          {/* <!-- Estado vacío (mostrar cuando data.length === 0) --> */}
          <div className="card p-5 text-center mt-4">
            <div className="feature-icon mx-auto mb-3">
              <i className="bi bi-calendar-x"></i>
            </div>
            <h5 className="fw-bold">Todavía no tenés inscripciones</h5>
            <p className="text-muted">
              Explorá las actividades y reservá tu primer lugar.
            </p>
            <div>
              <a href="actividades.html" className="btn btn-brand">
                Ver actividades
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* <!-- MODAL CANCELAR -> DELETE /v1/inscripciones/:id --> */}
      <div className="modal fade" id="modalCancelar" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Cancelar inscripción</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              ¿Seguro que querés cancelar tu inscripción a{" "}
              <strong>Yoga Matutino</strong>? Vas a liberar tu lugar.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Volver
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inscripcion;
