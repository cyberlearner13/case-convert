import React, { Component } from 'react';
import { Form,Container } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

const { Field, Group, Radio, Button } = Form;

class App extends Component {
  constructor(){
    super();
    this.state = {
      variableName:'',
      showErrorMessage:''
    }
  }
  isValid(str){
    if(str.length > 0){
      return true;
    }
  }
  getVariableName(event){
    let { value } = event.target;

      this.setState({
        variableName: value,
        showErrorMessage: ''
      });
    

  }

  convertCase(){
      if(this.isValid(this.state.variableName)){
        this.setState({ showErrorMessage: '' });
      }
      else{
        this.setState({
          showErrorMessage:'Variable name must not be blank'
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
             <label>Enter variable name:</label>
                <div className="ui two column grid" >
                  <div className="column">

                    <input value={this.state.variableName} onChange={ event => this.getVariableName(event)}/>
                   </div>
                </div>
            </Field>
            <label>{this.state.showErrorMessage}</label>

           <Group inline>
             <label>Cases</label>
             <Radio label='Small' name="case" />
             <Radio label='Medium' name="case" />
             <Radio label='Large' name="case" />
           </Group>
           <Button onClick = { ()=> this.convertCase() }>Submit</Button>
         </Form>
        </Container>
      </div>
    );
  }
}

export default App;
