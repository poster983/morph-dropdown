# morph-dropdown
LitElement container that morphs between different dropdown items  

Inspired by [this](https://codepen.io/ianwessen/pen/mmZEgV)

This package could use some refactoring, so pull requests are welcome.
## Usage 
---
```js
import "morph-dropdown/morph-dropdown.js";
import "morph-dropdown/morph-dropdown-item.js";
```

While not required, This package works great with `<mwc-button>` and `<mwc-list>`
```html

<morph-dropdown>

    <mwc-button>Non Dropdown Button</mwc-button>
    <morph-dropdown-item>
        <mwc-button slot="button">Non Dropdown Button</mwc-button>

        <mwc-list slot="dropdown">
            <mwc-list-item>First Dropdown</mwc-list-item>
            <mwc-list-item>Second Dropdown</mwc-list-item>
            <mwc-list-item>Third Dropdown</mwc-list-item>
        </mwc-list>
    </morph-dropdown-item>

</morph-dropdown>

```  
### Notes:
- This package does not support nested dropdowns.



## API
--- 
### Slots
#### `<morph-dropdown>`  
|Name|Description|
|-|-|
|*default*|Any elements can go here, but all `<morph-dropdown-item>` elements will share a morph material when nested in the same `<morph-dropdown>`|

#### `<morph-dropdown-item>`
|Name|Description|
|-|-|
|`button`|When this element is hovered over, the `dropdown` slot will come into view|
|`dropdown`|The list of items to morph the background material to and fade in.|
|*default*|Not supported|

### Properties/Attributes

#### `<morph-dropdown>`  
|Name|Type|Default|Description|
|-|-|-|-|
|`column`|`boolean`|`false`|Changes the css `flex-direction` of the item container from a row to a column|

#### `<morph-dropdown-item>`
|Name|Type|Default|Description|
|-|-|-|-|
|`centered`|`boolean`|`false`|Will `justify-content: center;` the `:host{}` |
|`active`|`boolean`|`false`|Fades in the content.  Used internally|

### CSS Custom Properties
#### `<morph-dropdown>`  
|Name|Default|Description|
|-|-|-|
|`--morph-dropdown-background`|`#fff`|Changes the background of the morph material.|