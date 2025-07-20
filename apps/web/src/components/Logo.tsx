import type React from 'react';
import { Image } from '@douyinfe/semi-ui';
import logo from '@/assets/img/logo.png';
import style from './Logo.module.scss';

export interface ILogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

/**
 * Logo组件
 * @param props Logo组件配置参数
 * @returns Logo组件
 */
export const Logo: React.FC<ILogoProps> = (props) => {
  const { className, size = 20, alt = 'logo加载失败' } = props;
  return (
    <Image
      className={`${className} ${style.logo}`}
      height={size}
      width={size}
      alt={alt}
      src={logo}
    />
  );
};
