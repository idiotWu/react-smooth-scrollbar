import React from 'react';
import ReactDOM from 'react-dom';
import Scrollbar from '../src/react-smooth-scrollbar.js';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

SmoothScrollbar.use(OverscrollPlugin);

class App extends React.Component {
    state = {
        damping: 0.1,
        count: 3,
    };

    randomDamping() {
        const nextState = {
            damping: Math.random() * 0.5 + 0.1,
            count: Math.random() * 10 | 0,
        };

        console.log(nextState);

        this.setState(nextState);

        setTimeout(this.randomDamping.bind(this), 3000);
    }

    componentDidMount() {
        this.scrollbar = this.$container.scrollbar;

        this.randomDamping();
    }

    _randomItem() {
        const res = [];

        for (let i = 0; i < this.state.count; i++) {
            res.push(<div key={i}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>);
        }

        return res;
    }

    render() {
        return (
            <Scrollbar
                ref={c => this.$container = c}
                damping={this.state.damping}
                plugins={{
                    overscroll: { damping: this.state.damping }
                }}
            >
                <img src="your_diary.jpg" />
                {this._randomItem()}
            </Scrollbar>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
