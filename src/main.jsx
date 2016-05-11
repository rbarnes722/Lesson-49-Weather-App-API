var React = require('react');
var ReactDOM = require('react-dom');
var Weather = require('./components/Weather.jsx')

ReactDOM.render(<Weather bgColor="#ec4444"/>, document.getElementById('main'));
ReactDOM.render(<Weather bgColor="#357db5"/>, document.getElementById('second'));
ReactDOM.render(<Weather/>, document.getElementById('third'));
