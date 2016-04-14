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
                ignoreEvents={Array}
                continuousScrolling={Boolean}
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
| :--------: | :--: | :-----: | :----------: |
| speed | Number | 1 | Scrolling speed scale.|
| friction | Number | 10 | Scrolling friction, a percentage value within (1, 100). |
| thumbMinSize | Number | 20 | Minimal size for scrollbar thumb. |
| continuousScrolling | Boolean | false | Whether allow upper scrollable content to continue scrolling when current scrollbar reaches edge. |
| ignoreEvents | Array | [] | A list of events names that are ignored, regex rules are supported. Details [here](https://github.com/idiotWu/smooth-scrollbar/wiki/Options-Field). |

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

[Documents](https://github.com/idiotWu/smooth-scrollbar#apis)

## License

MIT.

