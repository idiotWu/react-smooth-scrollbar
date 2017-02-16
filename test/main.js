import React from 'react';
import ReactDOM from 'react-dom';
import Scrollbar, { getScrollbar } from '../src/react-smooth-scrollbar.js';

class Content extends React.Component {
    render() {
        return (
            <section>
                <img src="your_diary.jpg" />
                {this.props.children}
            </section>
        );
    }
}

@getScrollbar()
class InfiniteScroll extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            count: 5,
            loading: false
        };
    }

    componentDidMount() {
        this.props.getScrollbar((scrollbar) => {
            scrollbar.infiniteScroll(::this.loadData);
        });
    }

    componentDidUpdate() {
        this.props.getScrollbar((scrollbar) => {
            scrollbar.update();
        });
    }

    render() {
        const list = [];
        const { count, loading } = this.state;

        for (let i = 0; i < count; i++) {
            list.push(<li key={i}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, nihil ullam magnam, eos suscipit natus aliquam aspernatur ea tenetur sint atque itaque eligendi ab molestiae cum odio nobis, nulla enim.</li>);
        }

        return (
            <Content>
                <ol> {list} </ol>
                <footer style={{ opacity: loading ? 1 : 0 }}> loading data </footer>
            </Content>
        );
    }

    loadData() {
        this.setState(({ count }) => {
            return { count, loading: true };
        });

        setTimeout(() => {
            this.setState(({ count }) => {
                return { count: count + 5, loading: false };
            });
        }, 1000);
    }
}

ReactDOM.render(
    <Scrollbar>
        <InfiniteScroll></InfiniteScroll>
    </Scrollbar>,
    document.getElementById('app')
);
