import PropTypes from 'prop-types';
import { LabelFilter, InputFilter } from './Filter.styled';

const Filter = ({ setFilter, filter }) => {
  function filteredContact(evt) {
    setFilter(evt.target.value);
  }
  return (
    <LabelFilter>
      <span>Find contacts by name</span>
      <InputFilter
        type="text"
        name="filter"
        value={filter}
        onChange={filteredContact}
      />
    </LabelFilter>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default Filter;
