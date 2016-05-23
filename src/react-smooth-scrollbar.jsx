import React from 'react';
import { PropTypes } from 'react';
import SmoothScrollbar from 'smooth-scrollbar';

export default class Scrollbar extends React.Component {
    static propTypes = {
        speed: PropTypes.number,
        friction: PropTypes.number,
        thumbMinSize: PropTypes.number,
        renderByPixels: PropTypes.bool,
        alwaysShowTracks: PropTypes.bool,
        continuousScrolling: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool
        ]),
        overscrollEffect: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool
        ]),
        overscrollEffectColor: PropTypes.string
    };

    static childContextTypes = {
        getScrollbar: PropTypes.func
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
        this.scrollbar = SmoothScrollbar.init(this.refs.container, this.props);

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
