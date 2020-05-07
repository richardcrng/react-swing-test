import React from "react";
import * as Swing from "swing";
import "./styles.css";

export default function App() {
  const [cards, setCards] = React.useState([
    { className: "clubs", text: "1♣" },
    { className: "diamonds", text: "2♦" },
    { className: "hearts", text: "3♥" },
    { className: "spades", text: "4♠" },
    { className: "clubs", text: "5♣" },
    { className: "diamonds", text: "6♦" },
    { className: "hearts", text: "7♥" },
    { className: "spades", text: "8♠" },
    { className: "clubs", text: "9♣" }
  ]);

  const [stack, setStack] = React.useState(Swing.Stack());

  // set listeners
  React.useEffect(() => {
    stack.on("throwout", function destroyCardAndUpdateState(e) {
      const thrownText = e.target.innerText;
      const thrownCard = stack.getCard(e.target);
      thrownCard.destroy();
      setCards(prevCards => prevCards.filter(card => card.text !== thrownText));
    });
  }, [stack]);

  // React.useEffect(() => {
  //   [].forEach.call(document.querySelectorAll(".stack li"), function(
  //     targetElement
  //   ) {
  //     console.log(cards);
  //     stack.createCard(targetElement);

  //     // targetElement.classList.add("in-deck");
  //   });
  // }, [stack, cards]);

  return (
    <>
      <div id="viewport">
        <ul className="stack">
          {cards.reduce(
            (acc, val, idx) =>
              idx <= 2
                ? [<Card key={val.text} {...val} stack={stack} />, acc]
                : acc,
            []
          )}
        </ul>
      </div>
      <div id="source">
        <p>
          Drag the playing cards out of the stack and let go. Dragging them
          beyond the desk will throw them out of the stack. If you drag too
          little and let go, the cards will spring back into place. You can
          throw cards back into the stack after you have thrown them out.
        </p>
        <p>
          Open the{" "}
          <a href="https://developer.chrome.com/devtools/docs/console">
            Console
          </a>{" "}
          to view the associated events.
        </p>
        <p>
          Demonstration of{" "}
          <a href="https://github.com/gajus/swing">
            https://github.com/gajus/swing
          </a>{" "}
          implementation.
        </p>
      </div>
    </>
  );
}

function Card({ className, text, stack }) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current && stack.createCard(ref.current);
  });

  return (
    <li ref={ref} className={className + " in-deck"}>
      {text}
    </li>
  );
}
