import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // ** Error(s) solved : **
    // The realisations in the slider are not sorted by degressive order

    // ** Solution : **
    // Invert the sort order

    // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    new Date(evtB.date) > new Date(evtA.date) ? 1 : -1
  );
  const nextCard = () => {
    // ** Error(s) solved : **
    // Console Error: Cannot read properties of undefined (reading 'length')

    // ** Solution : **
    // add check on byDateDesc

    if (byDateDesc) {
      setTimeout(
        // ** Error(s) solved : **
        // Empty image is displayed in the slider

        // ** Solution : **
        // Substract 1 from the byDateDesc.length

        // () => setIndex(index < byDateDesc.length ? index + 1 : 0),
        () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ** Error(s) solved : **
        // Console error : Each child in a list should have a unique "key" prop
        //    Check the render method of `Slider`

        // ** Solution : **
        // remove "<>" and add a div

        // <>
        // <div
        // key={event.title}
          <div
            key={event.title}>
            <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // ** Error(s) solved : **
                  // Console error : Encountered two children with the same key, `undefined`.
                  
                  // ** Solution : **
                  // update key by "_.title"

                  // key={`${event.id}`}
                  key={`${_.title}`}
                  type="radio"
                  name="radio-button"
                  // ** Error(s) solved : **
                  // radio button in slider remains blocked on the 3rd button
                  
                  // ** Solution : **
                  // replace idx by index

                  // checked={idx === radioIdx}
                  checked={index === radioIdx}
                  // ** Error(s) solved : **
                  // Console error : You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

                  // ** Solution : **
                  // Add readOnly
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
        // </> remove "</>"
      ))}
    </div>
  );
};

export default Slider;
