import { LitElement, css, html } from "lit";

export class BuscarComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 0 20px;
      }
      button {
        margin: 0 4px;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <section class="buscador">
        <label>Filter:</label>
        <input type="text" id="entrada" />
        <button @click="${this._buscar}">Buscar</button>
        <button @click="${this._limpiar}">Limpiar</button>
      </section>
    `;
  }

  _buscar() {
    const entrada = this.shadowRoot.querySelector("#entrada").value;
    if (!entrada) {
      alert("Campo de búsqueda vacío");
    } else {
      this.dispatchEvent(
        new CustomEvent("entrada", {
          detail: { entrada },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _limpiar() {
    const entrada = this.shadowRoot.querySelector("#entrada");
    entrada.value = "";
    let mensaje = "Reseteando tabla";
    this.dispatchEvent(
      new CustomEvent("reset", {
        detail: { mensaje },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("buscar-component", BuscarComponent);
