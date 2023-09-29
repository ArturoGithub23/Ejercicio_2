import { LitElement, css, html } from "lit";
import "./buscar";

export class TablaComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      .contenedor {
        overflow: scroll;
        max-height: 400px;
        margin: 20px;
      }
      table {
        border-collapse: collapse;
        border: 1px solid black;
      }
      thead tr {
        color: white;
        font-weight: bold;
        background-color: cornflowerblue;
      }
      thead tr:first-child {
        background-color: blue;
      }

      th,
      td {
        border: 1px solid black;
        padding: 8px 5px;
      }

      .hide {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      datos: { type: Object, attribute: "datos" },
      tabla: { type: Array },
    };
  }

  constructor() {
    super();
    this.tabla = [];
  }

  render() {
    return html`
      <buscar-component
        @entrada=${this._filtro}
        @reset=${this._reset}
      ></buscar-component>
      <section class="contenedor">${this._generadorTabla()}</section>
    `;
  }

  _filtro(e) {
    let entrada = e.detail.entrada;
    const filas = this.shadowRoot.querySelectorAll("tbody tr");
    filas.forEach((fila) => {
      !fila.textContent.match(entrada)
        ? (fila.className = "hide")
        : fila.classList.remove("hide");
    });
  }

  _reset(e) {
    const filas = this.shadowRoot.querySelectorAll("tbody tr");
    filas.forEach((fila) => fila.classList.remove("hide"));
  }

  _generadorTabla() {
    return html`
      <table>
        <thead>
          <tr>
            <th colspan="2">Localidad</th>
            <th colspan="3">Indices</th>
            <th colspan="3">Mediciones</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Escala</th>
            <th>Valor</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Unidad</th>
            <th>Contaminante</th>
          </tr>
        </thead>
        <tbody>
          ${this._datos()}
        </tbody>
      </table>
    `;
  }

  _datos() {
    if (Object.keys(this.datos).length > 0) {
      for (let elemento of this.datos) {
        this.tabla.push(html`
          <tr>
            <td>${elemento.name}</td>
            <td>${elemento.id}</td>
            <td>${elemento.escala}</td>
            <td>${elemento.valorIndice}</td>
            <td>${elemento.fecha}</td>
            <td>${elemento.valorContaminante}</td>
            <td>${elemento.unidad}</td>
            <td>${elemento.contaminante}</td>
          </tr>
        `);
      }
    }

    return this.tabla;
  }

  _tabla() {
    return html` <table></table> `;
  }
}

customElements.define("tabla-component", TablaComponent);
