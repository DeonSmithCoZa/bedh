import React from "react";
import ColourIdentity from "./components/colour-identity";
import DeckReview from "./components/deck-review";
import FAQ from "./components/faq";
import About from "./components/about";
import Rules from "./components/rules";

export default function Home() {
  return (
    <>
      <About />
      <Rules />
      <ColourIdentity />
      <DeckReview />
      <FAQ />
    </>
  );
}
