import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

const Faviourate = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('Token') !== null)
      fetch("/getPokemon", {
        headers: {
          Token: localStorage.getItem('Token')
        }
      })
        .then((d) => d.json())
        .then((d) => {
          setData(d.Pokemon);
        });
  }, []);

  return (
    <>{
      localStorage.getItem('Token') !== null ? <>
        <h1 style={{ textAlign: "center" }}>POKEMON LIST</h1>
        <div style={{ display: "flex", flexWrap: "wrap", padding: "2%" }}>
          {data?.map((i, key) => {
            return (
              <div className="card w-50 " key={key}>
                <div className="card-body">
                  <div style={{ textAlign: "center" }}>
                    <p className="card-text">
                      Pokemon Name <b>{i.name}</b>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </> : <Redirect to='/signup'></Redirect>}
    </>
  );
}


export default Faviourate;
