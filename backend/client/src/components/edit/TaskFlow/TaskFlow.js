import React, { Component } from "react";
import { connect } from "react-redux";

import TaskImageOne from "./TaskImage";
import TaskImageTwo from "./TaskImage2";
import TaskDescription from "./TaskDescription";
import Success from "./Success";

export class TaskFlow extends Component {

    constructor(ownProps){
        super(ownProps);
        console.log(ownProps)
        this.state = {
            id: this.props.match.params.id,
            inicio: new Date(),
            step: 1,
            file: '',
            file2:'',
            filename: 'Cargar imagen',
            filename2: 'Cargar otra imagen',
            uploadedFile: {},
            uploadedFile2: {}
        };
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    handleChange = input => e => {
        const filef = 'file' + input
        const filenamef = 'filename'+ input
        this.setState({[filef]: e.target.files[0]});
        this.setState({[filenamef]: e.target.files[0].name})
    }

    render() {
        const { step } = this.state;
        const { id, inicio, file, file2, filename, filename2, uploadedFile, uploadedFile2, } = this.state;
        const values = { id, inicio, file, file2, filename, filename2, uploadedFile, uploadedFile2, };

        switch(step) {
            case 1:
                return (
                   <TaskImageOne
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                   />
                )
            case 2:
                return (
                    <TaskDescription
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={id}
                    />
                )
            case 3:
                return (
                    <TaskImageTwo
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                   />
                )    
            case 4:
                return <Success />
        }
    }
}

TaskFlow.propTypes = {
};

const mapStateToProps = (state) => {
    return{
        id: state.id,
    }
};

export default connect(
    mapStateToProps,
    {  }
)(TaskFlow);