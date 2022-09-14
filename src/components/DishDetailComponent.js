import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import {Link} from 'react-router-dom';
 
function RenderDish({dish}) {   // making it functional component 
    console.log("hi why?");
    return(
        <Card className="col-12 col-md-5 m-1"> 
            <CardImg width="100%" src={dish.image} alt={dish.names}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
 }

function RenderComments({comments}) { // making it functiona component

    const Comment = comments.map((comm)=>{
        return(
            <div key={comm.id}>
                <p>{comm.comment}</p> <br/>
                <p>{"-- "}{comm.author},{"  "} 
                {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'})
                .format(new Date(Date.parse(comm.date)))}</p>
            </div>
        );
    });

    return(
            <Card className="col-12 col-md-5 m-1">
                <CardBody>
                    <CardTitle>{"Comments"}</CardTitle>
                        {Comment}
                </CardBody>
            </Card>               
    );
        
    }
   
const DishDetail = (props) => {
        if(props.dish != null){
            return(
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>    
            );
            
        } else {
            return(
                <div></div>
            );
        }  
  }


export default DishDetail;