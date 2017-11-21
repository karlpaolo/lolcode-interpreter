import React,{Component} from 'react';
import {Header, Segment, Button, Table} from 'semantic-ui-react';
import textAnalyzer from './textScanner';
import errorScanner from './errorScanner';

class UI extends Component {
    constructor(props){
        super(props);

        this.state = {
            input: "",
            label: "",
			inputHasError: true,
            lexemes:[],
            symbols:[]
        }

        this.handleinputChange = this.handleinputChange.bind(this);
        this.handleRun = this.handleRun.bind(this);
    }

    handleinputChange(e){
		this.setState( {input: e.target.value} );
	}

    handleRun(e){  
        this.setState({errors: errorScanner(this.state.input),lexemes: textAnalyzer(this.state.input)});
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <Header size='huge' textAlign='center'>LOLCode Interpreter</Header>
                
                <Segment.Group stacked raised>
                    <Segment>
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
                       
                        <Segment inverted color='teal'>
                            <SourceOutput 
                                list = {this.state.lexemes}
                                label = {this.state.label}
                            />
                        </Segment>

                        <Segment>
                            <SyntaxError
                                list = {this.state.symbols}
                            />
                        </Segment>

                        </Segment.Group>
                    </Segment>  

                    <Segment inverted color='red'>
                        HI
                    </Segment>
                  
                </Segment.Group>
                

            </div>
        );
    }
}

class SyntaxError extends Component {
    render() {
        return(
            <div>
                <Header>ERRORS</Header>
                <Table>
                    <Table.Header>
                        <Table.HeaderCell>Symbol</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                    {this.props.list.map((items) => {
                        return(
                            <Table.Row>
                                <Table.Cell>{items.errorcount}</Table.Cell>
                                <Table.Cell>{items.errorText}</Table.Cell>
                            </Table.Row>
                            );
                    })}
                </Table.Body>
                </Table>                
            </div>
        );
    }
}

class SourceInput extends Component {
    render() {
        return(
            <div>
				<textarea 
                    rows={25} 
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
				
                <Button onClick={this.props.changeHandler}>
                RUN</Button>
			</div>
		);
	}
}

class SourceOutput extends Component{
	render(){
		return(
			<div className='output'>
            <Header>LEXEMES</Header>
			
            <Table celled inverted selectable size='small'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Lexeme</Table.HeaderCell>
                        <Table.HeaderCell>Attribute</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.list.map((items) => {
                        return(
                            <Table.Row>
                                <Table.Cell><pre>{items.lexeme}</pre></Table.Cell>
                                <Table.Cell>{items.attribute}</Table.Cell>
                            </Table.Row>
                            );
                    })}
                </Table.Body>

            </Table>
            </div>
        );
    }
}



export default UI;


