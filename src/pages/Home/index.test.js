// imports the jest-dom library provided by Testing library, 
// which gives us additional Jest matchers we can use to test the DOM 
// (like toHaveTextContent(), toBeInTheDocument(), etc).
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // render function takes a React component as a parameter 
    // and it will render it so we can test it.
    render(<Home />);
    // screen is an object that comes with lots of queries we can use to test the UI directly, 
    // skipping implementation details and focusing on what the user will actually see.

    // findByText queries return a promise which resolves when a matching text is found. 
    // The promise is rejected if no text match or if more than one match is found 
    // after a default timeout of 1000 ms. 
    // findByText waits for the text to appear in the DOM due to its asynchronous nature.
    screen.findByText("Catégories");
  });

  it("a list a people is displayed", () => {
    render(<Home />);
      screen.findByText("Une équipe d’experts dédiés à l’organisation de vos événements")
  })

  it("a footer is displayed", () => {
    render(<Home />);
    screen.findByText("Contactez-nous");
  })

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    screen.findByText("Notre dernière prestation");
  })

});

// getting an element's text content:
// 1) findBy
// findBy queries return a promise which resolves when a matching element is found. 
// The promise is rejected if no elements match or if more than one match is found 
// after a default timeout of 1000 ms. 
// findByText waits for the element to appear in the DOM due to its asynchronous nature
// If you need to find more than one element, then use findAllBy.

// 2) getBy
// getBy queries return the first matching node for a query, 
// and throw an error if no elements match or if more than one match is found. 
// If you need to find more than one element, then use getAllBy.

// 3) queryBy
// queryBy queries return the first matching node for a query, 
// and return null if no elements match. 
// This is useful for asserting an element that is not present. 
// This throws if more than one match is found (use queryAllBy instead).