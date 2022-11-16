import { useRef, forwardRef, useCallback, type ReactElement } from 'react';
import composeRef from '@utils/composeRef';
import cx from 'clsx';
import './index.css';

const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!?.set!;

export type Props = OverWrite<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    error?: string;
    wrapperClassName?: string;
    outerPlaceholder?: ReactElement;
    prefixIcon?: string;
    size?: 'normal' | 'small' | 'medium';
  }
>;

const Input = forwardRef<HTMLInputElement, Props>(({ wrapperClassName, className, error, prefixIcon, id, size = 'normal', disabled, defaultValue, ...props }, ref) => {
  const domRef = useRef<HTMLInputElement>(null!);
  const handleClickClear = useCallback(() => {
    if (!domRef.current || disabled) return;
    setValue.call(domRef.current, String(''));
    domRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    domRef.current.focus();
  }, [disabled]);
  const preventBlur = useCallback<React.MouseEventHandler<HTMLInputElement>>((evt) => evt.preventDefault(), []);

  return (
    <div className={cx('input-wrapper', `input--${size}`, wrapperClassName)}>
      {prefixIcon && <span className={cx(prefixIcon, 'prefix-icon absolute left-0 top-[50%] -translate-y-[calc(50%+1px)] w-1.5em h-1.5em text-inner')} />}
      <input id={id} ref={composeRef(ref, domRef)} className={cx('input', className)} autoComplete="off" disabled={disabled} {...props} />
      {!!error && (
        <span id={id ? `${id}-error` : undefined} className="input-error">
          {error}
        </span>
      )}

      <span
        className={cx(
          'i-carbon:close-filled clear-icon display-none absolute right-.5em top-1/2 -translate-y-1/2 text-1em text-grey-normal-hover',
          disabled ? 'cursor-default' : 'cursor-pointer'
        )}
        onClick={handleClickClear}
        onMouseDown={preventBlur}
      />
    </div>
  );
});

export default Input;
