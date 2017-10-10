# react-smooth-scrollbar

[smooth-scrollbar](https://github.com/idiotWu/smooth-scrollbar) for react projects.

## Requirements

React 0.14+

## Install

```
npm install react-smooth-scrollbar smooth-scrollbar --save
```

## Demo

[http://idiotwu.github.io/react-smooth-scrollbar/](http://idiotwu.github.io/react-smooth-scrollbar/)

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Scrollbar from 'react-smooth-scrollbar';

class App extends React.Component {
    render() {
        return (
            <Scrollbar
                damping={number},
                thumbMinSize={number},
                syncCallbacks={boolean},
                renderByPixels={boolean},
                alwaysShowTracks={boolean},
                continuousScrolling={boolean},
                wheelEventTarget={element},
                plugins={object},
                onScroll={func},
            >
                your contents here...
            </Scrollbar>
        );
    }
}

ReactDOM.render(<App />, document.body);
```

### Available Options

| parameter | type | default | description |
| :--------: | :--: | :-----: | :---------- |
| damping | `number` | `0.1` | Momentum reduction damping factor, a float value between `(0, 1)`. The lower the value is, the more smooth the scrolling will be (also the more paint frames). |
| thumbMinSize | `number` | `20` | Minimal size for scrollbar thumbs. |
| renderByPixels | `boolean` | `true` | Render every frame in integer pixel values, set to `true` to improve scrolling performance. |
| alwaysShowTracks | `boolean` | `false` | Keep scrollbar tracks visible. |
| continuousScrolling | `boolean` | `true` | Set to `true` to allow outer scrollbars continue scrolling when current scrollbar reaches edge. |
| wheelEventTarget | `EventTarget` | `null` | Element to be used as a listener for mouse wheel scroll events. By default, the container element is used. This option will be useful for dealing with fixed elements.  |
| plugins | `object` | `{}` | Options for plugins, see [Plugin System](https://github.com/idiotWu/smooth-scrollbar/blob/master/docs/plugin.md). |


**Confusing with the option field? Try edit tool [here](http://idiotwu.github.io/smooth-scrollbar/)!**

## Using Scrollbar Plugins

```js
import { Component } from 'react';
import PropTypes from 'prop-types';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overflow';
import Scrollbar from 'react-smooth-scrollbar';

SmoothScrollbar.use(OverscrollPlugin);

class App2 extends Component {
    render() {
        return (
            <Scrollbar> ... </Scrollbar>
        );
    }
}
```

## Get Scrollbar Instance

1. Use `ref` in **parent component**:

    ```javascript
    class Parent extends React.Component {
        componentDidMount() {
            const { scrollbar } = this.$container;
        }

        render() {
            return (
                <Scrollbar ref={c => this.$container = c}>
                    your content...
                </Scrollbar>
            );
        }
    }
    ```

2. Use `Context` in **child component**:

    ```javascript
    class Child extends React.Component {
        static contextTypes = {
            getScrollbar: React.PropTypes.func
        };

        componentDidMount() {
            this.context.getScrollbar((scrollbar) => {
                // ...
            });
        }

        render() {
            return <div> this is child component. </div>;
        }
    }

    class App extends React.Component {
        render(){
            return (
                <Scrollbar>
                    <Child />
                </Scrollbar>
            );
        }
    }
    ```


## APIs

[Documents](https://github.com/idiotWu/smooth-scrollbar/docs)

## License

MIT.

[![Sponsor](https://app.codesponsor.io/embed/haJ2RqCqwBLZtPKnMNBYgn4M/idiotWu/react-smooth-scrollbar.svg)](https://app.codesponsor.io/link/haJ2RqCqwBLZtPKnMNBYgn4M/idiotWu/react-smooth-scrollbar)
