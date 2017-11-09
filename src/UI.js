import React,{Component} from 'react';
import {Button, TextArea, Form, Grid, Divider, Header, Segment} from 'semantic-ui-react';

class UI extends Component {
    render(){
        return(
            <div>
                <Header size='huge' textAlign='center'>LOLCode Interpreter</Header>
                <Segment.Group horizontal raised>        
                <Segment inverted color='blue'><SourceInput /></Segment>
                <Segment inverted color='yellow'>Lexemes</Segment>
                </Segment.Group>
            </div>
        );
    }
}

class SourceInput extends Component {
    render() {
        return(
            <Form>
                <TextArea rows={10} placeholder='Input Source Code' autoHeight='true'></TextArea>
                <Button margin-top={'10px'}>RUN</Button>
            </Form>
        );
    }
}




export default UI;


