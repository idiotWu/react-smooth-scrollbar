import React from 'react';
import PropTypes from 'prop-types';
import SmoothScrollbar from 'smooth-scrollbar';

export default class Scrollbar extends React.Component {
    static propTypes = {
        damping: PropTypes.number,
        thumbMinSize: PropTypes.number,
        syncCallbacks: PropTypes.bool,
        renderByPixels: PropTypes.bool,
        alwaysShowTracks: PropTypes.bool,
        continuousScrolling: PropTypes.bool,
        wheelEventTarget: PropTypes.element,
        plugins: PropTypes.object,
        onScroll: PropTypes.func,
        children: PropTypes.node,
    };

    static childContextTypes = {
        getScrollbar: PropTypes.func,
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
        this.scrollbar = SmoothScrollbar.init(this.$container, this.props);

        this.callbacks.forEach((cb) => {
            requestAnimationFrame(() => cb(this.scrollbar));
        });

        this.scrollbar.addListener(this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        this.scrollbar.destroy();
    }

    componentWillReceiveProps(nextProps) {
        Object.keys(nextProps).forEach((key) => {
            this.scrollbar.options[key] = nextProps[key];
        });
    }

    componentDidUpdate() {
        this.scrollbar && this.scrollbar.update();
    }

    handleScroll(status) {
        if (this.props.onScroll) {
            this.props.onScroll(status, this.scrollbar);
        }
    }

    render() {
        const {
            damping,
            thumbMinSize,
            syncCallbacks,
            renderByPixels,
            alwaysShowTracks,
            continuousScrolling,
            wheelEventTarget,
            plugins,

            onScroll,
            children,
            ...others,
        } = this.props;

        return (
            <section data-scrollbar ref={element => this.$container = element} {...others}>
                {children.length > 1 ? <div>{children}</div> : children}
            </section>
        );
    }
}
