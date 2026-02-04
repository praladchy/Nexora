const Filters = () => (
 <div className="bg-white p-4 rounded-lg shadow flex gap-4 mb-4">
        <input className="input w-48" placeholder="Search product" />
        <select className="input w-40"><option>Select Period</option></select>
        <select className="input w-40"><option>Variant Type</option></select>
        <select className="input w-40"><option>Stock Status</option></select>
        <button className="border px-4 py-2 rounded-lg text-sm">Refresh</button>
      </div>
);

export default Filters;
