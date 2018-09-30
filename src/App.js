import React, { Component } from "react";
import { Form, Container } from "semantic-ui-react";
import { values, regex } from "./utils";
import logo from "./logo.svg";
import "./App.css";

const { Field, Group, Button } = Form;

class App extends Component {
  constructor() {
    super();
    this.state = {
      variableName: "",
      showErrorMessage: "",
      conversionChErrMsg: "",
      choice:"",
      validVariableName:""
    };
  }
  isValid(str) {
    if (str.length > 0) {
      return true;
    }
  }
  getCommaSeparatedList(str) {
    if (!str.match(regex)) {
      return;
    }
    this.setState({
      variableName: str,
      showErrorMessage: ""
    });
  }

  getConversionChoice(choice) {
    this.setState({
      conversionChErrMsg: "",
      choice
    });
  }

  validateInputs(){
    if (this.isValid(this.state.variableName)) {
      this.setState({
        showErrorMessage: ""
      });
    } else {
      this.setState({
        showErrorMessage: "Variable name must not be blank",
      });
    }

     if(this.state.choice){
       this.setState({
         conversionChErrMsg: ""
       });
     }
     else{
       this.setState({
         conversionChErrMsg: "Conversion choice must be made"
       })
     }
  }
  convertCase() {
    this.validateInputs();
    let words = this.state.variableName.trim().split(',');
    let converted = '';
    switch (this.state.choice.trim()) {
      case 's':
          words.forEach((val,ind)=>{
            if(ind !== words.length - 1){
              converted += val.trim()+'_'
            }
            else{
              converted+= val.trim();
            }
          })
        break;
        case 'd':
            words.forEach((val,ind)=>{
              if(ind !== words.length - 1){
                converted += val.trim()+'-'
              }
              else{
                converted+= val.trim();
              }
            })
          break;
          case 'c':
          words.forEach((val,ind)=>{
            if(ind !== 0){
              let value = val.trim().charAt(0).toUpperCase() + val.trim().substr(1)
              converted += value.trim();
            }
            else{
              converted+= val.trim();
            }
          })
            break;
            case 'p':
                words.forEach((val,ind)=>{
                     val = val.trim().replace(/^\w/, function (chr) {
                          return chr.toUpperCase();
                    });
                    converted += val.trim();
                })
              break;
      default: converted = "";

    }
    console.log(converted)
    this.setState({
      validVariableName: converted
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Case Conversions</h1>
        </header>
        <Container className="conversion">
          <Form>
            <Field>
              <label>Enter comma separated list of words:</label>
              <div className="ui two column grid">
                <div className="column">
                  <input
                    value={this.state.variableName}
                    onChange={event =>
                      this.getCommaSeparatedList(event.target.value)}
                  />
                </div>
              </div>
            </Field>
            <label className="error">{this.state.showErrorMessage}</label>

            <Group inline>
              <label>Cases</label>
              {values.map(({ label, value }) => {
                return (
                  <div className="field" key={value}>
                    <div className="ui radio checkbox">
                      <input
                        type="radio"
                        value={value}
                        name="cases"
                        onClick={event =>
                          this.getConversionChoice(event.target.value)}
                      />
                      <label>{label}</label>
                    </div>
                  </div>
                );
              })}
            </Group>
            <label className="error">{this.state.conversionChErrMsg}</label>
            <Button onClick={() => this.convertCase()}>Convert</Button>
            <label>{this.state.validVariableName}</label>
          </Form>
        </Container>
      </div>
    );
  }
}

export default App;
