import useContent from "../hooks/useContent";

function ContentComponent() {
  const { contents, refresh, loading } = useContent();

  return (
    <div>
      <button onClick={refresh} className="px-4 py-2 bg-blue-500 text-white rounded">
        Refresh
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {contents.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
