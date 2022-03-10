import { LitElement, html, css } from "lit";
import "@meveo-org/mv-container";

export default class HomePage extends LitElement {
  static get properties() {
    return {
      value: { type: String, attribute: true },
      parameters: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }
    `;
  }

  render() {
    return html`
      <h1>Home Page</h1>
      <mv-container>
        <p>
          This is the Home page.
        </p>
      </mv-container>
    `;
  }
}

customElements.define("home-page", HomePage);
