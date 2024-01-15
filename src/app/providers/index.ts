import compose from 'compose-function'; // Compose a new function from smaller functions `f(g(x))`
import {withRouter} from './with-router';

export const withProviders = compose(withRouter);
