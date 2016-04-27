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
              <td>26 August</td>
              <td style={weatherIcon}><i className="wi wi-owm-701"></i></td>
              <td>12&deg;/29&deg;</td>
            </tr>
        );
    }

});

module.exports = ForecastDay;
