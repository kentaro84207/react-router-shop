import {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import type { KeyboardEvent } from "react";
import FocusLock from "react-focus-lock";

interface PopoverProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  id: string;
}

// Popover コンポーネントが外部に公開するメソッド
export interface PopoverHandle {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
}

export const Popover = forwardRef<PopoverHandle, PopoverProps>(function Popover(
  { trigger, children, id },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // const focusableElementsSelector =
  //   'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // 外部に公開するメソッド
  useImperativeHandle(ref, () => ({
    showPopover: () => {
      popoverRef.current?.showPopover();
      setIsOpen(true);
    },
    hidePopover: () => {
      popoverRef.current?.hidePopover();
      setIsOpen(false);
    },
    togglePopover: () => {
      if (isOpen) {
        popoverRef.current?.hidePopover();
        setIsOpen(false);
      } else {
        popoverRef.current?.showPopover();
        setIsOpen(true);
      }
    },
  }));

  // Popover を開く・閉じる
  // const togglePopover = () => {
  //   if (isOpen) {
  //     popoverRef.current?.hidePopover();
  //     setIsOpen(false);
  //   } else {
  //     popoverRef.current?.showPopover();
  //     setIsOpen(true);
  //   }
  // };

  // ESC キーで Popover を閉じる
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      popoverRef.current?.hidePopover();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  // Popover 外部のクリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // フォーカストラップの実装
  // useEffect(() => {
  //   const popover = popoverRef.current;
  //   if (!popover || !isOpen) return;

  //   const focusableElements = Array.from(
  //     popover.querySelectorAll(focusableElementsSelector),
  //   ) as HTMLElement[];

  //   if (focusableElements.length === 0) return;

  //   // 初期フォーカスを設定
  //   focusableElements[0].focus();

  //   const handleTabKey = (e: KeyboardEvent) => {
  //     if (e.key !== "Tab") return;

  //     // 現在のフォーカス要素のインデックスを取得
  //     const currentFocusIndex = focusableElements.indexOf(
  //       document.activeElement as HTMLElement,
  //     );

  //     // Shift + Tab キーの場合
  //     if (e.shiftKey) {
  //       // 最初の要素の場合、最後の要素にフォーカスを移動
  //       if (currentFocusIndex === 0 || currentFocusIndex === -1) {
  //         e.preventDefault();
  //         focusableElements[focusableElements.length - 1].focus();
  //       }
  //     }
  //     // Tab キーの場合
  //     else {
  //       // 最後の要素の場合、最初の要素にフォーカスを移動
  //       if (currentFocusIndex === focusableElements.length - 1) {
  //         e.preventDefault();
  //         focusableElements[0].focus();
  //       }
  //     }
  //   };

  //   // イベントリスナーを設定
  //   popover.addEventListener("keydown", handleTabKey as any);

  //   return () => {
  //     popover.removeEventListener("keydown", handleTabKey as any);
  //   };
  // }, [isOpen]);

  return (
    <div className="popover-container">
      {/* <button
        ref={triggerRef}
        onClick={togglePopover}
        aria-expanded={isOpen}
        aria-controls={id}
        aria-haspopup="dialog"
        type="button"
      >
        {trigger}
      </button> */}

      <div
        ref={popoverRef}
        id={id}
        className={`popover ${isOpen ? "popover-open" : "popover-closed"}`}
        onKeyDown={handleKeyDown}
        popover={"auto"}
        aria-hidden={!isOpen}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="dialog"
      >
        {children}
      </div>
    </div>
  );
});
