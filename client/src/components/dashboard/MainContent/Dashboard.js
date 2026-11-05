import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./MainContent.scss";
import "./Dashboard.scss";


class Dashboard extends Component {
  render() {
    const name = this.props.auth.user.name;
    const shortcuts = [
      { title: "NOC Calendar", description: "Pianifica e consulta le attività operative.", icon: "calendar_today", to: "/calendar", tone: "blue" },
      { title: "My Tasks", description: "Tieni sotto controllo le attività assegnate.", icon: "check_circle", to: "/tasks", tone: "green" },
      { title: "Email Manager", description: "Gestisci le comunicazioni di manutenzione.", icon: "alternate_email", to: "/schedmail", tone: "violet" },
      { title: "Helpful Links", description: "Apri rapidamente gli strumenti del team.", icon: "link", to: "/links", tone: "amber" }
    ];

    return (
      <main className="main-content dashboard-home">
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">NETWORK OPERATIONS CENTER</p>
            <h1>{name ? `Bentornato, ${name.split(" ")[0]}` : "Benvenuto"}</h1>
            <p className="dashboard-intro">Tutto il tuo spazio operativo, raccolto in un unico posto.</p>
          </div>
          <div className="welcome-symbol" aria-hidden="true">
            <span className="pulse-dot" />
            <span>AREA DI LAVORO</span>
          </div>
        </section>

        <section className="dashboard-links" aria-labelledby="quick-access-title">
          <div className="dashboard-section-heading">
            <div>
              <h2 id="quick-access-title">Accesso rapido</h2>
              <p>Scegli una sezione per iniziare.</p>
            </div>
          </div>
          <div className="dashboard-shortcuts">
            {shortcuts.map(item => (
              <Link className="shortcut-card" to={item.to} key={item.to}>
                <span className={`shortcut-icon ${item.tone}`}>
                  <i className="material-icons">{item.icon}</i>
                </span>
                <span className="shortcut-copy">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </span>
                <i className="material-icons shortcut-arrow" aria-hidden="true">arrow_forward</i>
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Dashboard);
