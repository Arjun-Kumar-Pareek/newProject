import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const Home = () => {
  const [playersData, setPlayersData] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/view-all-players",
        {
          method: "GET",
          headers: {},
        }
      );
      if (response.ok) {
        const completeRes = await response.json();
        const completeData = completeRes.data;
        setPlayersData(completeData);
      } else {
        const errorResponse = await response.json();
        console.log("Error on fetchPlayers function :", errorResponse.message);
      }
    } catch (error) {
      console.log("Error on fetchPlayers function :", error.message);
    }
  };
  useEffect(() => {
    fetchPlayers();
  }, []);

  const addPlayer = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/select-player?playerId=${id}`,
        {
          method: "GET",
          headers: {},
        }
      );
      if (response.ok) {
        const completeRes = await response.json();
      } else {
        const errorResponse = await response.json();
        console.log("Error on addPlayer function :", errorResponse.message);
      }
    } catch (error) {
      console.log("Error on addPlayer function :", error.message);
    }
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Players</h1>
        <div className="players">
          {playersData &&
            playersData.map((player, i) => (
              <div className="player" key={i}>
                <span
                  style={{
                    border: "1px solid black",
                    padding: "4px 10px",
                    borderRadius: "50%",
                  }}
                >
                  {i + 1}
                </span>
                <img
                  width="50"
                  height="50"
                  src={player.image}
                  alt="player-image"
                  style={{ borderRadius: "50px" }}
                />
                <span>{player.name}</span>
                <span>{player.price}</span>
                <IoIosAddCircleOutline
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() => addPlayer(player._id)}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
