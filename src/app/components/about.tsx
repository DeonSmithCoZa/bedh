import Link from "next/link";
import SectionBody from "./section-body";

const About: React.FC = () => (
  <SectionBody title="What is bEDH?">
    <p className="mb-2">
      Budget EDH is not a new concept by any means, but was given this name by
      the community at{" "}
      <Link href={"https://swordandboard.co.za/"} target="_blank">
        Sword & Board
      </Link>
      , a LGS in Milnerton, South Africa. It was formed by a small group of
      players who wanted to get out of their comfort zones, play EDH on a
      budget, but still have fun and be competitive.
    </p>
  </SectionBody>
);

export default About;
