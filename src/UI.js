import React,{Component} from 'react';
import {Header, Segment, Button, Table} from 'semantic-ui-react';
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
               
                <Segment inverted color='teal'>
                    <SourceOutput 
                        list = {this.state.lexemes}
                        label = {this.state.label}
                    />
                </Segment>

                <Segment inverted colo='blue'>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Identifier</Table.HeaderCell>
                                <Table.HeaderCell>Value</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    </Table>
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
                                <Table.Cell>{items.lexeme}</Table.Cell>
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


