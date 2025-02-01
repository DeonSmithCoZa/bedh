import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { shuffle } from "lodash";
import Image from "next/image";

enum ColourIdentity {
  MonoWhite = "w",
  MonoBlue = "u",
  MonoBlack = "b",
  MonoRed = "r",
  MonoGreen = "g",
  Azorius = "wu",
  Orzhov = "wb",
  Boros = "wr",
  Selesnya = "wg",
  Dimir = "ub",
  Izzet = "ur",
  Simic = "ug",
  Rakdos = "br",
  Golgari = "bg",
  Gruul = "rg",
  Esper = "wub",
  Jeskai = "wur",
  Bant = "wug",
  Mardu = "wbr",
  Abzan = "wbg",
  Naya = "wrg",
  Grixis = "ubr",
  Sultai = "ubg",
  Temur = "urg",
  Jund = "brg",
}

interface SelectedColourIdentity {
  name: string;
  colourIdentities: ColourIdentity[];
}

const ColourIdentityToolStateRolled: React.FC<{ handleReset: () => void }> = ({
  handleReset,
}) => {
  const { getValues } = useFormContext();
  const [colourIdentities, setColourIdentities] = useState<
    SelectedColourIdentity[]
  >([]);

  const nameValues = getValues<string>("names");
  const seededValues = getValues("values");

  const names = useMemo<string[]>(
    () => nameValues.split("\n").map((name: string) => name.trim()),
    [nameValues]
  );

  const allowDuplicates: boolean =
    names.length > Math.floor(Object.values(ColourIdentity).length / 2)
      ? true
      : getValues("allowDuplicates");

  useEffect(() => {
    const shuffledColours = shuffle(Object.values(ColourIdentity));
    const selectedIdentities: ColourIdentity[] = [];

    if (seededValues) {
      const valuesToSet: SelectedColourIdentity[] = seededValues.map(
        (value: SelectedColourIdentity) => {
          const { name, colourIdentities } = value;
          const pool = allowDuplicates
            ? shuffle(Object.values(ColourIdentity))
            : shuffledColours.filter(
                (colour) => !selectedIdentities.includes(colour)
              );

          const identities = (colourIdentities ??
            pool.slice(0, 2)) as ColourIdentity[];
          selectedIdentities.push(...identities);

          return {
            name,
            colourIdentities: identities,
          };
        }
      );

      setColourIdentities(valuesToSet);
      return;
    }

    const identities: SelectedColourIdentity[] = [];
    for (const name of names) {
      const pool = allowDuplicates
        ? shuffle(Object.values(ColourIdentity))
        : shuffledColours.filter(
            (colour) => !selectedIdentities.includes(colour)
          );

      const identity: SelectedColourIdentity = {
        name,
        colourIdentities: pool.slice(0, 2),
      };

      selectedIdentities.push(...identity.colourIdentities);

      identities.push(identity);
    }

    setColourIdentities(identities);
  }, [allowDuplicates, names, seededValues]);

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-400 text-xl">
        <thead className="text-sm uppercase bg-gray-700 text-gray-400">
          <tr className="text-center">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3 w-40">Option 1</th>
            <th className="px-6 py-3 w-40">Option 2</th>
          </tr>
        </thead>
        <tbody>
          {colourIdentities?.map(({ name, colourIdentities: ids }, index) => (
            <tr
              key={`${name}-${index}`}
              className="text-center mt-4 odd:bg-gray-300 even:bg-gray-400 text-gray-900"
            >
              <td className="px-6 py-4">{name}</td>
              <td>
                <div className="flex justify-center items-center">
                  {ids[0].split("").map((symbol, i) => (
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
                <div className="flex justify-center items-center">
                  {ids[1].split("").map((symbol, i) => (
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
