import React from "react";
import './Drawer.css';
import Backdrop from "../../UI/BackDrop/Backdrop";

const links = [1, 2, 3];

class Drawer extends React.Component {

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a href={'t'}>link {link}</a>

                </li>
            )
        })
    }

    render() {

        const cls = ["drawer"]

        if (!this.props.isOpen) {
            cls.push("close")
        }

        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
            </React.Fragment>
        )
    }
}

export default Drawer