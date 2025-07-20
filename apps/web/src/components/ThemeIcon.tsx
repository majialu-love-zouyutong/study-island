import { isDark, switchTheme } from '@/utils';
import { IconMoon, IconSun } from '@douyinfe/semi-icons';
import React, { useState } from 'react';
import style from './ThemeIcon.module.scss';
import { Tooltip } from '@douyinfe/semi-ui';

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
  const [dark, setDark] = useState(isDark());

  /**
   * 切换主题处理函数
   */
  const handleSwitchTheme = () => {
    setDark(!dark);
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
      <Tooltip content={dark ? '亮色模式' : '暗色模式'} position={'bottom'}>
        {dark ? <IconSun className={style.icon} /> : <IconMoon className={style.icon} />}
      </Tooltip>
    </div>
  );
};
