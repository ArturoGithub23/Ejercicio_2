import { LitElement, css, html } from "lit";

export class LogOut extends LitElement {
  static get styles() {
    return css``;
  }
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <button @click="${this._cerrarSesion}">Cerrar Sesión</button>
    `;
  }

  _cerrarSesion() {
    let bool = false;
    this.dispatchEvent(
      new CustomEvent("logOut", {
        detail: { bool },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("log-out", LogOut);
