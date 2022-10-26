import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from "./DishDetailComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Favorites from './FavoriteComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import {actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//thse elemeents now are availble as a props
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth
    }    
}
//thse addComent is available as a props
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  loginUser: (creds)=> dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Main extends Component {

  constructor(props){
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchFavorites();
    console.log("mounted")
  }
  componentDidUpdate(){
    console.log("updated");
  }

  render(){

    const HomePage = () => {
      return(<Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
                   dishesLoading = {this.props.dishes.isLoading}
                   dishesErrMess = {this.props.dishes.errMess}
                   promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                   promoLoading = {this.props.promotions.isLoading}
                   promoErrMess = {this.props.promotions.errMess}
                   leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                   leadersLoading = {this.props.leaders.isLoading}
                   leadersErrMess = {this.props.leaders.errMess}      
            />
        );
    }

    const DishWithId = ({match}) => {
        return(
          this.props.auth.isAuthenticated ?
              <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
              favorite={this.props.favorites.favorites ? this.props.favorites.favorites.dishes.some((dishs) => dishs.dish._id === match.params.dishId): false}
              postFavorite={this.props.postFavorite}
              deleteFavorite={this.props.deleteFavorite}              
            />
            :
              <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
                favorite={false}
                postFavorite={this.props.postFavorite}
                deleteFavorite={this.props.deleteFavorite}          
                />
        );
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

    return (
      <div>
        <Header auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes} /> } />
              <Route path='/menu/:dishId' component={DishWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
              <Route path='/aboutus' component={()=><About leaders={this.props.leaders.leaders}/> }/>
              <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} 
                                                                     postFeedback = {postFeedback}/>} />
              <Redirect to='/home' />
            </Switch>
            </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));



