import {
    LitElement, html, customElement, property, css
  } from 'lit-element';

  //import { styleMap } from 'lit-html/directives/style-map';

  /**
   * Slots:
   *  button: a button element
   *  dropdown: an element with dropdown content
   */
  export class MorphDropdownItem extends LitElement {

    static get styles() {
        return css`

          :host {
            position: relative;
            display:flex;
            /*justify-content: center;*/
            
          }
          

          .dropdown {
            opacity: 0;
            position: absolute;
            overflow: hidden;
            padding:20px;
            /*top:-20px;*/
            border-radius:2px;
            transition: opacity 0.5s;
            /*transform: translateY(100px);*/
            will-change: opacity;
            display: none; 
            z-index: 100;
            /*margin-left: -20px;
            margin-right: -20px;*/
          }

          .trigger-enter  {
            display: block;
          }
          
          .trigger-enter-active  {
            opacity: 1;
          }
          
        `;
      }

    constructor() {
      super();
        this.active = false;
    }

   
  
    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
          active:{
            type: Boolean
          },
          centered: {
            type: Boolean
          }
        };
      }

      updated(changedProperties) {
        /*Check height of button*/
        
        changedProperties.forEach((oldValue, propName) => {
          switch(propName) {
            case "active":
              

              let dropdown = this.shadowRoot.querySelector("#dropdown")

              if(this.active) {
                /**set offset for dropdown */
                let dims = this.getBoundingClientRect()
                //console.log(dims)
                dropdown.style.transform = `translateY(${dims.height}px)`

                dropdown.classList.add('trigger-enter');
                setTimeout(() => dropdown.classList.contains('trigger-enter') && dropdown.classList.add('trigger-enter-active'), 150);
                
              } else {
                dropdown.classList.remove('trigger-enter', 'trigger-enter-active');
              }
              break;
          }
        });
      }


  
    /**
     * Implement `render` to define a template for your element.
     */
    render(){
      let justifyContent = ""
      if(this.centered == true) {
        justifyContent = "justify-content: center;"
      }
      return html`
        <style>
          :host {
            ${justifyContent}
          }
        </style>

        <slot id="button" name="button"></slot>

        <div id="dropdown" class="dropdown"> 
            <slot name="dropdown"></slot>
        </div>
        
      `;
    }
  }

  customElements.define('morph-dropdown-item', MorphDropdownItem);

