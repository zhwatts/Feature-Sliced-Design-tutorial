import {createStore, combine, createEffect, createEvent} from 'effector';
import {useUnit} from 'effector-react';
import {normalize, schema} from 'normalizr';

import {typicodeApi} from 'shared/api';
import type {Task} from 'shared/api';

export type QueryConfig = {
  completed?: boolean;
  userId?: number;
};

const setQueryConfig = createEvent<QueryConfig>();

// Additional processing can also be done in each effect
const getTasksListFx = createEffect(
  (params?: typicodeApi.tasks.GetTasksListParams) => {
    return typicodeApi.tasks.getTasksList(params);
  }
);
const getTaskByIdFx = createEffect(
  (params: typicodeApi.tasks.GetTaskByIdParams) => {
    return typicodeApi.tasks.getTaskById(params);
  }
);

// Normalization can be moved to the API level
export const taskSchema = new schema.Entity('tasks');
export const normalizeTask = (data: Task) => normalize(data, taskSchema);
export const normalizeTasks = (data: Task[]) => normalize(data, [taskSchema]);

// In the context of the demo, it is not critical, but you can also store it as an array without normalization
export const tasksInitialState: Record<number, Task> = {};
export const $tasks = createStore(tasksInitialState)
  .on(
    getTasksListFx.doneData,
    (_, payload) => normalizeTasks(payload.data).entities.tasks
  )
  .on(getTaskByIdFx.doneData, (state, payload) => ({
    ...state,
    ...normalizeTask(payload.data).entities.tasks,
  }));

// It is possible to move it to a separate directory (for storing multiple models)
export const $queryConfig = createStore<QueryConfig>({}).on(
  setQueryConfig,
  (_, payload) => payload
);

// Potentially, debounce logic can be added
export const $tasksListLoading = getTasksListFx.pending;
export const $taskDetailsLoading = getTaskByIdFx.pending;

/**
 * "List" of tasks
 */
export const $tasksList = combine($tasks, tasks => Object.values(tasks));

/**
 * Filtered tasks
 * @remark It can be resolved at the level of effects - but then additional logic needs to be added to the store
 * > For example, hiding/showing a task on the `toggleTask` event
 */
export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasksList, config) => {
    return tasksList.filter(
      task =>
        config.completed === undefined || task.completed === config.completed
    );
  }
);

export const $tasksListEmpty = $tasksFiltered.map(list => list.length === 0);

// If desired, a separate selector can be introduced, not tied to React bindings
const useTask = (taskId: number): import('shared/api').Task | undefined => {
  return useUnit($tasks)[taskId];
};

export const events = {setQueryConfig};

export const effects = {
  getTaskByIdFx,
  getTasksListFx,
};

export const selectors = {
  useTask,
};
