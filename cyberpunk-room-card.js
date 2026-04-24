class CyberpunkRoomCard extends HTMLElement {
  setConfig(config) { this.config = config; }
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `<ha-card><div id='root'></div></ha-card>`;
      this.content = this.querySelector('#root');
    }
    const e = this.config.entity;
    const state = hass.states[e] ? hass.states[e].state : 'unavailable';
    const name = this.config.name || 'ROOM';
    this.content.innerHTML = `
      <style>
        .wrap{padding:18px;border-radius:18px;background:#0c0616;color:#fff;
        border:1px solid rgba(255,0,234,.35);box-shadow:0 0 18px rgba(255,0,234,.25)}
        .title{color:#00f7ff;font-weight:700;font-size:20px}
        .state{font-size:32px;color:#ff47f3;margin-top:8px}
        button{margin-top:12px;width:100%;padding:10px;border:0;border-radius:10px;
        background:linear-gradient(90deg,#00f7ff,#ff00ea);font-weight:700}
      </style>
      <div class='wrap'>
        <div class='title'>${name}</div>
        <div class='state'>${state}</div>
        <button>OPEN</button>
      </div>`;
  }
  getCardSize() { return 2; }
}
customElements.define('cyberpunk-room-card', CyberpunkRoomCard);
window.customCards = window.customCards || [];
window.customCards.push({type:'cyberpunk-room-card',name:'Cyberpunk Room Card',description:'Neon room control card'});
