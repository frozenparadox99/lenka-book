# Welcome to Lenkabook

### This is an interactive coding environment. You can write Javascript, import any NPM modules and see it executed, and write comprehensive documentation using markdown.

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell#1, you can refer it to any following cells!
- You can show any React component, string, number or anything else by calling **_dikhao_** function. This is a function built into this environment. Call show multiple times to show multiple values.
- Add new cells by hovering on the divider between cells

### All of your changes get saved to the file you opened Jbook with. So if you run the following command, all changes are saved to test.js

`npx lenkabook serve test.js`

## Install

```
npm install [-g] lenkabook

```

## Usage

```
lenkabook serve [filename/path-to-file] [--port=<number>]

```

## Examples

- lenkabook serve test.js --port=3000
- lenkabook -p 3000 test.js
- Default filename is notebook.js, default port is 4050

## Samples

![s1](https://i.imgur.com/dE91GnS.png)
![s2](https://i.imgur.com/0MZ1eUQ.png)

## Sample Code Snippet to test

```
import React from 'react';
import ReactDOM from 'react-dom';
function CounterHook() {
  const initialState = 0;
  const [count, setCount] = React.useState(initialState);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialState);

  return (
    <div className="counter">
      <h1>Counter: {count}</h1>
      <button onClick={decrement}> - </button>
      <button onClick={reset}> Reset </button>
      <button onClick={increment}> + </button>
    </div>
  );
}

ReactDOM.render(<CounterHook />, document.getElementById('root'));

```
