var React = require('react');

var ForecastDay = require('./ForecastDay.jsx');

var Forecast = React.createClass({
    render: function() {
        return(
            <div>
                <div className="col-xs-12">
                      <table className="table table-striped">
                          <tbody>

                                  <ForecastDay />
                                  <ForecastDay />
                                  <ForecastDay />
                          </tbody>
                      </table>
                </div>

            </div>

        );
    }
});

module.exports = Forecast;
