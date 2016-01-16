import React from 'react';

import InputWord from './InputWord.jsx';
import ButtonAdd from './ButtonAdd.jsx';
import TextArea from './TextArea.jsx';
//import GroupTranslation from './GroupTranslation.jsx';

export default React.createClass({
    getInitialState: function() {
        return {
            word: '',
            meanings: [],
            examples: [],
            further_details: []
        };
    },
    handleSubmit: function(event) {
        event.preventDefault();
    },
    submit: function(event) {
        const req = new XMLHttpRequest();
        req.open("POST", "/words", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onreadystatechange = () => {
            if (req.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            if (req.status !== 201) {
                console.log(req);
                return;
            }
            alert("Created");
        };
        req.send(JSON.stringify({
            expression: this.state.word,
            meanings: this.state.meanings,
            examples: this.state.examples,
            further_details: this.state.further_details
        }));
    },
    changeMeanings: function(meanings) {
        this.setState({meanings: meanings});
    },
    changeExamples: function(examples) {
        this.setState({examples: examples});
    },
    changeDetails: function(details) {
        this.setState({further_details: details});
    },
    changeWord: function(word) {
        this.setState({word: word});
    },
    componentDidMount: function() {
        // Nothing
    },
    render: function() {
        return (
            <form encType="application/json" className="addWordForm" onSubmit={this.handleSubmit} method="POST" action="/words">
                <h2>Add a word or expression</h2>
                <p>Make sure it is not in the database, already</p>

                <InputWord id="new_word" placeholder="New word or expression" onChange={this.changeWord} />

                <h3>Add meanings (required)</h3>
                <h4>One example per line</h4>
                <TextArea onChange={this.changeMeanings} />

                <h3>Add examples of use (optional)</h3>
                <h4>One example per line</h4>
                <TextArea onChange={this.changeExamples} />
                
                <h3>Add further details (URLs) (optional)</h3>
                <h4>One example per line</h4>
                <TextArea onChange={this.changeDetails} />

                <br />

                <ButtonAdd value="Add it!" onClick={this.submit} />
            </form>
            );
    }
});