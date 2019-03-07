import React, { Component } from 'react';
import moment from 'moment';

import withAuth from '../../Services/withAuth';
import { endpoint } from '../../Constants';

import '../../Assets/Pages/landing.css';

class Landing extends Component {
    constructor() {
        super();

        this.state = {
            datas: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch(`${endpoint}/data`)
            .then(res => res.json())
            .then(datas => {
                this.setState({ datas, loading: false });
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>
                                Flex Work Project{' '}
                                <span className="sub-title">
                                    by Mehdi Soltana &amp; ---- &amp; ----
                                </span>
                            </h1>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <p>Chargement en cours ...</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>
                            Flex Work Project{' '}
                            <span className="sub-title">
                                by Mehdi Soltana &amp; ---- &amp; ----
                            </span>
                        </h1>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Température Celsius</th>
                                        <th>Température Fahrenheit</th>
                                        <th>Humidité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.datas.map(element => {
                                        return (
                                            <tr key={element._id}>
                                                <th scope="row">{moment(element.date).format('DD/MM/YYYY HH:mm')}</th>
                                                <td>{element.tempCelsius}</td>
                                                <td>
                                                    {element.tempFahrenheit}
                                                </td>
                                                <td>{element.humidity}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(Landing);
