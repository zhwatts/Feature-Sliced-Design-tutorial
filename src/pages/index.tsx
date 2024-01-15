// Либо использовать @loadable/component, в рамках туториала - некритично
import {lazy} from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

const TasksListPage = lazy(() => import('./tasks-list'));
const TaskDetailsPage = lazy(() => import('./task-details'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TasksListPage />}>
      <Route path="/:taskId" element={<TaskDetailsPage />} />
    </Route>
  )
);

export const Routing = () => {
  return (
    <RouterProvider router={router} />

    // <Switch>
    //   <Route exact path="/" component={TasksListPage} />
    //   <Route exact path="/:taskId" component={TaskDetailsPage} />
    //   <Redirect to="/" />
    // </Switch>
  );
};
