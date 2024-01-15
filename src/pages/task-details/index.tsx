import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Layout, Result, Button} from 'antd'; // ~ "shared/ui/{...}"
import {reflect} from '@effector/reflect';

import {ToggleTask} from 'features/toggle-task';
import {TaskCard, taskModel} from 'entities/task';
import styles from './styles.module.scss';

const View = ({isLoading}: {isLoading: boolean}) => {
  const {taskId} = useParams<{taskId: string | undefined}>();

  const task = taskModel.selectors.useTask(Number(taskId));

  useEffect(() => {
    taskModel.effects.getTaskByIdFx({taskId: Number(taskId)});
  }, [taskId]);

  // Some logic can be moved to entity/task/card (as a container)
  if (!task && !isLoading) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Task was not found"
        extra={
          <Link to="/">
            <Button type="primary">Back to tasks list {taskId}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Layout className={styles.root}>
      <Layout.Content className={styles.content}>
        <TaskCard
          data={task}
          size="default"
          loading={isLoading}
          className={styles.card}
          bodyStyle={{height: 400}}
          extra={<Link to="/">Back to TasksList</Link>}
          actions={[<ToggleTask key="toggle" taskId={Number(taskId)} />]}
        />
      </Layout.Content>
    </Layout>
  );
};

// Using effector-reflect here is optional and not critical within the methodology
const TaskDetailsPage = reflect({
  view: View,
  bind: {
    isLoading: taskModel.$taskDetailsLoading,
  },
});

export default TaskDetailsPage;
