import React, { Component } from "react";
import { Control, LocalForm,Errors } from "react-redux-form";
import { Button, Label, Modal, ModalBody, ModalHeader,Row,Col } from "reactstrap";

//validation functions
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length > len); 

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleFormModal = this.toggleFormModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleFormModal() { 
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });         
    }

    handleSubmit(values){
        this.toggleFormModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, 
            values.comment);
    }

    render(){ 
        return(
            <div>
                <Button onClick={this.toggleFormModal}>
                    <span className="fa fa-pencil"> Send Comment</span>
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleFormModal} >
                <ModalHeader toggle={this.toggleFormModal}>Submit Comment</ModalHeader>
                <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" 
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                      </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" name="name" id="name" 
                                      className="form-control" 
                                      placeholder="Your Name" 
                                      validators={{
                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                      }}                
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment" id="comment"
                                      className="form-control"
                                      rows="6"
                                     />
                                </Col>
                            </Row>
                            <Row className="from-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                </ModalBody>
                </Modal> 
            </div>
            
        );
   }
} 

export default CommentForm;