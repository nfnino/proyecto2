import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Card, CardContent, Typography, Divider} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import Pie from "./graphs/pieusers";

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
      },
    control: {
      padding: theme.spacing(2),
    },
  });

class Super extends Component {
    constructor(){
        super();
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Card variant="elevation" >
                                <CardContent>
                                    <Typography variant="h4" gutterBottom color="primary" align="center"> Usuarios por rol:</Typography>
                                    <Divider></Divider>
                                    <div style={{height: '420px', width: '650px'}}>
                                        <Pie></Pie>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Super.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(Super));