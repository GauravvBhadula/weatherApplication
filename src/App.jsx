import { useState } from "react";
import "./App.css";

function App() {
  let [city, setCity] = useState("");
  let [weathDetail, setWeathDetail] = useState();
  let [load, setLoad] = useState(false);

  let getData = (e) => {
    setLoad(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=501f561e75e3e1c3f63f3e6a729269a9&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setWeathDetail(undefined);
        } else {
          setWeathDetail(finalRes);
        }
        setLoad(false);
      });
    e.preventDefault();
    setCity("");
  };

  return (
    <div className="bg-[#4aacb1] w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <h1 className="text-3xl font-bold py-6 text-center">Weather App</h1>
        <form
          onSubmit={getData}
          className="flex flex-col sm:flex-row justify-center items-center"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="p-2 w-full sm:w-auto mb-4 sm:mb-0 sm:mr-2 border border-gray-300 rounded"
          />
          <button className="bg-blue-700 text-white py-2 px-4 rounded">
            Submit
          </button>
        </form>

        <div className="w-full bg-red-300 mx-auto mt-8 p-4 rounded-lg relative">
          <img
            className={`absolute left-1/2 transform -translate-x-1/2 w-24 ${
              load ? "" : "hidden"
            }`}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
            alt="Loading"
          />

          {weathDetail !== undefined ? (
            <>
              <h3 className="font-bold text-2xl text-center">
                {weathDetail.name}{" "}
                <span className="bg-yellow-100 p-1 rounded">
                  {weathDetail.sys.country}
                </span>
              </h3>
              <h2 className="font-bold text-4xl text-center">
                {weathDetail.main.temp}°C
              </h2>
              <div className="flex justify-center items-center mt-2">
                <img
                  src={`http://openweathermap.org/img/w/${weathDetail.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="inline"
                />
                <p className="text-xl ml-2">{weathDetail.weather[0].main}</p>
              </div>
            </>
          ) : (
            <p className="text-center">No data found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
