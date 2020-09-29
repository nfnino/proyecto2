import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, MobileStepper, Button } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getAssetAudits } from "../../../actions/audits/assetAuditActions";
import { getTaskAudits } from "../../../actions/audits/taskAuditActions";
import { getUserAudits } from "../../../actions/audits/userAuditActions";

import Assets from "../../details/AssetAudit";
import Tasks from "../../details/TaskAudit";
import Users from "../../details/UserAudit";

const useStyles = theme => ({
  root: {
    minWidth: 200,
    maxwidth: 500
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

class DashAudits extends Component {

    constructor() {
        super();
        this.state={
          step:0
        }
    }

    componentDidMount() {
        this.props.getAssetAudits();
        this.props.getTaskAudits();
        this.props.getUserAudits();
    }

    handleNext = () => {
      const {step} = this.state;
      this.setState({
        step: step + 1
      })
    };
  
    handleBack = () => {
      const {step} = this.state;
      this.setState({
        step: step - 1
      })
    };

    render() {

      const { classes } = this.props;
        console.log(this.props)
        const { assetaudits, assetsLoading } = this.props.assetaudits;
        const { taskaudits, tasksLoading } = this.props.taskaudits;
        const { useraudits, usersLoading } = this.props.useraudits;

        let dashboardContent, dashboardContent1,dashboardContent2;

        let res = null, res1 = null, res2 = null;

        if (assetaudits.data != null) {
          res = assetaudits.data
        }
        if (taskaudits.data != null) {
          res1 = taskaudits.data
        }
        if (useraudits.data != null) {
          res2 = useraudits.data
        }

        console.log("res",res)
        console.log("res1",res1)
        console.log("res2",res2)

        if (res === null || assetsLoading) {
            dashboardContent = <p className="center-align">Cargando...</p>;
          } else if (res.length > 0) {
            dashboardContent = <Assets assets={res}/>;
          } else {
            dashboardContent = <p className="center-align"> Vacío </p>;
          }
        
          if (res1 === null ||tasksLoading) {
            dashboardContent1 = <p className="center-align">Cargando...</p>;
          } else if (res1.length > 0) {
            dashboardContent1 = <Tasks tasks={res1}/>;
          } else {
            dashboardContent1 = <p className="center-align"> Vacío </p>;
          }

          if (res2 === null || usersLoading) {
            dashboardContent2 = <p className="center-align">Cargando...</p>;
          } else if (res2.length > 0) {
            dashboardContent2 = <Users users={res2}/>;
          } else {
            dashboardContent2 = <p className="center-align"> Vacío </p>;
          }

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                  <Grid item xs={12}>
                    <Card variant="elevated" className={classes.root}>
                      <CardContent>
                        <br/>
                        {this.state.step === 0 
                          ? dashboardContent
                          : this.state.step === 1 
                          ? dashboardContent1
                          : dashboardContent2 }
                      </CardContent>
                    </Card> 
                  </Grid>
                  <Grid item xs={12}>
                    <Card variant="elevated" className={classes.root}>
                      <CardContent>
                        <MobileStepper
                          variant="dots"
                          steps={3}
                          position="static"
                          activeStep={this.state.step}
                          className={classes.root}
                          nextButton={
                            <Button size="medium" onClick={this.handleNext} disabled={this.state.step === 2}>
                              Siguiente
                              <KeyboardArrowRight />
                            </Button>
                          }
                          backButton={
                            <Button size="medium" onClick={this.handleBack} disabled={this.state.step === 0}>
                              <KeyboardArrowLeft />
                              Atrás
                            </Button>
                          }
                        />
                      </CardContent>
                    </Card>
                  </Grid>
              </Grid> 
            </Grid>
        </Grid>
        )
    }
}

DashAudits.propTypes = {
    getAssetAudits: PropTypes.func.isRequired,
    getTaskAudits: PropTypes.func.isRequired,
    getUserAudits: PropTypes.func.isRequired,
    assetaudits: PropTypes.object.isRequired,
    taskaudits: PropTypes.object.isRequired,
    useraudits: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    assetaudits: state.assetaudits,
    taskaudits: state.taskaudits,
    useraudits: state.useraudits,
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {getAssetAudits, getTaskAudits, getUserAudits}
) (DashAudits));