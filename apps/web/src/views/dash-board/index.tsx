// import { useAppSelector } from '@/hooks';
import { Card, Col, Row } from '@douyinfe/semi-ui';
import type React from 'react';
// import { useMemo } from 'react';
import styles from './index.module.scss';
import { IconArticle, IconCrown, IconUserAdd } from '@douyinfe/semi-icons';

// const getData = () =>
//   ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((time) => ({
//     time,
//     value: Math.random() * 10,
//   }));

const cardItems = [
  { id: 1, title: '预约数 / 人次', data: 129, yesterdayData: 80, icon: IconUserAdd },
  { id: 2, title: '订单数 / 个', data: 253, yesterdayData: 100, icon: IconArticle },
  { id: 3, title: '收入 / ¥', data: 2065, yesterdayData: 1500, icon: IconCrown },
];

export const DashBoard: React.FC = () => {
  // const isDark = useAppSelector((state) => state.theme.isDark);
  // const spec = useMemo(() => {
  //   return {
  //     type: 'line',
  //     theme: isDark ? 'dark' : 'light',
  //     data: {
  //       values: getData(),
  //     },
  //     xField: 'time',
  //     yField: 'value',
  //   };
  // }, [isDark]);
  return (
    <div className={styles.container}>
      <div className={styles['card-list']}>
        <Row gutter={[16, 16]}>
          {cardItems.map((item) => {
            return (
              <Col key={item.id} span={8}>
                <Card title={item.title} headerLine={false} shadows="hover">
                  <div className={styles.content}>
                    <div className={styles.data}>{item.data}</div>
                    <div className={styles.variation}>
                      相较昨天{(item.data - item.yesterdayData) / 100}%
                    </div>
                    <item.icon className={styles.icon} />
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
