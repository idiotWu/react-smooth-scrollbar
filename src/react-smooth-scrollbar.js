import React, { PropTypes } from 'react';
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
          PropTypes.bool,
        ]),
        overscrollEffect: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
        ]),
        overscrollEffectColor: PropTypes.string,
        overscrollDamping: PropTypes.number,
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
        this.scrollbar = new SmoothScrollbar(this.refs.container, this.props);

        this.callbacks.forEach((cb) => {
            requestAnimationFrame(() => cb(this.scrollbar));
        });

        this.scrollbar.addListener(::this.handleScroll);
    }

    componentWillUnmount() {
        this.scrollbar.destroy(true);
    }

    componentWillReceiveProps(nextProps) {
        this.scrollbar.setOptions(nextProps);
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
            /*
            speed,
            damping,
            thumbMinSize,
            syncCallbacks,
            renderByPixels,
            alwaysShowTracks,
            continuousScrolling,
            overscrollEffect,
            overscrollEffectColor,
            overscrollDamping,
            onScroll,
            */

            children,
            ...others,
        } = this.props;

        return (
            <section data-scrollbar ref="container" {...others}>
                <article className="scroll-content">
                    {children}
                </article>
                <aside className="scrollbar-track scrollbar-track-x">
                    <div className="scrollbar-thumb scrollbar-thumb-x" />
                </aside>
                <aside className="scrollbar-track scrollbar-track-y">
                    <div className="scrollbar-thumb scrollbar-thumb-y" />
                </aside>
                <canvas className="overscroll-glow" />
            </section>
        );
    }
}
