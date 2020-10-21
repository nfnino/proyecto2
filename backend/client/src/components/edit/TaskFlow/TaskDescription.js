import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTasks } from "../../../actions/taskActions";

import { Card, CardContent, Typography, Button, Grid, Divider, TextField } from "@material-ui/core";

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

    onChange = (e) => {
        console.log("e.target.value: ",e.target.value)
        this.props.handleChange(e.target.value);
    }

    render() {
        let content;
        const { values, observacion } = this.props;
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
            content =   <Card variant="elevation" >
                            <CardContent>
                                <Grid container alignItems="center" justify="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="primary" align="center" gutterBottom>Desarrollo Tarea Mantenimiento </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" color="primary">Paso 2: </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" color="textPrimary" gutterBottom>Realice la actividad de mantenimiento</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom> {t.desc_falla} </Typography>
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <Grid container alignItems="center" justify="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="observacion"
                                            label="Sus observaciones de la tarea de mantenimiento"
                                            required="true"
                                            margin="normal"
                                            defaultValue={observacion}
                                            onChange={this.onChange}
                                            variant="outlined"
                                            multiline={true}
                                            style={{width: "400px"}}
                                        />
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <br/>
                                <Grid container alignItems="center" justify="center" spacing={2}>
                                    <Grid item xs={2}>
                                        <Button variant="contained" style={{width:"150px"}} color="secondary" onClick={this.back}> Atras </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="contained" style={{width:"150px"}} color="primary" onClick={this.continue}> Siguiente </Button>
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