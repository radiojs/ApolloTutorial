import React from 'react';

class Page extends React.Component {
    render() {
        const { title, children } = this.props;
        return (
            <div className="Page">
                <header>{title}</header>
                <main>{children}</main>
                <footer>
                    <div className="copy-right">
                        &copy; 2019 Radio JS. All rights reserved.
                    </div>
                </footer>
            </div>
        )
    }
}

export default Page;
