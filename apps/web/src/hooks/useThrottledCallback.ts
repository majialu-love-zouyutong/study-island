import { useCallback, useEffect, useRef } from 'react';

/**
 * 自定义 Hook：返回一个节流后的函数，支持 leading 和 trailing 调用选项
 *
 * @param callback - 原始回调函数
 * @param delay - 节流间隔时间（毫秒）
 * @param options - 配置项：
 *   - leading：是否在开始时立即执行一次
 *   - trailing：是否在结束后再执行一次（节流期结束时）
 * @returns 节流处理后的函数
 */
export const useThrottledCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
) => {
  const { leading = true, trailing = true } = options;

  const lastCallTime = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedArgs = useRef<Parameters<T> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      savedArgs.current = args;

      // 首次调用，或距离上次调用时间大于等于 delay
      const shouldInvoke = lastCallTime.current === null || now - lastCallTime.current >= delay;

      if (shouldInvoke) {
        // 满足节流条件，可以执行
        if (leading) {
          callbackRef.current(...args);
        }
        lastCallTime.current = now;

        // 清除之前的 trailing 定时器（因为已经执行了）
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else {
        // 不满足节流条件，考虑 trailing
        if (trailing && !timerRef.current) {
          // 计算剩余时间
          const remaining = delay - (now - lastCallTime.current!);

          timerRef.current = setTimeout(() => {
            timerRef.current = null;
            lastCallTime.current = Date.now();

            if (savedArgs.current) {
              callbackRef.current(...savedArgs.current);
            }
          }, remaining);
        }
      }
    },
    [delay, leading, trailing],
  );

  // 提供取消方法
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    savedArgs.current = null;
  }, []);

  // 提供立即执行方法
  const flush = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;

      if (savedArgs.current) {
        callbackRef.current(...savedArgs.current);
        lastCallTime.current = Date.now();
        savedArgs.current = null;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return Object.assign(throttledFn, { cancel, flush });
};
