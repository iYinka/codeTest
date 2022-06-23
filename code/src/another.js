
// API call

import React, { useEffect } from "react";
import classnames from "classnames";
// you should import `lodash` as a whole module
import lodash from "lodash";
import axios from "axios";

const ITEMS_API_URL = "https://example.com/api/items";
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

const getItems = () => async () => {
    try {
        fetch(`${ITEMS_API_URL}`, {
            headers: {
                "Content-Type": "application/json; charset=urf-8",
            },
        })
            .then((response) => response.json())
            .then((countries) => {
                this.setState({ country: countries });
            });
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
    getItems();
}, []);

export default function Autocomplete() {
    (state = {
        country: [],
    }),
        (renderItem = () => {
            this.state.country.map((x, i) => (
                <a class="list-item" key={i}>
                    {x.country}
                </a>
            ));
        });

    return (
        <div className="wrapper">
            <div className="control">
                <input type="text" className="input" />
            </div>
            <div className="list is-hoverable">{this.renderItem()}</div>
        </div>
    );
}


// TODO
import cx from 'classnames';
import { Component } from 'react';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [], text: '' };
    }

    addTodo(e) {
        e.preventDefault();
        this.setState({
        	todos: [ this.state.text, ...this.state.todos ],
        	text: ''
        });
    }

    updateValue(e) {
        this.setState({ text: e.target.value})
    }

    render() {
        return (
            <>
                <div>
                    <h2>
                        Todo List
                    </h2>
                    <div>
                <form onSubmit = {(e) => this.addTodo(e)}>
                    <input
                        placeholder="Add Todo"
                        value={this.state.text}
                        onChange={(e) => {this.updateValue(e)}}
                    />
                    <button type="submit">Add Todo</button>
                </form>
                <TodoList todos={this.state.todos}/>
            </div>
                </div>
                <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
            </>
        );
    }
}


// Counter
import React from 'react';
import cx from 'classnames';
import {Component} from 'react';

export default class Counter extends Component {
    state = {
    count: 42,
  }

increment = () =>{
   this.setState({
      count: this.state.count + 1,
    })
 }

    render() {
        return (
            <>
                <div>
                    <h2>{this.state.count}</h2>
                    <button classname="counter-button" onClick={this.increment}>Click</button>
                </div>
                <style>{`
                    .counter-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                `}</style>
            </>
        );
    }
}
