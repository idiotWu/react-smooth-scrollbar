# react-smooth-scrollbar

[smooth-scrollbar](https://github.com/idiotWu/smooth-scrollbar) for react projects.

## Requirements

React 0.14+

## Install

```
npm install react-smooth-scrollbar --save
```

## Demo

[http://idiotwu.github.io/react-smooth-scrollbar/](http://idiotwu.github.io/react-smooth-scrollbar/)

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Scrollbar from 'react-smooth-scrollbar';

class App extends React.Component {
    render() {
        return (
            <Scrollbar
                speed={Number}
                friciton={Number}
                thumbMinSize={Number}
                renderByPixels={Boolean}
                continuousScrolling={Boolean|String}
            >
                your contents here...
            </Scrollbar>
        );
    }
}

ReactDOM.render(<App />, document.body);
```

Don't forget to include the stylesheet in your page:

```html
<link rel="stylesheet" href="dist/smooth-scrollbar.css">
```

### Available Options

| parameter | type | default | description |
| :--------: | :--: | :-----: | :---------- |
| speed | Number | 1 | Scrolling speed scale.|
| damping | Number | 0.1 | Delta reduce damping, a float value between (0, 1), the lower the value is, the more smooth the scrolling will be. |
| onScroll | Function | | Pipe to `scrollbar#addListener`, invoked with two params: `(status, scrollbar) => {}`. |
| syncCallbacks | Boolean | false | Execute listeners in synchronous or asynchronous. |
| renderByPixels | Boolean | true | Render scrolling by integer pixels, set to `true` to improve performance. |
| alwaysShowTracks | Boolean | false | Keep scrollbar tracks visible whether it's scrolling or not. |
| continuousScrolling | Boolean\|String | 'auto' | Whether allow upper scrollable content to continue scrolling when current scrollbar reaches edge. **When set to 'auto', it will be enabled on nested scrollbars, and disabled on first-class scrollbars.** |
| overscrollEffect | Boolean\|String | false | Experimental overscroll effect, `'bounce'` for iOS style effect and `'glow'` for Android style effect. **Be careful when you enable this feature!** |
| overscrollEffectColor | String | '#87ceeb' | Canvas paint color with 'glow' effect. |
| overscrollDamping | Number | 0.2 | The same as `damping`, but for overscrolling. |

**Confusing with the option field? Try edit tool [here](http://idiotwu.github.io/smooth-scrollbar/)!**

## Get Scrollbar Instance

1. Use `ref` in **parent component**:

```javascript
class Parent extends React.Component {
    componentDidMount() {
        const { scrollbar } = this.refs.child;
    }

    render() {
        return (
            <Scrollbar ref="child">
                your content...
            </Scrollbar>
        );
    }
}
```

2. Directly get `scrollbar` instance in a **child component**:

```javascript
// A.js
import React from 'react';
import { getScrollbar } from 'react-smooth-scrollbar';
class A extends React.Component {
    componentDidMount() {
        this.props.getScrollbar((scrollbar) => {
            // ...
        });
    }
    render() {
        return <div> this is child component. </div>;
    }
}
export default getScrollbar()(A);

// B.js
import React from 'react';
import B from 'A.js';
export default class App extends React.Component {
    render(){
        return (
            <div><A /></div>
        );
    }
}

// root.js
import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import B from 'B.js';
class Root extends React.Component {
    render() {
        return (
            <Scrollbar>
                <B />
            </Scrollbar>
        );
    }
}
```

Or you can use decorators in a more simple way.

```javascript
// A.js
import React from 'react';
import { getScrollbar } from 'react-smooth-scrollbar';
@getScrollbar()
export default class A extends React.Component {
    componentDidMount() {
        this.props.getScrollbar((scrollbar) => {
            // ...
        });
    }
    render() {
        return <div> this is child component. </div>;
    }
}

// Also, if you want to modify the prop name:

// A.js
@getScrollbar(getScrollbar => ({customName: getScrollbar}))
export default class A extends React.Component {
    componentDidMount() {
        this.props.customName((scrollbar) => {
            // ...
        });
    }
    render() {
        return <div> this is child component. </div>;
    }
}
```


## APIs

[Documents](https://github.com/idiotWu/smooth-scrollbar#apis)

## License

MIT.

