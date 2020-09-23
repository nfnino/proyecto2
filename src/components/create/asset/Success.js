import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";

class Success extends Component {

    back = (e) => {
        this.props.prevStep();
    }

    render() {

        return (
            <Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Card variant="elevation">
                                <CardContent>
                                    <Grid container alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary" align="center"> Revise los datos </Typography>
                                            <br/>
                                        </Grid>
                                        <Grid item xs={4} alignContent="flex-end"></Grid>
                                        <Grid item xs={4} alignContent="flex-end">
                                            <Button variant="contained" onClick={this.back} color="secondary">Regresar</Button>
                                        </Grid>
                                        <Grid item xs={4} alignContent="flex-end"></Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

Success.propTypes = {
};

const mapStateToProps = (state) => {
    return{
    }
};

export default connect(
    mapStateToProps,
    {  }
)(Success);