import React, { Component } from 'react';

class ComboBox extends Component {
    constructor() {
        super();
        this.dropdown = React.createRef();
        this.searchbox = React.createRef();
        this.state = {
            allOptions: [
                {
                    storeNumber: "1",
                    storeName: "Atlanta"
                },
                {
                    storeNumber: "206",
                    storeName: "Kennesaw"
                },
                {
                    storeNumber: "304",
                    storeName: "Duluth"
                },
                {
                    storeNumber: "9",
                    storeName: "Smyrna"
                },
                {
                    storeNumber: "602",
                    storeName: "Dallas"
                },
                {
                    storeNumber: "403",
                    storeName: "Acworth"
                },
                {
                    storeNumber: "893",
                    storeName: "Chicago"
                },
                {
                    storeNumber: "502",
                    storeName: "New York"
                }
            ],
            filteredOptions: [],
            searchInput: "",
            clicked: true
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.focusClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.focusClick, false);
    }

    focusClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleOutsideFocus();
    }

    handleOutsideFocus = () => {
        this.setState({ clicked: true })
    }

    _handleSearch = (event) => {
        let searchTerm = event.target.value;
        this.setState({
            searchInput: searchTerm,
            clicked: false
        });
        if (searchTerm === "") {
            this.setState({
                filteredOptions: []
            });
        } else {
            let retrieveOptions = this.state.allOptions
                .filter(option => `${option.storeNumber} - ${option.storeName}`.toUpperCase().includes(searchTerm.toUpperCase()));
            this.setState({
                filteredOptions: retrieveOptions
            });
        }
    }

    _handleClick = (event) => {
        let index = event.target.dataset.index;
        this.setState({
            searchInput: `${this.state.filteredOptions[index].storeNumber} - ${this.state.filteredOptions[index].storeName}`,
            clicked: true
        })
    }

    _focusDropdown = (event) => {
        if (this.dropdown.current && event.keyCode === 40) {
            if (this.dropdown.current.firstChild) {
                this.dropdown.current.firstChild.focus();
                event.preventDefault();
            }
        }
    }

    _handleSubmit = (event) => {
        if (event.keyCode === 40 && event.target.nextSibling) {
            event.target.nextSibling.focus();
        } else if (event.keyCode === 40 && !event.target.nextSibling) {
            this.dropdown.current.firstChild.focus();
            event.preventDefault();
        } else if (event.keyCode === 38 && !event.target.previousSibling) {
            this.searchbox.current.focus();
            event.preventDefault();
        } else if (event.keyCode === 38 && event.target.previousSibling) {
            event.target.previousSibling.focus();
        } else if (event.keyCode === 13) {
            event.preventDefault();
            let index = event.target.dataset.index;
            this.setState({
                searchInput: `${this.state.filteredOptions[index].storeNumber} - ${this.state.filteredOptions[index].storeName}`,
                clicked: true
            });
            this.searchbox.current.focus();
        }
    }

    render() {
        let searchDropdown =
            <div ref={this.dropdown} className="searchDropdown combobox">
                {this.state.filteredOptions.map((option, i) => {
                    return (
                        <div onMouseDown={this._handleClick}
                            onKeyDown={this._handleSubmit}
                            className="selection combobox"
                            onFocus={(event) => {
                                let index = event.target.dataset.index;
                                this.setState({
                                    searchInput: `${this.state.filteredOptions[index].storeNumber} - ${this.state.filteredOptions[index].storeName}`,
                                });
                            }}
                            data-index={i}
                            tabIndex={i}
                            key={i}>
                            {`${option.storeNumber} - ${option.storeName}`}
                        </div>
                    )
                })}
            </div>;

        return (
            <div className="row justify-content-center">
                <form>
                    <div className="form-group" ref={node => this.node = node}>
                        <input onChange={this._handleSearch}
                            ref={this.searchbox}
                            onKeyDown={this._focusDropdown}
                            className="form-control combobox"
                            type="text"
                            placeholder="Store #"
                            value={this.state.searchInput}
                        />
                        {this.state.clicked ? null : searchDropdown}
                    </div>
                </form>
            </div>
        );
    }
}

export default ComboBox;