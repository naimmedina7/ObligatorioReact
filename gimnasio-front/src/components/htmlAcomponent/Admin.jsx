

const Admin = () => {
  return (
   <>

    <main className="py-5">
    <div className="container">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">Panel de administración</h1>
        <p className="text-muted mb-0">Gestioná las actividades y categorías del centro.</p>
      </div>

      {/* <!-- Resumen --> */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card stat-card p-3">
            <div className="small text-muted">Actividades</div>
            <div className="stat-value">14</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card stat-card p-3">
            <div className="small text-muted">Categorías</div>
            <div className="stat-value">6</div>
          </div>
        </div>
      </div>

      {/* <!-- Pestañas --> */}
      <ul className="nav nav-underline admin-tabs mb-4" role="tablist">
        <li className="nav-item">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#tabActividades" type="button">
            <i className="bi bi-grid"></i> Actividades
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tabCategorias" type="button">
            <i className="bi bi-tags"></i> Categorías
          </button>
        </li>
      </ul>

      <div className="tab-content">

        {/* <!-- ===== TAB ACTIVIDADES ===== --> */}
        {/* <!-- GET /v1/actividades · POST /v1/actividades · PUT /v1/actividades/:id · DELETE /v1/actividades/:id --> */}
        <div className="tab-pane fade show active" id="tabActividades">
          <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
            <select className="form-select form-select-sm" style={{ maxWidth: "220px" }}>
              <option>Todas las categorías</option>
              <option>Musculación</option>
              <option>Funcional</option>
              <option>Yoga</option>
              <option>Spinning</option>
              <option>Natación</option>
              <option>Boxeo</option>
            </select>
            <button className="btn btn-brand btn-sm" data-bs-toggle="modal" data-bs-target="#modalActividad">
              <i className="bi bi-plus-lg"></i> Nueva actividad
            </button>
          </div>

          <div className="card">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Nombre</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Horario</th>
                    <th className="text-end pe-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-4"><strong>Spinning Intenso</strong></td>
                    <td><span className="badge text-bg-light">Spinning</span></td>
                    <td>20/10/2026</td>
                    <td>18:30</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalActividad"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Yoga Matutino</strong></td>
                    <td><span className="badge text-bg-light">Yoga</span></td>
                    <td>21/10/2026</td>
                    <td>08:00</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalActividad"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Funcional HIIT</strong></td>
                    <td><span className="badge text-bg-light">Funcional</span></td>
                    <td>22/10/2026</td>
                    <td>19:00</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalActividad"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Fuerza Total</strong></td>
                    <td><span className="badge text-bg-light">Musculación</span></td>
                    <td>23/10/2026</td>
                    <td>17:00</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalActividad"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Natación Libre</strong></td>
                    <td><span className="badge text-bg-light">Natación</span></td>
                    <td>24/10/2026</td>
                    <td>10:00</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalActividad"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <nav className="mt-4">
            <ul className="pagination pagination-sm justify-content-center">
              <li className="page-item disabled"><a className="page-link" href="#">Anterior</a></li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Siguiente</a></li>
            </ul>
          </nav>
        </div>

        {/* <!-- ===== TAB CATEGORÍAS ===== --> */}
        {/* GET /v1/categorias · POST /v1/categorias · PUT /v1/categorias/:id · DELETE /v1/categorias/:id */}
        <div className="tab-pane fade" id="tabCategorias">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-brand btn-sm" data-bs-toggle="modal" data-bs-target="#modalCategoria">
              <i className="bi bi-plus-lg"></i> Nueva categoría
            </button>
          </div>

          <div className="card">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Nombre</th>
                    <th>Creada</th>
                    <th className="text-end pe-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-4"><strong>Musculación</strong></td>
                    <td className="text-muted small">01/09/2026</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalCategoria"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Funcional</strong></td>
                    <td className="text-muted small">01/09/2026</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalCategoria"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Yoga</strong></td>
                    <td className="text-muted small">03/09/2026</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalCategoria"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Spinning</strong></td>
                    <td className="text-muted small">05/09/2026</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalCategoria"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Natación</strong></td>
                    <td className="text-muted small">10/09/2026</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalCategoria"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4"><strong>Boxeo</strong></td>
                    <td className="text-muted small">12/09/2026</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalCategoria"><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>

  {/* <!-- MODAL ACTIVIDAD (crear / editar)
       Crear  -> POST /v1/actividades { name, categoryId, date, schedule }  (la descripción la genera Gemini)
       Editar -> PUT  /v1/actividades/:id { name, categoryId, description, date, schedule } --> */}
  <div className="modal fade" id="modalActividad" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold">Nueva actividad</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="actName" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="actName" placeholder="Ej: Spinning Intenso" minLength="3" maxLength="50" required />
            </div>
            <div className="mb-3">
              <label htmlFor="actCategory" className="form-label">Categoría</label>
              <select className="form-select" id="actCategory" defaultValue="" required>
                <option value="" disabled>Seleccioná una categoría</option>
                <option>Musculación</option>
                <option>Funcional</option>
                <option>Yoga</option>
                <option>Spinning</option>
                <option>Natación</option>
                <option>Boxeo</option>
              </select>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label htmlFor="actDate" className="form-label">Fecha</label>
                <input type="date" className="form-control" id="actDate" required />
              </div>
              <div className="col-6">
                <label htmlFor="actSchedule" className="form-label">Horario</label>
                <input type="time" className="form-control" id="actSchedule" required />
              </div>
            </div>
            <div className="mb-1">
              <label htmlFor="actDescription" className="form-label">Descripción <span className="text-muted small">(solo al editar)</span></label>
              <textarea className="form-control" id="actDescription" rows="3" maxLength="255" placeholder="Se completa automáticamente al crear"></textarea>
            </div>
            <div className="form-text"><i className="bi bi-stars text-brand"></i> Al crear la actividad, la descripción se genera automáticamente con IA.</div>
          </form>
          {/* <!-- Estado de error: 409 "Ya existe una actividad con ese nombre." --> */}
          <div className="alert alert-danger small mt-3 mb-0">
            <i className="bi bi-exclamation-circle"></i> Ya existe una actividad con ese nombre.
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-brand" data-bs-dismiss="modal">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  {/* <!-- MODAL CATEGORÍA (crear / editar) -> POST /v1/categorias · PUT /v1/categorias/:id  { name } --> */}
  <div className="modal fade" id="modalCategoria" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered modal-sm">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold">Nueva categoría</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div className="modal-body">
          <label htmlFor="catName" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="catName" placeholder="Ej: Pilates" maxLength="50" required />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-brand" data-bs-dismiss="modal">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  {/* <!-- MODAL ELIMINAR (actividad o categoría) --> */}
  <div className="modal fade" id="modalEliminar" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold">Eliminar</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div className="modal-body">
          <p>¿Seguro que querés eliminar <strong>Spinning Intenso</strong>? Esta acción no se puede deshacer.</p>
          <div className="alert alert-warning small mb-0">
            <i className="bi bi-info-circle"></i> No se puede eliminar una actividad con inscripciones, ni una categoría con actividades asociadas.
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
   </>
  )
}

export default Admin;
