import { html, LitElement } from 'lit-element';
import style from './client-table-filter-component-styles.js';


import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-select/vaadin-select';




class ClientTableFilterComponent extends LitElement {
  static get properties() {
    return {
      clients: { type: Array },
      rss: { type: Array },
      statusIconAble : String,
      statusIconDisable : String,
      rssIcon: String,
      subcountsIcon: String,
      hoursIcon: String,
      actionsIcon: String
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.clients = [];
    this.statusIconAble = '';
    this.statusIconDisable = '';
    this.subcountsIcon = '';
    this.rssIcon = '';
    this.hoursIcon = '';
    this.actionsIcon = '';

  }
  firstUpdated(_changedProperties) {

    this.clients = this.clients.map(element => {
      return {...element, 
              statusIcon: element.status ? this.statusIconAble: this.statusIconDisable,
              subcountsIcon: this.subcountsIcon,
              rssIcon: this.rssIcon,
              hoursIcon: this.hoursIcon,
              actionsIcon: this.actionsIcon
            }
    });
    this.shadowRoot.querySelector('vaadin-grid').items = [
        ...this.clients
    ];
    const columns = this.shadowRoot.querySelectorAll('vaadin-grid-column');
    
    
    columns[3].renderer = function(root, column, rowData) {
        root.innerHTML = `<img src="${ rowData.item.subcountsIcon }" alt="Icono-Subcuentas">`;
    };
    
    columns[4].renderer = function(root, column, rowData) {
        root.innerHTML = `<img src="${ rowData.item.rssIcon }" alt="Icono-RSS">`;
    };
    
    columns[5].renderer = function(root, column, rowData) {
        root.innerHTML = `<img src="${ rowData.item.hoursIcon }" alt="Icono-Hours">`;
    };
    
    columns[6].renderer = function(root, column, rowData) {
        root.innerHTML = `<img src="${ rowData.item.actionsIcon }" alt="Icono-RSS">`;
    };
    
   let prev = this.statusIcon;
    columns[2].renderer = function(root, column, rowData) {
        root.innerHTML = rowData.item.status ? `<img src="${ rowData.item.statusIcon }" alt="Icono">` : `<img src="${ rowData.item.statusIcon }" alt="INACTIVO">`;
    };
    this.createFilters();
}
    bindIcons(status){
      return status;
      /* this.subcountsIcon = subcounts;
      this.rssIcon = rss;
      this.hoursIcon = hours;
      this.actionsIcon = actions; */

    }

  render() {
    return html`
    <div class="container">
        <div class="filters">
            ${this.insertFilters()}
        </div>
        <div class="table-clients">
            <vaadin-grid class="grid" theme="compact" >
                <vaadin-grid-column id="id" path="id" header="id" flex-grow="0" text-align="center">
                    <vaadin-grid-filter path="id"></vaadin-grid-filter>
                </vaadin-grid-column>
                <vaadin-grid-column id="nameClient" path="nameClient" header="Nombre" text-align="center" flex-grow="1">
                      <vaadin-grid-filter path="nameClient"></vaadin-grid-filter>
                </vaadin-grid-column>
                <vaadin-grid-column id="status" path="status" header="Estatus" text-align="center" flex-grow="0">   
                    <vaadin-grid-filter path="status"></vaadin-grid-filter>
                </vaadin-grid-column>
                <vaadin-grid-column id="subcounts" path="subcounts" header="Subcuentas" text-align="center" flex-grow="0">
                    <vaadin-grid-filter path="subcounts"></vaadin-grid-filter>
                </vaadin-grid-column>
                <vaadin-grid-column id="rss" path="rss" header="Razón Social" text-align="center"  flex-grow="0">
                    <vaadin-grid-filter path="rss"></vaadin-grid-filter>
                </vaadin-grid-column>
                <vaadin-grid-column id="hours" path="hours" header="Horas" text-align="center" flex-grow="0">
                    <vaadin-grid-filter path="hours"></vaadin-grid-filter>
                </vaadin-grid-column>
                <vaadin-grid-column id="actions" path="actions" header="Acciones" text-align="center" flex-grow="0">
                    <vaadin-grid-filter path="actions"></vaadin-grid-filter>
                </vaadin-grid-column>
            </vaadin-grid>
        </div>
     </div>
    `;
  }

  insertFilters() {
    return html`
            <vaadin-text-field  id="nameFilter" slot="filter" focus-target label="Nombre"></vaadin-text-field>
            <vaadin-select id="statusFilter" slot="filter" label="Estatus" value="">
                <template>
                    <vaadin-list-box >
                        <vaadin-item > </vaadin-item>
                        <vaadin-item value="true">Activo</vaadin-item>
                        <vaadin-item value="false">Inactivo</vaadin-item>
                    </vaadin-list-box>
                </template>
            </vaadin-select>
        `;
  }

  createFilters() {
    
    const nameColumn = this.shadowRoot.querySelector('#nameClient');
    const statusColumn = this.shadowRoot.querySelector('#status');
    // const actionsColumn = this.shadowRoot.querySelector('#actions');
    const filters = this.shadowRoot.querySelector(".filters");
      
        filters.querySelector('#nameFilter').addEventListener('value-changed', function(e) {
            nameColumn.querySelector('vaadin-grid-filter').value = e.detail.value;
        });
        filters.querySelector('#statusFilter').addEventListener('value-changed', function(e) {
            statusColumn.querySelector('vaadin-grid-filter').value = e.detail.value;
        });
        
  } 
  
}

window.customElements.define("client-table-filter-component", ClientTableFilterComponent);
