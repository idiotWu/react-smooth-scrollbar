import React from 'react';
import SmoothScrollbar from 'smooth-scrollbar';

export default class Scrollbar extends React.Component {
    static propTypes = {
        speed: React.PropTypes.number,
        friction: React.PropTypes.number,
        thumbMinWidth: React.PropTypes.number,
        thumbMinHeight: React.PropTypes.number,
        ignoreEvents: React.PropTypes.array
    };

    static childContextTypes = {
        getScrollbar: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this.callbacks = [];
    }

    getChildContext() {
        return {
            getScrollbar: (cb) => {
                if (typeof cb !== 'function') return;

                if (this.scrollbar) setTimeout(() => cb(this.scrollbar));
                else this.callbacks.push(cb);
            }
        };
    }

    componentDidMount() {
        const {
            speed = 1,
            friction = 10,
            ignoreEvents = [],
            thumbMinWidth = 20,
            thumbMinHeight = 20
        } = this.props;

        this.scrollbar = SmoothScrollbar.init(this.refs.container, {
            speed, friction, ignoreEvents, thumbMinWidth, thumbMinHeight
        });

        this.callbacks.forEach((cb) => {
            setTimeout(() => cb(this.scrollbar));
        });
    }

    componentWillUnmount() {
        this.scrollbar.destroy();
    }

    render() {
        const { children, ...others } = this.props;

        return (
            <section data-scrollbar ref="container" {...others}>
                {children}
            </section>
        );
    }
}
