import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions.';
import { Leaders } from './leaders';
import { Auth } from './auth';
import { Favorites } from './favorites'; 
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        //map reducers with each state
        //createforms will create a reduce that takes care of the forms.
        //we don't need to write our own action createrw and reducer for forms.
        combineReducers({     
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites: Favorites,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}