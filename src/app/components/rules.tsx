import SectionBody from "./section-body";

const Rules: React.FC = () => (
  <SectionBody title="Rules">
    <p className="mb-2">
      When building a bEDH deck, keep the following rules in mind:
    </p>
    <ul className="list-disc list-inside">
      <li>
        $50 budget (using TCG Player pricing) for the entire deck, excluding
        basic lands and your commander.
      </li>
      <li>
        Random commander colour identity assigned. Only 1, 2 and 3 colour.
      </li>
      <li>
        No commander from the top 100 on EDHRec. No restriction on the 99. If
        running partners, backgrounds, etc. both need to be outside of the top
        100.
      </li>
      <li>
        No individual card over $5 in value (looking at the cheapest printing)
        including the commander.
      </li>
      <li>All normal commander rules apply (including the banlist)</li>
      <li>
        Proxies are allowed as long as you own the cards. (Cards ordered but not
        yet delivered are considered owned)
      </li>
    </ul>
  </SectionBody>
);

export default Rules;
