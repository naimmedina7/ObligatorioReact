import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span className="badge bg-brand-soft text-brand mb-3">
                  Centro deportivo
                </span>
                <h1 className="display-4 mb-3">
                  Entrená a tu ritmo.
                  <br />
                  Reservá tu lugar en segundos.
                </h1>
                <p className="lead mb-4">
                  Elegí entre todas nuestras actividades, inscribite online y
                  gestioná tus clases desde un solo lugar.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/registro" className="btn btn-brand btn-lg">
                    Crear cuenta gratis
                  </Link>
                  <Link to="/login" className="btn btn-outline-light btn-lg">
                    Ya tengo cuenta
                  </Link>
                </div>
              </div>

              <div className="col-lg-5 d-none d-lg-block">
                <div className="card text-dark p-4">
                  <p className="small text-muted mb-2">Próximas actividades</p>

                  <div className="d-flex align-items-center gap-3 py-2 border-bottom">
                    <div className="feature-icon">
                      <i className="bi bi-bicycle"></i>
                    </div>
                    <div className="flex-grow-1">
                      <strong>Spinning Intenso</strong>
                      <div className="small text-muted">Lun 20/10 · 18:30</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-2 border-bottom">
                    <div className="feature-icon">
                      <i className="bi bi-flower1"></i>
                    </div>
                    <div className="flex-grow-1">
                      <strong>Yoga Matutino</strong>
                      <div className="small text-muted">Mar 21/10 · 08:00</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 py-2">
                    <div className="feature-icon">
                      <i className="bi bi-fire"></i>
                    </div>
                    <div className="flex-grow-1">
                      <strong>Funcional HIIT</strong>
                      <div className="small text-muted">Mié 22/10 · 19:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="container">
            <h2 className="fw-bold text-center mb-5">¿Cómo funciona?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-person-plus"></i>
                  </div>
                  <h5 className="fw-bold">1. Registrate</h5>
                  <p className="text-muted mb-0">
                    Creá tu cuenta con tu nombre, usuario, teléfono y una foto
                    de perfil.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-grid"></i>
                  </div>
                  <h5 className="fw-bold">2. Elegí tu actividad</h5>
                  <p className="text-muted mb-0">
                    Explorá las actividades por categoría: musculación, yoga,
                    spinning, natación y más.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <h5 className="fw-bold">3. Inscribite</h5>
                  <p className="text-muted mb-0">
                    Reservá tu lugar y gestioná o cancelá tus inscripciones
                    cuando quieras.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;