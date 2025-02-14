import Head from "next/head";
import DeckReviewForm from "../components/deck-review-form";
import SectionBody from "../components/section-body";

export default function DeckPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <SectionBody title="Deck Review">
        <DeckReviewForm />
      </SectionBody>
    </>
  );
}
