"use client";

import { FormProvider, useForm } from "react-hook-form";
import TextArea from "./textarea";
import Input from "./input";
import axios from "axios";
import { redirect } from "next/navigation";

const DeckReviewForm: React.FC = () => {
  const form = useForm();

  const onSubmit = form.handleSubmit(async (values: unknown) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/decks`,
      values,
      {
        headers: {
          ["x-api-key"]: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    if (response.status !== 201) {
      // TODO: Some error happened
      alert("An error occurred. This $#!% is still work in progress. Let me know if you see this message.");
    }

    const deckId = response.data._id;
    redirect(`/deck/${deckId}`);
  });

  return (
    <FormProvider {...form}>
      <form className="min-h-[280px]" onSubmit={onSubmit}>
        <Input
          label={"Your Name"}
          source="name"
          id="name"
          placeholder="Your name"
          options={{
            required: {
              value: true,
              message: "Please provide your name",
            },
          }}
        />
        <TextArea
          label={`Decklist`}
          source="decklist"
          id="decklist"
          placeholder={`e.g. 1 Krenko, Mob Boss (J22) 564
1 Abrade (BLC) 191
1 Ancient Tomb (LTC) 357 *F*
1 Arcane Signet (FDC) 1 *F*`}
          options={{
            required: {
              value: true,
              message: "Please provide a decklist",
            },
          }}
        />
        <div className="text-right mt-4">
          <button
            type="submit"
            className="text-gray-900 bg-gradient-to-r from-[#DFA] via-green-400 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 text-lg mr-0"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default DeckReviewForm;
