import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay, Button } from "reactstrap";
import {Link} from 'react-router-dom';
import CommentForm from "./CommentFormComponent";
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

function RenderDish({dish, favorite, postFavorite, deleteFavorite}) {   // making it functional component 
    
    return(
        <div className="col-12 col-md-5 m-1">
        <FadeTransform in 
                transformProps = {{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card > 
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.names}/>
                <CardImgOverlay>
                    <Button outline color="primary" onClick={()=> favorite ? deleteFavorite(dish._id) : postFavorite(dish._id)}>
                            { favorite ?
                                <span className="fa fa-heart"></span>
                                :
                                <span className="fa fa-heart-o"></span>
                            }
                    </Button>
                </CardImgOverlay>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
        </div>
    );
 }

function RenderComments({comments, postComment, dishId}) { // making it functional component
 
        const Comment = comments.map((comm)=>{   
            return( 
                    <Fade in key={comm._id}>
                        <li>
                            <p>{comm.comment}</p>
                            <p>{"-- "}{comm.author.firstname}{comm.author.lastname},{"  "} ,
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comm.updatedAt)))}</p>
                         </li> 
                    </Fade>
            );
            
        });
    
    return( 
            <div className="col-12 col-md-5 m-1">
                        <Card >
                            <CardBody>
                                <CardTitle>{"Comments"}</CardTitle>
                                    {
                                        <Stagger in>
                                            {Comment}
                                        </Stagger>
                                    } 
                                    <br />                                
                                    <CommentForm dishId={dishId} postComment={postComment} />
        
                            </CardBody>
                        </Card>
                    
            </div>               
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
            console.log(props.favorite);
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
                    <RenderDish dish={props.dish} 
                            favorite={props.favorite}
                            postFavorite={props.postFavorite}
                            deleteFavorite={props.deleteFavorite}/>
                    <RenderComments comments={props.comments} 
                        postComment= {props.postComment} 
                        dishId={props.dish._id} 
                        />
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