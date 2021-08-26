/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

/**
 * Komponent reprezentujący pojedynczą komórkę planszy
 */
export const Cell = ({ onClick, content }) => {
  const isDisabled = content !== null;

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2em;
        height: 2em;
        border: solid 1px black;
        cursor: ${isDisabled ? "not-allowed" : "pointer"};
        background: ${isDisabled ? "lightgray" : "white"};
        color: ${content === "X" ? "blue" : "red"};
        font-weight: bold;

        &:hover {
          border: outset 1px black;
        }

        &:active {
          border: inset 1px black;
        }
      `}
      role="button"
      onClick={onClick}
    >
      {content}
    </div>
  );
};
