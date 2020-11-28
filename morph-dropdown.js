import {
    LitElement, html, customElement, property, css
  } from 'lit-element';
  import { classMap } from 'lit-html/directives/class-map';


  /**
   * Slots:
   * DEFAULT: morph-dropdown-items
   * 
   * Style Vars:
   * --morph-dropdown-background: background of morph element
   */
  export class MorphDropdown extends LitElement {

    static get styles() {
        return css`

          :host {
            position: relative;
            /*display: inline-block;*/
          }

          .bg-material {
            width:0px;
            height:0px;
            position: absolute;
            background: var(--morph-dropdown-background, #fff);
            border-radius: 4px;
            box-shadow: 0 50px 100px rgba(50,50,93,.1), 0 15px 35px rgba(50,50,93,.15), 0 5px 15px rgba(0,0,0,.1);
            transition:all 0.3s, opacity 0.1s, transform 0.2s;
            transform-origin: 50% 0;
            display: flex;
            justify-content: center;
            opacity:0;
            z-index: 99;
            visibility: hidden;
          }
          .bg-material.open {
              opacity: 1;
              visibility: visible;
          }

          .items {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
          }

          .column {
            flex-direction: column;
          }

          .noTransition {
            transition: none !important;
          }
          
          
        `;
      }

    constructor() {
      super();
      this._closeEvent = null;
      this._userInDropdown = false;
    }

    firstUpdated() {
      
      this.bgMaterial = this.shadowRoot.querySelector(".bg-material");
      //waits until user is completly gone from the dropdown
      this.bgMaterial.addEventListener('mouseenter', (e) => {

        this._userInDropdown = true;
        
        //console.log("entered material")
      });
      this.bgMaterial.addEventListener('mouseleave', (e) => {
        

        this._userInDropdown = false;
        if(this._closeEvent != null ) {
          this._mouseOverLeave(this._closeEvent)
        }
        
        
        //console.log("left material")
      });
    }

    updated() {
        //Why? Why! Why???!!! why must we do this fuckery??? I do not care at this point. i guess i could use a mutation observer..... TOO BAD!!
        let loopLimit = 0;
        var checkExist = setInterval(() => {
            let slot = this.shadowRoot.querySelector('slot').assignedNodes();
            if(slot.length > 0) {
                //filter out non dropdown items
                this.triggers = slot.filter((e) => {
                    return e.nodeName == "MORPH-DROPDOWN-ITEM";
                })
                //console.log(this.triggers)
                //setup listeners
                this.triggers.forEach((trigger) => {
                    trigger.removeEventListener('mouseenter', (e) => this._mouseOverEnter(e));
                    trigger.addEventListener('mouseenter', (e) => this._mouseOverEnter(e));

                    trigger.removeEventListener('mouseleave', (e) => this._mouseOverLeave(e));
                    trigger.addEventListener('mouseleave', (e) => this._mouseOverLeave(e));

                })
                
                clearInterval(checkExist);
                console.log("took " + 10*loopLimit + " ms to get setup")
            }
            if(loopLimit > 10) {
                clearInterval(checkExist);
                console.log("took " + 10*loopLimit + " ms to get setup")
            }
            loopLimit++;
         }, 10); 
         
        
        
    }
    

    //from https://codepen.io/ianwessen/pen/mmZEgV
    _mouseOverEnter(e) {
      let item = e.target;
      item.active = true;
      this.bgMaterial.classList.add('open');

      setTimeout(() => {
        const dropdown = item.shadowRoot.querySelector('.dropdown');
        //console.log(dropdown)
        
        const dropdownCoords = dropdown.getBoundingClientRect(); // Gets info about the size of the content
        const navCoords = this.getBoundingClientRect();
        //console.log("Dropdown:", dropdownCoords)
        //console.log("Nav Coords", navCoords)
        const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left  - navCoords.left
        };
        //console.log("Final Coords:", coords)
        //check for page overflow
        let pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        /*console.log(pageWidth)
        console.log(dropdownCoords.width + dropdownCoords.left)*/
        let offsetRight = (dropdownCoords.width + dropdownCoords.left) - pageWidth
        if(offsetRight > 0 ) {
          coords.left -=offsetRight;
        }

        dropdown.style.transform += `translateX(-${offsetRight}px)`

        //if(coords.width + coords.left >= )
        
        this.bgMaterial.style.setProperty('width', `${coords.width}px`);
        this.bgMaterial.style.setProperty('height', `${coords.height}px`);
        this.bgMaterial.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
      }, 10)

        
    }

    _mouseOverLeave(e) {
      if(this._userInDropdown == false) {

          let item = e.target;
          item.active = false;
          /*item.classList.remove('trigger-enter', 'trigger-enter-active');*/
          this.bgMaterial.classList.remove('open');
          



      } else {
        this._closeEvent = e;
      }
      
    }

    /**
     * Create an observed property. Triggers update on change.
     */
    static get properties() {
        return { 
            column: {type: Boolean}
        };
      }

    

  
    /**
     * Implement `render` to define a template for your element.
     */
    render(){
      return html`

        <div class="bg-material"></div>
        
        <!-- default slot.  for morph-dropdown-item --> 
        <ul class="${classMap({items:true, column:this.column})}">
            <slot></slot>
        </ul>
        
      `;
    }
  }

  customElements.define('morph-dropdown', MorphDropdown);

