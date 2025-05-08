import React, { useCallback, useRef } from "react";

/**
 * Custom hook to debounce any callback.
 * 
 * @param callback - The function to debounce
 * @param delay - The debounce delay in ms
 */

export const useDebouncer  = (
    callBackFun: (event : KeyboardEvent)=>void,
    delay: number,
) => {
    const timer = useRef<number| null>(null);
    const debounceKeyBoardNavigation = useCallback((event : KeyboardEvent) => {
        if(timer.current !== null){
            window.clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(()=>{
            callBackFun(event);
        }, delay)
    }, [callBackFun, delay])
  return debounceKeyBoardNavigation;
};