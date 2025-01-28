import TextArea from "./textarea";

const ColourIdentityToolStateDefault: React.FC = () => (
  <>
    <TextArea
      label={`Enter your pod members' names separated by lines`}
      source="names"
      id="names"
      placeholder={`e.g. John
Jessica
Drew`}
    />
    <div className="text-right mt-4">
      <button
        type="submit"
        className="text-gray-900 bg-gradient-to-r from-[#DFA] via-green-400 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 text-lg mr-0"
      >
        Roll Colour Identity
      </button>
    </div>
  </>
);

export default ColourIdentityToolStateDefault;
