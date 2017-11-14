import React,{Component} from 'react';
import {Header, Segment} from 'semantic-ui-react';
import textAnalyzer from './textScanner';

class UI extends Component {
    constructor(props){
        super(props);

        this.state = {
            input: "",
            label: "",
			inputHasError: true,
            lexemes:[{id:0, lexeme: "qweqA", attribute:"Bqwe"},
            {id:1, lexeme: "123123123123B", attribute:"123123123123B"},
            {id:2, lexeme: "Bqwe", attribute:"Bqwe"},
            {id:3, lexeme: "qewB", attribute:"Bqwe"},
            {id:4, lexeme: "qweeB", attribute:"Bqwe"},
            {id:5, lexeme: "qewC", attribute:"Cqwe"}]
        }

        this.handleinputChange = this.handleinputChange.bind(this);
        this.handleRun = this.handleRun.bind(this);
    }

    handleinputChange(e){
		this.setState( {input: e.target.value} );
	}

    handleRun(e){  
        this.setState({lexemes: textAnalyzer(this.state.input)});
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <Header size='huge' textAlign='center'>LOLCode Interpreter</Header>
                <Segment.Group horizontal raised>        
                <Segment inverted color='blue'>
                <SourceInput
                    type="text"
                    placeholder="Source Code"
                    value={this.state.input}
                    changeHandler={this.handleinputChange}
                />
                <RunButton
                  changeHandler={this.handleRun}  
                />
                </Segment>
                <Segment inverted color='yellow'>
                    <SourceOutput 
                        list = {this.state.lexemes}
                        label = {this.state.label}
                    />
                </Segment>
                </Segment.Group>
            </div>
        );
    }
}

class SourceInput extends Component {
    render() {
        return(
            <div>
				<textarea 
                    rows={50} 
                    placeholder='Input Source Code' 
                    autoHeight='true'
					className = "input"
					type = {this.props.type}
					value = {this.props.value}
					onChange={this.props.changeHandler}
				/>
			</div>
        );
    }
}

class RunButton extends Component{
    render(){
		return(
			<div>
				<form onSubmit={this.props.changeHandler}>
					<input
						id="signup-button"
						type="submit"
						value="RUN"
					/>
				</form>
			</div>
		);
	}
}

class SourceOutput extends Component{
	render(){
		return(
			<div>
            <h3>LEXEMES</h3>
			{this.props.list.map((items) => {
				return(
                    <table className="table">
                            <tr>
                                <th>Lexeme</th>
                                <th>Attribute</th>
                            </tr>
                        <tr value={items.id}>
                            <td>{items.lexeme}</td>
                            <td>{items.attribute}</td>
                        </tr>
                    </table>
				);
			}
            )}
            {this.props.label}
            </div>
		);
	}
}



export default UI;


