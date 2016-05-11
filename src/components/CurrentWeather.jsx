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
            marginLeft: 5,
        }

        var styleWind = {
            fontSize: 11
        }

        return(
            <div>
                <div className="row" style={mainIcon}>
                    <div className="col-xs-6"><i className={"wi wi-owm-" + (this.props.weatherID)}></i></div>
                    <div className="col-xs-6">{this.props.tempNow}</div>
                </div>
                <div className="row">
                    <div className="col-xs-6"><span style={windIcon}><i className={this.props.windCardinal}></i></span><span style={styleWind}>{this.props.windDirection}</span></div>
                    <div className="col-xs-6"><span style={windIcon}><i className="wi wi-strong-wind"></i></span><span></span><span style={styleWind}>{this.props.windSpeed}</span></div>
                </div>
            </div>
        );
    }
});

module.exports = CurrentWeather;
