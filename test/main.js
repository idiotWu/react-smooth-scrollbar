import React from 'react';
import ReactDOM from 'react-dom';
import Scrollbar from '../src/react-smooth-scrollbar.js';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

SmoothScrollbar.use(OverscrollPlugin);

class App extends React.Component {
    state = {
        damping: 0.1,
    };

    randomDamping() {
        const nextDamping = Math.random() * 0.5 + 0.1;
        console.log('set damping:', nextDamping);

        this.setState({
            damping: nextDamping,
        });

        setTimeout(this.randomDamping.bind(this), 3000);
    }

    componentDidMount() {
        this.scrollbar = this.$container.scrollbar;

        this.randomDamping();
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
            </Scrollbar>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
