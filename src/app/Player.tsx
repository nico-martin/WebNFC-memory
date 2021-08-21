import React from 'react';
import { Icon } from '@theme';
import cn from '@common/utils/classnames';
import styles from './Player.css';

const Player = ({
  className = '',
  number,
  pointCount,
  isActive,
}: {
  className: string;
  number: number;
  pointCount: number;
  isActive: boolean;
}) => (
  <div
    className={cn(className, styles.root, {
      [styles.isActive]: isActive,
    })}
  >
    <span className={styles.name}>Player {number}</span>
    <span className={styles.points}>
      {Array.from(Array(pointCount).keys()).map((i) => (
        <Icon icon="mdi/star" key={i} />
      ))}
    </span>
  </div>
);

export default Player;
