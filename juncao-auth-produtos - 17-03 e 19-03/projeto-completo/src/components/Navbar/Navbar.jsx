import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          Home
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            {/* Menu Produto */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Produto
              </span>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/produto">
                    Listar
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/produto/cadastro">
                    Cadastrar
                  </Link>
                </li>
              </ul>
            </li>

            {/* Menu Usuário */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Usuário
              </span>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/usuario">
                    Listar
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/usuario/cadastro">
                    Cadastrar
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}