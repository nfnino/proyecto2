import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTasks } from "../../../actions/taskActions";

import { Card, CardContent, Typography, Button, Grid, Divider } from "@material-ui/core";

class TaskDescription extends Component {

    componentWillMount() {
        this.props.getTasks();
    }

    continue = (e) => {
        this.props.nextStep();
    }

    back = (e) => {
        this.props.prevStep();
    }

    render() {
        let content;
        const { values } = this.props;
        const {tasks, tasksLoading} = this.props.tasks;
        const res = tasks.data;
        const id = values;
        let t;
        console.log(tasks)

        if (res == null || tasksLoading) {
            content = <h1>Loading</h1>
        } else if (res.length>0) {
            for(let i=0; i<res.length; i++) {
                if(res[i]._id=== id) {
                    t=res[i];
                    break;
                }
            }
            content =   <Card variant="elevation">
                            <CardContent>
                                <Typography variant="h4" color="primary" align="center" gutterBottom>Desarrollo Tarea Mantenimiento </Typography>
                                <Typography variant="h5" color="primary">Paso 2: </Typography>
                                <Typography variant="h6" color="textPrimary" gutterBottom>Realice la actividad de mantenimiento</Typography>
                                <Typography gutterBottom> {t.desc_falla} </Typography>
                                <Divider></Divider>
                                <br/>
                                <Grid container align="center">
                                    <Grid item xs={2}>
                                        <Button variant="contained" color="secondary" onClick={this.back}> Atras </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="contained" color="primary" onClick={this.continue}> Siguiente </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
        }

        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }
}

TaskDescription.propTypes = {
    getTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return{
        tasks: state.tasks
    }
};

export default connect(
    mapStateToProps,
    { getTasks }
)(TaskDescription);