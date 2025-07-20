import { useCallback, useEffect, useRef } from 'react';

/**
 * 自定义 Hook：返回一个防抖后的函数，支持 leading 和 trailing 调用选项
 *
 * @param callback - 原始回调函数
 * @param delay - 防抖等待时间（毫秒）
 * @param options - 配置项：
 *   - leading：是否在开始时立即执行一次
 *   - trailing：是否在结束后再执行一次（延迟期结束时）
 * @returns 防抖处理后的函数
 */
export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
) => {
  const { leading = false, trailing = true } = options;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);
  const lastArgsRef = useRef<Parameters<T> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      lastArgsRef.current = args;

      const isFirstCall = timerRef.current === null;

      // 清除之前的定时器
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Leading 执行：只在第一次调用且开启 leading 时执行
      if (leading && isFirstCall) {
        callbackRef.current(...args);
      }

      // 设置 trailing 定时器
      timerRef.current = setTimeout(() => {
        timerRef.current = null;

        // Trailing 执行：在 trailing 开启时执行
        if (trailing && lastArgsRef.current) {
          callbackRef.current(...lastArgsRef.current);
        }

        lastArgsRef.current = null;
      }, delay);
    },
    [delay, leading, trailing],
  );

  // 提供取消方法
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    lastArgsRef.current = null;
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return cancel;
  }, [cancel]);

  return Object.assign(debouncedFn, { cancel });
};
