import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

    componentDidMount() {
        this.props.getAssetAudits();
        this.props.getTaskAudits();
        this.props.getUserAudits();
    }

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
              <Grid container justify="center" spacing={2}>
                  <Grid item xs={12}>
                    <Card variant="outlined" className={classes.root}>
                      <CardContent>
                        {dashboardContent}
                      </CardContent>
                    </Card> 
                  </Grid>
                  <Grid item xs={12}>
                    <Card variant="outlined" className={classes.root}>
                      <CardContent>
                        {dashboardContent1} 
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card variant="outlined" className={classes.root}>
                      <CardContent>
                        {dashboardContent2} 
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