import { LitElement, html, css } from "lit-element";
import { query } from "router-slot";

export class MvRouter extends LitElement {
  static get properties() {
    return {
      route: { type: Boolean, attribute: true },
      default: { type: Boolean, attribute: true },
      path: { type: String, attribute: true },
      component: { type: String, attribute: true }
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

  get routeParameters() {
    if (this.route) {
      const parentRouterSlot = queryParentRouterSlot(this) || {};
      const match = parentRouterSlot.match || {};
      return match.params || {};
    }
  }

  constructor() {
    super();
    this.route = false;
    this.default = false;
    this.component = null;
  }

  render() {
    if (!this.route) {
      return html`
        <router-slot></router-slot>
      `;
    }
  }

  firstUpdated(properties) {
    if (!this.route) {
      const router = this.shadowRoot.querySelector("router-slot");
      const routeElements = this.querySelectorAll("mv-router[route]");
      const routes = [];
      const defaultRoute = { path: "**", preserveQuery: true };
      routeElements.forEach(route => {
        routes.push({
          path: route.path,
          preserveQuery: true,
          component: () => import(route.component),
          setup: (component, routeData) => {
            const match = routeData.match || {};
            const parameters = {
              pathParameters: match.params || {},
              queryParameters: query()
            };
            component.parameters = parameters;
            if (route.hasAttributes()) {
              const attributes = route.attributes || [];
              for (let index = attributes.length - 1; index >= 0; index--) {
                const { name, value } = attributes[index];
                if (!["route", "path", "default", "component"].includes(name)) {
                  component.attributes[name] = value;
                }
              }
            }
          }
        });
        if (route.default) {
          defaultRoute.redirectTo = route.path;
        }
      });
      // add the default route as the last route
      if (!!defaultRoute.redirectTo) {
        routes.push(defaultRoute);
      }
      router.add(routes);
    }

    super.firstUpdated(properties);
  }
}

customElements.define("mv-router", MvRouter);
