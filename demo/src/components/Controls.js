/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useFieldControls } from "./TicTacToeContext";

/**
 * Komponent kontrolek wyświetlanych pod planszą
 */
export const Controls = () => {
  const { reset } = useFieldControls();

  const buttonCss = css`
    cursor: pointer;
  `;

  return (
    <div
      css={css`
        margin-top: 1em;
      `}
    >
      <button css={buttonCss} type="button" onClick={reset}>
        Nowa gra
      </button>
    </div>
  );
};
