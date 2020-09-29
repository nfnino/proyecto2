import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Card, CardContent, Typography, Grid } from "@material-ui/core";

class Success extends Component {

    render() {

        return (
            <Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Card variant="elevation">
                                <CardContent>
                                    <Typography variant="h3" color="primary" align="center"> Tarea Completa !</Typography>
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