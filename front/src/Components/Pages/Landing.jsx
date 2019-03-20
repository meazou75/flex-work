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

        this.getData = this.getData.bind(this);
    }

    // Quand le composant est monté dans l'application 
    componentDidMount() {
        // On recupere la data à afficher
        this.getData();
        // On initialise un interval pour raffraichir la donnée
        this.interval = setInterval(() => this.getData(), 10000);
    }

    // Quand le ciomposant va etre detruit
    componentWillUnmount() {
        // On supprime l'interval
        clearInterval(this.interval);
    }

    // Fonction pour recuperer la donnée 
    getData() {
        // On fait une requete HTTP GET sur le serveur back end sur la route /data
        fetch(`${endpoint}/data`)
            .then(res => res.json()) // On transforme la reponse en JSON
            .then(datas => {
                this.setState({ datas, loading: false }); // on passe la reponse dans notre state
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
                                        // Pour chauque element dans notre tableau de données
                                        // On retourne un <tr> (balise ligne du tableau HTML)
                                        return (
                                            <tr key={element._id}>
                                                <th scope="row">
                                                    {moment(
                                                        element.date
                                                    ).format(
                                                        'DD/MM/YYYY HH:mm'
                                                    )}
                                                </th>
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
