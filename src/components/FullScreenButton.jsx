const FulLScreenButton = ({ onFullScreen }) => (
  <button
    onClick={onFullScreen}
    type="button"
    className="mr-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
  >
    Full Screen
  </button>
);
export default FulLScreenButton;
