import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import modules from './modules';

export default function configureStore () {
  const store = createStore(
    modules,
    // (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    //   (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(ReduxThunk)
  );
  return store;
}
