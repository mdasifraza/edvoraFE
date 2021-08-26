import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

const PokemonList = () => {
  const [data, setData] = useState({});
  const [pokemon, setPokemon] = useState({})
  useEffect(() => {
    if (localStorage.getItem('Token') !== null)
      fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
        .then((d) => d.json())
        .then((d) => {
          setData(d);
        });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('Token') !== null)
      fetch('/getPokemon', {
        headers: {
          Token: localStorage.getItem('Token')
        }
      }).then(d => d.json()).then(d => {
        let pokemondata = {}
        for (let i = 0; i < d.Pokemon.length; i++) {
          pokemondata[d.Pokemon[i].name] = d.Pokemon[i].name
        }
        setPokemon(pokemondata)
      }).catch(err => console.error(err));
  }, [])


  const previous = () => {
    if (localStorage.getItem('Token') !== null)
      fetch(data.previous)
        .then((d) => d.json())
        .then((d) => {
          setData(d);
        });
  };
  const next = () => {
    if (localStorage.getItem('Token') !== null)
      fetch(data.next)
        .then((d) => d.json())
        .then((d) => {
          setData(() => d);
        });
  };
  const Favorite = (name) => {
    setPokemon((s) => ({ ...s, [name]: name }))
    fetch('/addPokemon', {
      method: 'post',
      body: JSON.stringify({ name }),
      headers: {
        Token: localStorage.getItem('Token'),
        'Content-Type': 'application/json'
      }
    }).then(d => d.json()).then(d => {

    })
  };
  return (
    <>{
      localStorage.getItem('Token') !== null ? <>
        <h1 style={{ textAlign: "center" }}>POKEMON LIST</h1>
        <div style={{ display: "flex", flexWrap: "wrap", padding: "2%" }}>
          {data?.results?.map((i, key) => {
            return (
              <div className="card w-50 " key={key}>
                <div className="card-body">
                  <div style={{ textAlign: "center" }}>
                    <p className="card-text">
                      Pokemon Name <b>{i.name}</b>
                    </p>
                    {i.name in pokemon ? <h1>DATA ADDED</h1> : <button
                      className="btn btn-outline-primary"
                      onClick={() => Favorite(i.name)}
                    >
                      Add to Favorite
                    </button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center" }}>
          {data.previous !== null && data.previous !== undefined ? (
            <button
              className="btn btn-danger"
              style={{ margin: "2%" }}
              onClick={previous}
            >
              PREVIOUS
            </button>
          ) : null}
          {data.next != null && data.next !== undefined ? (
            <button
              className="btn btn-success"
              style={{ margin: "2%" }}
              onClick={next}
            >
              NEXT
            </button>
          ) : null}
        </div></> : <Redirect to='/signup'></Redirect>}
    </>
  );
};

export default PokemonList;
