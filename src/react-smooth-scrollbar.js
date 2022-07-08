import React from 'react';
import PropTypes from 'prop-types';
import SmoothScrollbar from 'smooth-scrollbar';

export const ScrollbarContext = React.createContext(null);

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
    }

    constructor(props) {
        super(props);

        this.callbacks = [];
    }


		getScrollbar(cb) {
				if (typeof cb !== 'function') return;

				if (this.scrollbar) setTimeout(() => cb(this.scrollbar));
				else this.callbacks.push(cb);
		}

    componentDidMount() {
        this.scrollbar = SmoothScrollbar.init(this.$container, this.props);

        this.callbacks.forEach((cb) => {
            requestAnimationFrame(() => cb(this.scrollbar));
        });

        this.scrollbar.addListener(this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        if (this.scrollbar) {
            this.scrollbar.destroy();
        }
    }

    componentWillReceiveProps(nextProps) {
        Object.keys(nextProps).forEach((key) => {
            if (!key in this.scrollbar.options) {
                return;
            }

            if (key === 'plugins') {
                Object.keys(nextProps.plugins).forEach((pluginName) => {
                    this.scrollbar.updatePluginOptions(pluginName, nextProps.plugins[pluginName]);
                });
            } else {
                this.scrollbar.options[key] = nextProps[key];
            }
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
            ...others
        } = this.props;

        return (
						<ScrollbarContext.Provider value={{ getScrollbar: this.getScrollbar }}>
								<section data-scrollbar ref={element => this.$container = element} {...others}>
										{children}
								</section>
						</ScrollbarContext.Provider>
        );
    }
}
