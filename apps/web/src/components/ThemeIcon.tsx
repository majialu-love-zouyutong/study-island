import { switchTheme } from '@/utils';
import { IconMoon, IconSun } from '@douyinfe/semi-icons';
import React from 'react';
import style from './ThemeIcon.module.scss';
import { Tooltip } from '@douyinfe/semi-ui';
import { useAppSelector } from '@/hooks';

export interface IThemeIconProps {
  className?: string;
  size?: number;
}

/**
 * 主题图标，点击切换图标
 * @param themeIconProps 主题图标属性
 * @returns 主题图标
 */
export const ThemeIcon: React.FC<IThemeIconProps> = (props) => {
  const { className, size } = props;
  const isDark = useAppSelector((state) => state.theme.isDark);
  /**
   * 切换主题处理函数
   */
  const handleSwitchTheme = () => {
    switchTheme();
  };

  return (
    <div
      className={className}
      onClick={handleSwitchTheme}
      style={{
        fontSize: size || 20,
        cursor: 'pointer',
      }}
    >
      <Tooltip content={isDark ? '亮色模式' : '暗色模式'} position={'bottom'}>
        {isDark ? <IconSun className={style.icon} /> : <IconMoon className={style.icon} />}
      </Tooltip>
    </div>
  );
};
