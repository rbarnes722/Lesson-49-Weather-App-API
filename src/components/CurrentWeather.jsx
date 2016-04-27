var React = require('react');

var CurrentWeather = React.createClass({
    render: function() {
        var mainIcon = {
            fontSize: 58,
            margin: 20,
            //color: "white",
            //fontWeight: "bold",
            //textAlign: "center"
        }
        var windIcon = {
            fontSize: 30,
            marginRight: 10,
        }


        return(
            <div>
                <div className="row" style={mainIcon}>
                    <div className="col-xs-6"><i className="wi wi-owm-701"></i></div>
                    <div className="col-xs-6">29°</div>
                </div>
                <div className="row">
                    <div className="col-xs-6"><span style={windIcon}><i className="wi wi-wind wi-from-ssw"></i></span>NORTH WEST</div>
                    <div className="col-xs-6"><span style={windIcon}><i className="wi wi-strong-wind"></i></span>7 MPH</div>
                </div>
            </div>
        );
    }
});

module.exports = CurrentWeather;
