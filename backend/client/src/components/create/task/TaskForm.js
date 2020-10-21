import React, { Component } from "react";
import { connect } from "react-redux";

import Data from "./Data";
import TaskDocument from "./TaskDocument";
import Success from "./Success";

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    maxWidth: 800,
    minWidth: 300,
  },
  pos: {
    left: "40%",
    marginBottom: 12,
    width: 150,
  },
});

class TaskForm extends Component {
  constructor() {
    super();
    this.state = {
      activo: "",
      tipo_mant: "",
      fecha_inicial_tent: new Date(),
      fecha_final_tent: new Date(),
      desc_falla: "",
      email_compras: "",
      desc_materiales_compras: "",
      ejecutor_interno: "",
      supervisor: "",
      nombre_empresa_externa: "",
      doc_orden_compra: "",
      valor_externo: "",
      estado: "Creada",
      responsable: "interno",
      errors: {},
      step: 1,
      file: '',
      filename: 'Cargar documento',
      uploadedFile: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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
    console.log("[IN] : ",input)
    console.log("[VAL] : ", e.target.value)
    this.setState({[input]: e.target.value});
  }

  handleSwitch = e => {
    this.setState({responsable: e.target.value})
  }

  listChange = input => (e, obj) => {
    if(obj !== null && obj.value !== ""){
      this.setState({[input]: obj.value});
    }
  }

  dateChange = input => e => {
    console.log("[IN] : ",input)
    console.log("[VAL] : ", e)
    this.setState({[input]: e});
  }

  fileChange = e => {
    console.log(e.target.files[0].name)
    this.setState({file: e.target.files[0]});
    this.setState({filename: e.target.files[0].name})
  }
  
render() {
    const { step } = this.state;
    const {activo, tipo_mant, fecha_inicial_tent, fecha_final_tent, desc_falla, email_compras, desc_materiales_compras, ejecutor_interno,
    supervisor, nombre_empresa_externa, valor_externo, responsable} = this.state;
    
    const values = {activo, tipo_mant, fecha_inicial_tent, fecha_final_tent, desc_falla, email_compras, desc_materiales_compras, ejecutor_interno,
      supervisor, nombre_empresa_externa, valor_externo, responsable}

    const {file, filename, uploadedFile} = this.state;
    const values2 = {file, filename, uploadedFile}; 
    
    switch(step) {
      case 1:
        return (
           <Data
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            listChange={this.listChange}
            dateChange={this.dateChange}
            handleSwitch={this.handleSwitch}
            values={values}
           />
        )
      case 2:
        return (
          <TaskDocument
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            history={this.props.history}
            fileChange={this.fileChange}
            data={values}
            values={values2}
          />
        )
      case 3:
        return (
          <Success 
            prevStep={this.prevStep}
            values={values}
          />
        )
    }
  }
}

TaskForm.propTypes = {
    /* addTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired */
};

const mapStateToProps = state => ({
    //errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(TaskForm));