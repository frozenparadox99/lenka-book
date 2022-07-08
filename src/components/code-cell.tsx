import "./code-cell.css";
import { useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

import Resizable from "./resizable";
import CodeEditor from "./code-editor";
import Preview from "./preview";

import { Cell } from "../state";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cummulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;

    const orderedCells = order.map((id) => data[id]);

    const dikhaoFunc = `
        import _React from 'react'
        import _ReactDOM from 'react-dom'
        var dikhao = (value) => {
          const root = document.querySelector('#root');

          if (typeof value === 'object'){

            if(value.$$typeof && value.props){
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML=JSON.stringify(value);
            }
          } else {
            root.innerHTML=value;
          }
        }
    `;

    const dikhaoFuncNoop = `var dikhao = () => {}`;

    const cummulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cell.id) {
          cummulativeCode.push(dikhaoFunc);
        } else {
          cummulativeCode.push(dikhaoFuncNoop);
        }
        cummulativeCode.push(c.content);
      }

      if (c.id === cell.id) {
        break;
      }
    }

    return cummulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cummulativeCode.join("\n"));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cummulativeCode.join("\n"));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cummulativeCode.join("\n"), cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress max="100" className="progress is-small is-primary">
                Loading
              </progress>
            </div>
          ) : (
            <Preview err={bundle.err} code={bundle.code} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
