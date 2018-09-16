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
      showErrorMessage: ""
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
    console.log(choice);
  }

  convertCase() {
    if (this.isValid(this.state.variableName)) {
      this.setState({ showErrorMessage: "" });
    } else {
      this.setState({
        showErrorMessage: "Variable name must not be blank"
      });
    }
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
            <label>{this.state.showErrorMessage}</label>

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
            <Button onClick={() => this.convertCase()}>Convert</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default App;
