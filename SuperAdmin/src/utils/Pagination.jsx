const Pagination = () => (
  <div className="flex justify-end gap-2 mt-4">
        {[1,2,3,4].map(n => (
          <button
            key={n}
            className="w-8 h-8 border rounded text-sm hover:bg-purple-600 hover:text-white"
          >
            {n}
          </button>
        ))}
  </div>
);

export default Pagination;
