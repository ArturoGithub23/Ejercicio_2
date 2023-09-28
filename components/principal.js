import { LitElement, css, html } from "lit";
import "./login";
import "./obtenerDatos";
import "./tabla";

export class PrincipalComponent extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      datos: { type: Object },
      login: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.login = true;
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
            <h2>Calidad del Aire</h2>
            <tabla-component .datos="${this.datos}"></tabla-component>
          `
        : html`<login-component @login=${this._validar}></login-component>`}
    `;
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
