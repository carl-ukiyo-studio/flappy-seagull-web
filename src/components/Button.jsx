const Button = ({ children }) => (
  <div className="m-8">
    <button
      type="button"
      className="mr-2 mb-2 rounded-lg bg-blue-700 px-10 py-2 text-2xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {children}
    </button>
  </div>
);
export default Button;
