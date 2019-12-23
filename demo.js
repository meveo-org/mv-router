import { LitElement, html, css } from "lit-element";
import "mv-main";
import "mv-menu-panel";
import "mv-header";
import "mv-footer";

import "./mv-router.js";

export class MvRouterDemo extends LitElement {
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
        --mv-header-height: 66px;
        --mv-footer-height: 40px;
        --mv-menu-panel-width: 300px;
        --mv-container-max-width: 100%;
        --mv-container-margin: 20px auto;
      }
    `;
  }

  render() {
    return html`
      <mv-main>
        <mv-header slot="header">
          <mv-header item>MvRouter Demo</mv-header>
        </mv-header>
        <mv-menu-panel menu showLabel slot="menu">
          <mv-menu-panel label>MvRouter</mv-menu-panel>
          <mv-menu-panel item><a href="/">Home</a></mv-menu-panel>
          <mv-menu-panel item>
            <a href="/profile">Profile</a>
          </mv-menu-panel>
          <mv-menu-panel item>
            <a href="/help?articleId=123">Help</a>
          </mv-menu-panel>
          <mv-menu-panel item><a href="/about">About</a></mv-menu-panel>
          <mv-menu-panel item><a href="/error">Error</a></mv-menu-panel>
        </mv-menu-panel>
        <mv-router>
          <mv-router
            default
            route
            path="home"
            import="./pages/home.js"
          ></mv-router>
          <mv-router route path="about" import="./pages/about.js"></mv-router>
          <mv-router
            route
            path="profile"
            import="./pages/profile.js"
          ></mv-router>
          <mv-router route path="help" import="./pages/help.js"></mv-router>
          <mv-router route path="error" import="./pages/error.js"></mv-router>
        </mv-router>
        <mv-footer slot="footer">
          <mv-footer item>MvRouter Demo</mv-footer>
        </mv-footer>
      </mv-main>
    `;
  }
}

customElements.define("mv-router-demo", MvRouterDemo);
