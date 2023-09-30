import { LitElement, css, html } from "lit";
import "./login";
import "./obtenerDatos";
import "./tabla";
import "./logOut";

export class PrincipalComponent extends LitElement {
  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      h2 {
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      datos: { type: Object },
      login: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.login = false;
    this.datos = {};
    this.addEventListener("obtenerDatos", (e) => {
      this._formateoDatos(e.detail.data.results);
    });
  }

  render() {
    return html`
      <obtener-datos></obtener-datos>

      ${this.login
        ? html`
            <header>
              <h2>Calidad del Aire</h2>
              <log-out @logOut="${this._cerrarSesion}"></log-out>
            </header>
            <tabla-component .datos="${this.datos}"></tabla-component>
          `
        : html`<login-component @login=${this._validar}></login-component>`}
    `;
  }

  _cerrarSesion(e) {
    this.login = false;
  }

  _formateoDatos(datos) {
    let arrDatos = [];
    datos.forEach((dato) => {
      arrDatos.push({
        name: dato.stations[0].name,
        id: dato.stations[0].id,
        escala: dato.stations[0].indexes[0].scale,
        valorIndice: dato.stations[0].indexes[0].value,
        fecha: dato.stations[0].indexes[0].calculationTime,
        valorContaminante: dato.stations[0].measurements[0]?.value,
        unidad: dato.stations[0].measurements[0]?.unit,
        contaminante: dato.stations[0].measurements[0]?.pollutant,
      });
    });

    this.datos = arrDatos;
  }

  _validar(e) {
    this.login = e.detail.login;
  }
}

customElements.define("principal-component", PrincipalComponent);
