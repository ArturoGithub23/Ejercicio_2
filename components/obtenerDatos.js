import { LitElement } from "lit";

export class ObtenerDatos extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      method: { type: String },
    };
  }

  constructor() {
    super();
    this.url = "https://api.datos.gob.mx/v1/calidadAire";
    this.method = "GET";
  }

  firstUpdated() {
    this.getData();
  }

  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent("obtenerDatos", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  getData() {
    fetch(this.url, { method: this.method })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        this._sendData(data);
      })
      .catch((error) => {
        console.warn("Algo falló", error);
      });
  }
}

customElements.define("obtener-datos", ObtenerDatos);
