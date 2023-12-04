import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  // The initiliazing variables Where the initial state is const is useState with the empty Array//
  const [bots, setBots] = useState([]);

  // THE USE OF THE useEffect Hokok in fetchin Data form a Public API AS a utility function to fetch data from the server//
  useEffect(() => {
    fetch('http://localhost:8002/bots')
      .then((response) => response.json())
      .then((data) => {
        setBots(data);
      });
  }, []); // The empty dependency array means this useEffect runs once after the initial render

  // add bot to army when the bot is clicked
  function enlistBot(bot) {
    setBots(bots.map((b) => (b.id === bot.id ? { ...b, army: true } : b)));
  }

  function removeBot(bot) {
    setBots(bots.map((b) => (b.id === bot.id ? { ...b, army: false } : b)));
  }

  function deleteBot(bot) {
    const deletedBot = bots.filter((b) => b.id !== bot.id);
    setBots(deletedBot);
  }

  return (
    <div>
      <YourBotArmy
        bots={bots.filter((b) => b.army)}
        removeBot={removeBot}
        deleteBot={deleteBot}
      />
      <BotCollection bots={bots} enlistBot={enlistBot} deleteBot={deleteBot} />
    </div>
  );
}

export default BotsPage;
