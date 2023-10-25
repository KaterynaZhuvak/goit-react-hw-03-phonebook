export const Filter = ({ handleFilterChangeState }) => {
  const handleFilterChange = event => {
    handleFilterChangeState(event.target.value);
  };

  return (
    <div>
      <input type="text" name="filter" onChange={handleFilterChange} />
    </div>
  );
};
