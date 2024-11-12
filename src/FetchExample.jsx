import { useEffect, useState } from "react";

function StockData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("IBM"); // Default symbol is IBM
  const [inputSymbol, setInputSymbol] = useState(""); // State for input field

  // Replace with your actual API key
  const apiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
  const interval = "5min";

  // Fetch stock data whenever the symbol changes
  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${apiKey}`
        );
        const result = await response.json();

        // Check if the data is valid and exists
        const timeSeries = result[`Time Series (${interval})`];
        if (timeSeries) {
          const formattedData = Object.keys(timeSeries).map((key) => ({
            time: key,
            open: timeSeries[key]["1. open"],
            high: timeSeries[key]["2. high"],
            low: timeSeries[key]["3. low"],
            close: timeSeries[key]["4. close"],
            volume: timeSeries[key]["5. volume"],
          }));
          setData(formattedData);
        } else {
          setData([]);
          alert("No data available for the provided symbol.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol, apiKey, interval]);

  // Handle symbol input change
  const handleSymbolChange = (e) => {
    setInputSymbol(e.target.value);
  };

  // Handle button click to update stock symbol
  const handleFetchData = () => {
    if (inputSymbol.trim() !== "") {
      setSymbol(inputSymbol);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-4 m-4 mx-auto bg-gray-100">
      <h1 className="mb-4 text-3xl font-semibold text-center">
        Stock Data (5-Minute Intervals)
      </h1>

      {/* Input and Button for symbol selection */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g. IBM)"
          className="p-2 border border-gray-300 rounded-md"
          value={inputSymbol}
          onChange={handleSymbolChange}
        />
        <button
          onClick={handleFetchData}
          className="p-2 ml-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </div>

      {/* Table for displaying stock data */}
      {data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Open</th>
              <th className="px-4 py-2 border">High</th>
              <th className="px-4 py-2 border">Low</th>
              <th className="px-4 py-2 border">Close</th>
              <th className="px-4 py-2 border">Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((item, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{item.time}</td>
                <td className="px-4 py-2 border">{item.open}</td>
                <td className="px-4 py-2 border">{item.high}</td>
                <td className="px-4 py-2 border">{item.low}</td>
                <td className="px-4 py-2 border">{item.close}</td>
                <td className="px-4 py-2 border">{item.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default StockData;
