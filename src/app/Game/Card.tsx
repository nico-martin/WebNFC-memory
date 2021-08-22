import React from 'react';
import { Icon } from '@theme';
import cn from '@common/utils/classnames';
import styles from './Card.css';

const Card = ({
  state,
  icon = '',
  ...props
}: {
  state: 'idle' | 'pending' | 'complete';
  icon?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={cn(styles.root, {
        [styles.isPending]: state === 'pending',
        [styles.isComplete]: state === 'complete',
      })}
      {...props}
    >
      {icon !== '' && <Icon icon={icon} className={styles.icon} />}
    </div>
  );
};

export default Card;
