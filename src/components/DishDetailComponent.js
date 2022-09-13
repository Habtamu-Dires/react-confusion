import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
   
    render(){
        if(this.props.dish != null){

            const Comment = this.props.dish.comments.map((comm)=>{
                return(
                <div className="container">
                    <div key={comm.id}>
                        <p>{comm.comment}</p>
                        <p>{"-- "}{comm.author},{"  "} 
                        {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'})
                        .format(new Date(Date.parse(comm.date)))} </p>
                    </div>
                </div>    
                
                );
            });

            return(
                <div className="row">
                    <Card className="col-12 col-md-5 m-1">
                        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.names}/>
                        <CardBody>
                            <CardTitle>{this.props.dish.names}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                    <Card className="col-12 col-md-5 m-1">
                        <CardBody>
                            <CardTitle>{"Comments"}</CardTitle>
                            <CardText>
                                {Comment}
                            </CardText>
                        </CardBody>
                    </Card>   
                </div>
                      
            );
        } else {
            return(
                <div></div>
            );
        }  
    }

}

export default DishDetail;