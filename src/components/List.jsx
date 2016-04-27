var React = require('react');
var ListItem = require('./ListItem.jsx');

var ingredients = [{"id":1,"text":"cheese"},{"id":2,"text":"tortilla"},{"id":3,"text":"spicy carrots"}];

var List = React.createClass({
    render: function(item) {
        var listItems = ingredients.map(function(item) {
          return <ListItem key={item.id} ingredient={item.text} />
        });
    return (<ul>{listItems}</ul>);
    }


});

module.exports = List;
