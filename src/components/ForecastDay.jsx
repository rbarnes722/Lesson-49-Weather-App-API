var React = require('react');

var ForecastDay = React.createClass({
    render: function() {
        var weatherIcon = {
            fontSize: 25
        }
        var tableCenter = {
            textAlign: "center",
        }
        return (
            <tr style={tableCenter}>
              <td>{this.props.day}</td>
              <td style={weatherIcon}><i className={"wi wi-owm-" + (this.props.id)}></i></td>
              <td>{this.props.temp}</td>
            </tr>
        );
    }

});

module.exports = ForecastDay;
