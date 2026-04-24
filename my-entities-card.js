class MyEntitiesCard extends HTMLElement {
  setConfig(config) {
    if (!config || !Array.isArray(config.entities)) {
      throw new Error("You need to define an entities array");
    }
    if (config.entities.length !== 10) {
      throw new Error("This card expects exactly 10 entities");
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getCardSize() {
    return 10;
  }

  render() {
    if (!this._hass || !this.config) return;

    this.innerHTML = `
      <ha-card>
        <div class="card-content">
          ${this.config.title ? `<h2 class="title">${this.config.title}</h2>` : ""}
          <style>
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
              gap: 12px;
            }
            .item {
              border: 1px solid var(--divider-color);
              border-radius: 12px;
              padding: 12px;
              background: var(--card-background-color);
            }
            .name { font-weight: 600; margin-bottom: 6px; }
            .state { font-size: 1.1rem; }
            .entity { font-size: 0.8rem; opacity: 0.7; margin-top: 4px; }
            .missing { opacity: 0.6; }
            .title { margin: 0 0 12px; }
          </style>
          <div class="grid">
            ${this.config.entities.map((entity) => {
              const stateObj = this._hass.states[entity];
              if (!stateObj) {
                return `
                  <div class="item missing">
                    <div class="name">${entity}</div>
                    <div class="state">Not found</div>
                  </div>
                `;
              }

              const friendly = stateObj.attributes.friendly_name || entity;
              return `
                <div class="item">
                  <div class="name">${friendly}</div>
                  <div class="state">${stateObj.state}</div>
                  <div class="entity">${entity}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </ha-card>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("my-entities-card", MyEntitiesCard);
