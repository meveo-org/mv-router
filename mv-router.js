import { LitElement, html, css } from "lit";
import { query } from "router-slot";

export class MvRouter extends LitElement {
  static get properties() {
    return {
      route: { type: Boolean, attribute: true },
      default: { type: Boolean, attribute: true },
      path: { type: String, attribute: true },
      component: { type: String, attribute: true },
      componentClass: { type: Object },
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
  }

  render() {
    if (!this.route) {
      return html` <router-slot></router-slot> `;
    }
  }

  firstUpdated(properties) {
    if (!this.route) {
      const router = this.shadowRoot.querySelector("router-slot");
      const routeElements = this.querySelectorAll("mv-router[route]");
      const routes = [];
      const defaultRoute = { path: "**", preserveQuery: true };
      routeElements.forEach((route) => {
        routes.push({
          path: route.path,
          preserveQuery: true,
          component: async () => {
            if (route.componentClass) {
              return route.componentClass;
            } else {
              const { default: component } = await import(route.component);
              return component;
            }
          },
          setup: (component, routeData) => {
            const match = routeData.match || {};
            const parameters = {
              pathParameters: match.params || {},
              queryParameters: query(),
            };
            component.parameters = parameters;
            if (route.hasAttributes()) {
              const attributes = route.attributes || [];
              for (let index = attributes.length - 1; index >= 0; index--) {
                const { name, value } = attributes[index];
                if (!["route", "path", "default", "component"].includes(name)) {
                  component.setAttribute(name, value);
                }
              }
            }
            if (typeof route.component === "string") {
              Object.getOwnPropertyNames(route)
                .filter(
                  (name) =>
                    !["renderRoot"].includes(name) && !name.startsWith("_")
                )
                .forEach((name) => {
                  component[name] = route[name];
                });
            }
          },
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
