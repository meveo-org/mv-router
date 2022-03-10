import { LitElement, html, css } from "lit";
import "@meveo-org/mv-container";

export default class AboutPage extends LitElement {
  static get properties() {
    return {
      value: { type: String, attribute: true }
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
      <h1>About Page</h1>
      <mv-container>
        <p>
          This is the About page. Click <a href="/">here</a> to return to home
          page.
        </p>
      </mv-container>
    `;
  }
}

customElements.define("about-page", AboutPage);
