import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { shuffle } from "lodash";
import Image from "next/image";
import RefreshIcon from "@mui/icons-material/Refresh";

const POSSIBLE_COLOUR_IDENTITIES = [
  "w",
  "u",
  "b",
  "r",
  "g",
  "wu",
  "wb",
  "wr",
  "wg",
  "ub",
  "ur",
  "ug",
  "br",
  "bg",
  "rg",
  "wub",
  "wur",
  "wug",
  "wbr",
  "wbg",
  "wrg",
  "ubr",
  "ubg",
  "urg",
  "brg",
];

const MAX_REROLLS = 1;

const ColourIdentityToolStateRolled: React.FC<{ handleReset: () => void }> = ({
  handleReset,
}) => {
  const { getValues } = useFormContext();
  const [colourIdentities, setColourIdentities] = useState<string[]>([]);

  const nameValues = getValues<string>("names");
  const allowDuplicates: boolean = getValues("allowDuplicates");
  const identityValues: string[] = getValues("values");
  const rerollValues: number[] = getValues("rerolls");

  const names = useMemo<string[]>(
    () => shuffle(nameValues.split("\n").map((name: string) => name.trim())),
    [nameValues]
  );
  const unshuffledNames = useMemo(
    () => nameValues.split("\n").map((name: string) => name.trim()),
    [nameValues]
  );

  useEffect(() => {
    if (!names.length) return;

    if (identityValues) {
      const newColourIdentities: string[] = [];

      for (let i = 0; i < names.length; i++) {
        const indexInUnshuffled = unshuffledNames.indexOf(names[i]);
        newColourIdentities.push(identityValues[indexInUnshuffled]);
      }

      setColourIdentities(newColourIdentities);
      return;
    }

    const newColourIdentities: string[] = [];
    const shuffledIdentities = shuffle(POSSIBLE_COLOUR_IDENTITIES);
    for (let i = 0; i < names.length; i++) {
      newColourIdentities.push(
        (allowDuplicates
          ? shuffle(POSSIBLE_COLOUR_IDENTITIES)
          : shuffledIdentities
        )
          .filter((id) => !newColourIdentities.includes(id))
          .pop() as string
      );
    }
    setColourIdentities(newColourIdentities);
  }, [names, allowDuplicates, identityValues, nameValues, unshuffledNames]);

  const [rerollsRemaining, setRerollsRemaining] = useState<number[]>([]);

  useEffect(() => {
    const rerolls = names.map((name) => {
      if (rerollValues) {
        const indexInUnshuffled = unshuffledNames.indexOf(name);
        return rerollValues[indexInUnshuffled];
      }

      return MAX_REROLLS;
    });
    setRerollsRemaining(rerolls);
  }, [names, rerollValues, unshuffledNames]);

  const handleReroll = (index: number) => {
    const newRerollsRemaining = [...rerollsRemaining];
    newRerollsRemaining[index] -= 1;
    setRerollsRemaining(newRerollsRemaining);
    colourIdentities[index] = shuffle(
      POSSIBLE_COLOUR_IDENTITIES.filter(
        (id) => allowDuplicates || !colourIdentities.includes(id)
      )
    ).pop() as string;
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-400 text-xl">
        <thead className="text-sm uppercase bg-gray-700 text-gray-400">
          <tr className="text-center">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Colour Identity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {names?.map((name: string, index: number) => (
            <tr
              key={`${name}-${index}`}
              className="text-center mt-4 odd:bg-gray-300 even:bg-gray-400 text-gray-900"
            >
              <td className="px-6 py-4">{name}</td>
              <td>
                <div className="flex justify-center items-center">
                  {colourIdentities?.[index]
                    ?.split("")
                    ?.map((symbol: string, i: number) => (
                      <Image
                        className="mx-1"
                        alt={symbol}
                        width={24}
                        height={24}
                        key={i}
                        src={`./${symbol}.svg`}
                      />
                    ))}
                </div>
              </td>
              <td>
                {rerollsRemaining[index] > 0 && (
                  <button
                    onClick={() => handleReroll(index)}
                    title={`Re-roll colour identity: ${rerollsRemaining[index]} remaining`}
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center m-0"
                  >
                    <RefreshIcon />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button
          onClick={handleReset}
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-0"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default ColourIdentityToolStateRolled;
