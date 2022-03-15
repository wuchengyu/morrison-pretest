import Recat, { useState, useMemo } from "react";
import "./App.css";

const EXAMPLE_OPTIONS = [
  { id: "checkbox-0", index: 0, text: "0-未派車", disabled: false },
  { id: "checkbox-1", index: 1, text: "1-未派車", disabled: true },
  { id: "checkbox-2", index: 2, text: "2-未派車", disabled: false },
  { id: "checkbox-3", index: 3, text: "3-未派車", disabled: false },
  { id: "checkbox-4", index: 4, text: "4-未派車", disabled: false },
  { id: "checkbox-5", index: 5, text: "5-未派車", disabled: false },
  { id: "checkbox-6", index: 6, text: "6-未派車", disabled: false },
  { id: "checkbox-7", index: 7, text: "7-未派車", disabled: false },
  { id: "checkbox-8", index: 8, text: "8-未派車", disabled: true },
  { id: "checkbox-9", index: 9, text: "9-未派車", disabled: false },
];

function useMultipleChecked(options = []) {
  const [isChecked, setIsChecked] = useState(
    new Array(options.length).fill(undefined)
  );

  const onCheckedChange = (index) => {
    setIsChecked((preIsChecked) => {
      const newIsChecked = [...preIsChecked]
      newIsChecked[index] = !newIsChecked[index];
      return newIsChecked;
    });
  };

  const onCheckedAll = () => {
    setIsChecked((preIsChecked) => {
      return preIsChecked.map((pre, index) => {
        // Skip disabled options
        if (options[index].disabled) return pre

        return !isChecked.includes(true)
      });
    });
  };
  

  const isCheckedAll = useMemo(() => {
    return isChecked.reduce((pre, cur) => {
      // Skip disabled options
      if (cur === undefined) return pre

      return pre && cur
    })
  }, [isChecked])

  return {
    isChecked,
    isCheckedAll,
    onCheckedChange,
    onCheckedAll
  };
}

function App() {
  const { isChecked, isCheckedAll, onCheckedAll, onCheckedChange } = useMultipleChecked(EXAMPLE_OPTIONS)
  return (
    <div>
      <table>
        <thead>
          <tr className='col-header'>
            <td>
              <input type='checkbox' id='check-all' checked={isCheckedAll} onChange={onCheckedAll} />
            </td>
            <td>狀態</td>
          </tr>
        </thead>
        <tbody>
          {EXAMPLE_OPTIONS.map((item, index) => (
            <tr key={item.id} className={`col-${index % 2}`}>
              <td>
                {!item.disabled && (
                  <input
                    type='checkbox'
                    id={item.id}
                    disabled={item.disabled}
                    checked={!!isChecked[index]}
                    onChange={() => onCheckedChange(index)}
                  />
                )}
              </td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
