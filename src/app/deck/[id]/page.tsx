import SectionBody from "@/app/components/section-body";
import axios from "axios";
import Head from "next/head";

interface Deck {
  id: string;
  reviewed: boolean;
}

export default async function StatusPage({
  params,
}: {
  params: Promise<Deck>;
}) {
  const { id, reviewed } = await params;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <SectionBody title="Deck Review">
        <div className="text-center">
          {id} {reviewed ? "reviewed" : "pending review"}
        </div>
      </SectionBody>
    </>
  );
}

export async function generateStaticParams() {
  const decks = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/decks`, {
    headers: {
      ["x-api-key"]: process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  return decks.data.map((deck: { _id: string; reviewed: boolean }) => ({
    id: deck._id,
    status: deck.reviewed,
  }));
}
