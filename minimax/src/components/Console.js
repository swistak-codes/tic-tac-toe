/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useRef } from "react";
import { useConsole } from "./TicTacToeContext";

/**
 * Komponent konsoli wyświetlanej pod planszą
 */
export const Console = () => {
  const container = useRef();
  const console = useConsole();

  useEffect(() => {
    if (!container.current) {
      return;
    }
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth"
    });
  }, [console, container]);

  return (
    <div
      css={css`
        margin-top: 16px;
        width: 100%;
        height: 150px;
        overflow-y: scroll;
        background: #eeeeee;
      `}
      ref={container}
    >
      <ul
        css={css`
          list-style: none;
          padding: 0 24px;
          text-align: left;
        `}
      >
        {console.map((item) => (
          <li
            css={css`
              border-bottom: 1px solid #999999;
            `}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
