const Premium = () => {
  return (
    <>
      {/* <!-- UPGRADE -> PATCH /v1/usuarios/premium (sin body, toma el usuario del token) --> */}
      <main className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge badge-premium mb-3 p-2">
              <i className="bi bi-star-fill"></i> Premium
            </span>
            <h1 className="h2 fw-bold">
              Llevá tu entrenamiento al siguiente nivel
            </h1>
            <p className="text-muted">
              Inscribite a todas las actividades que quieras, sin límites.
            </p>
          </div>

          {/* <!-- Estado de éxito: 200 "Usuario actualizado a premium con éxito" --> */}
          <div
            className="alert alert-success d-flex align-items-center gap-2 mx-auto"
            style={{ maxWidth: "760px" }}
          >
            <i className="bi bi-check-circle-fill"></i> ¡Listo! Tu cuenta ahora
            es Premium.
          </div>

          <div className="row g-4 justify-content-center">
            {/* <!-- Plan actual --> */}
            <div className="col-md-6 col-lg-4">
              <div className="card plan-card h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold mb-0">Clásico</h5>
                  <span className="badge text-bg-secondary">
                    Tu plan actual
                  </span>
                </div>
                <div className="plan-price">Gratis</div>
                <ul className="list-unstyled my-4">
                  <li className="mb-2">
                    <i className="bi bi-check2 text-success me-2"></i>Acceso a
                    todas las actividades
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check2 text-success me-2"></i>Hasta 4
                    inscripciones
                  </li>
                  <li className="mb-2 text-muted">
                    <i className="bi bi-x me-2"></i>Inscripciones ilimitadas
                  </li>
                </ul>
                <button className="btn btn-outline-secondary mt-auto" disabled>
                  Plan actual
                </button>
              </div>
            </div>

            {/* <!-- Premium --> */}
            <div className="col-md-6 col-lg-4">
              <div className="card plan-card featured h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold mb-0">Premium</h5>
                  <span className="badge badge-premium">
                    <i className="bi bi-star-fill"></i> Recomendado
                  </span>
                </div>
                <div className="plan-price">Sin límites</div>
                <ul className="list-unstyled my-4">
                  <li className="mb-2">
                    <i className="bi bi-check2 text-success me-2"></i>Acceso a
                    todas las actividades
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check2 text-success me-2"></i>
                    <strong>Inscripciones ilimitadas</strong>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check2 text-success me-2"></i>Insignia
                    Premium en tu perfil
                  </li>
                </ul>
                <button
                  className="btn btn-brand mt-auto"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPremium"
                >
                  Hacerme Premium
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Estado alternativo: usuario que ya es premium (400 "El usuario ya es premium") --> */}
          <div
            className="card p-4 mt-5 mx-auto text-center"
            style={{ height: "520px" }}
          >
            <div className="feature-icon mx-auto mb-3">
              <i className="bi bi-patch-check-fill"></i>
            </div>
            <h5 className="fw-bold mb-1">Ya sos Premium</h5>
            <p className="text-muted mb-0">
              Disfrutá de inscripciones ilimitadas en todas las actividades.
            </p>
          </div>
        </div>
      </main>

      {/* <!-- MODAL CONFIRMAR PREMIUM --> */}
      <div className="modal fade" id="modalPremium" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Pasarte a Premium</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              Vas a cambiar tu plan a <strong>Premium</strong> y vas a poder
              inscribirte a actividades sin límite. ¿Confirmás?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-brand"
                data-bs-dismiss="modal"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;
