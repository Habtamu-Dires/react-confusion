import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import {Link} from 'react-router-dom';
import CommentForm from "./CommentFormComponent";
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

function RenderDish({dish}) {   // making it functional component 
    
    return(
        <Card className="col-12 col-md-5 m-1"> 
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.names}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
 }

function RenderComments({comments, postComment, dishId}) { // making it functional component

    const Comment = comments.map((comm)=>{
        return(
            <div key={comm.id}>
                <p>{comm.comment}</p>
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
                        {Comment} <br />
                        <CommentForm dishId={dishId} postComment={postComment}/>
                </CardBody>
            </Card>               
    );
        
    }
   
const DishDetail = (props) => {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        } else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
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
                    <RenderComments comments={props.comments} 
                        postComment= {props.postComment} 
                        dishId={props.dish.id} />
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