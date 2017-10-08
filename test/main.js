import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Scrollbar from '../src/react-smooth-scrollbar.js';

class Content extends React.Component {
    static contextTypes = {
        getScrollbar: PropTypes.func
    };

    componentDidMount() {
        this.context.getScrollbar((scrollbar) => {
            console.log(scrollbar);
        });
    }

    componentDidUpdate() {
        this.context.getScrollbar((scrollbar) => {
            scrollbar.update();
        });
    }

    render() {
        return (<img src="your_diary.jpg" />);
    }
}

ReactDOM.render(
    <Scrollbar>
        <Content></Content>
    </Scrollbar>,
    document.getElementById('app')
);
