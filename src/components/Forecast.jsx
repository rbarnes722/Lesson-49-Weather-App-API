var React = require('react');

var ForecastDay = require('./ForecastDay.jsx');

var Forecast = React.createClass({
    render: function() {
        return(
            <div>
                <div className="col-xs-12">
                      <table className="table table-striped">
                          <tbody>

                                  <ForecastDay day={this.props.day1} id={this.props.id1} temp={this.props.temp1}/>
                                  <ForecastDay day={this.props.day2} id={this.props.id2} temp={this.props.temp2}/>
                                  <ForecastDay day={this.props.day3} id={this.props.id3} temp={this.props.temp3}/>
                                  <ForecastDay day={this.props.day4} id={this.props.id4} temp={this.props.temp4}/>
                          </tbody>
                      </table>
                </div>

            </div>

        );
    }
});

module.exports = Forecast;
