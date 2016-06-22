import React from 'react';
import { PropTypes } from 'react';
import SmoothScrollbar from 'smooth-scrollbar';

export default class Scrollbar extends React.Component {
    static propTypes = {
        speed: PropTypes.number,
        damping: PropTypes.number,
        thumbMinSize: PropTypes.number,
        syncCallbacks: PropTypes.bool,
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
        overscrollEffectColor: PropTypes.string,
        onScroll: PropTypes.func,
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
            requestAnimationFrame(() => cb(this.scrollbar));
        });

        this.scrollbar.addListener(::this.handleScroll);
    }

    componentWillUnmount() {
        this.scrollbar.destroy();
    }

    componentWillReceiveProps(nextProps) {
        this.scrollbar.setOptions(nextProps);
    }

    handleScroll(status) {
        if (this.props.onScroll) {
            this.props.onScroll(status, this.scrollbar);
        }
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
