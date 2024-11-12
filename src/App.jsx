import { useState, useEffect, useRef } from "react";
import StockData from "./FetchExample";

function App() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        React Hooks Demo
      </h1>
      <div className="max-w-3xl mx-auto space-y-12">
        <UseStateExample />
        <UseEffectExample1 />
        <UseEffectExample2 />
        <UseRefExample />
        <StockData />
      </div>
    </div>
  );
}

// useState Example Component
function UseStateExample() {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount(count + 1);

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">useState Example</h2>
      <p className="mb-4 text-gray-700">
        Click the button to increase the count:
      </p>
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold">{count}</span>
        <button
          onClick={incrementCount}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Increment Count
        </button>
      </div>
    </section>
  );
}

// useEffect Example Component
function UseEffectExample1() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup function
    return () => clearInterval(timerId);
  }, []);

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">useEffect Example 1</h2>
      <p className="mb-4 text-gray-700">
        The current time updates every second:
      </p>
      <p className="text-xl font-bold">{time}</p>
    </section>
  );
}

function UseEffectExample2() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    // Cleanup the interval on component unmount or if stopwatch stops
    return () => clearInterval(timer);
  }, [isRunning]); // Only re-run the effect if `isRunning` changes

  const startStopHandler = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">useEffect Example 2</h2>
      <div className="text-center">
        <div className="mb-4 text-4xl font-semibold">
          {String(time).padStart(2, "0")}s
        </div>
        <div>
          <button
            onClick={startStopHandler}
            className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            onClick={resetHandler}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

// useRef Example Component
function UseRefExample() {
  const divRef = useRef(null);

  const focusInput = () => {
    if (divRef.current) {
      divRef.current.classList.toggle("bg-red-300");
      divRef.current.classList.toggle("bg-blue-300");
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">useRef Example</h2>
      <p className="mb-4 text-gray-700">
        Click the button to focus on the input field:
      </p>
      <div className="flex items-center space-x-4">
        <div ref={divRef} className="bg-red-300 w-fit">
          {"example div "}
        </div>
        <button
          onClick={focusInput}
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Focus Input
        </button>
      </div>
    </section>
  );
}

export default App;
