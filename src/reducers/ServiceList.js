import { nanoid } from 'nanoid';
import {
  ADD_SERVICE,
  UPDATE_SERVICE,
  SELECT_UPDATE_SERVICE,
  UPDATE_FILTER,
  REMOVE_SERVICE,
  RESET_SERVICE_FORM,
} from '../actions/actionTypes';

/**
 * Checks item to match filter
 * Invalid item will not match any filter
 * Empty filter cause any valid item to match
 */
const isMatch = (item, filter) => {
  if (!item) {
    return false;
  }
  if (!filter) {
    return true;
  }

  return item.name.toLowerCase().includes(filter.toLowerCase());
};

const sortCompare = (a, b) => (a.id > b.id) ? -1 : 1;
const filteredSortCompare = (a, b) => (a.match === b.match) ? sortCompare(a, b) : !!b.match - !!a.match;
const compareItems = (filter) => (filter) ? filteredSortCompare : sortCompare;

const initialState = {
  items: [
    { id: nanoid(), name: 'Glass replace', price: 15000 },
    { id: nanoid(), name: 'Battery replace', price: 9000 },
    { id: nanoid(), name: 'Glass globe gLitch', price: 100000 },
    { id: nanoid(), name: 'Только оригинальные запчасти, честно!', price: 1000 },
  ].sort(sortCompare),
  editing: null,
  filter: '',
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE: {
      const newItem = { ...action.payload };
      newItem.id = nanoid();
      newItem.price = Number(newItem.price);
      newItem.match = isMatch(newItem, state.filter);

      return {
        ...state,
        items: [
          ...state.items,
          newItem,
        ].sort(compareItems(state.filter)),
      };
    }

    case UPDATE_SERVICE: {
      const updatedItem = { ...action.payload };
      updatedItem.price = Number(updatedItem.price);
      updatedItem.match = isMatch(updatedItem, state.filter);

      return {
        ...state,
        items: [
          ...state.items.map((item) => (item.id === updatedItem.id) ? updatedItem : item),
        ].sort(compareItems(state.filter)),
        editing: null,
      };
    }

    case UPDATE_FILTER: {
      const { filter } = action.payload;
      return {
        ...state,
        items: [
          ...state.items.map((item) => ({
            ...item,
            match: isMatch(item, filter),
          }))
        ].sort(compareItems(filter)),
        filter,
      };
    }

    case SELECT_UPDATE_SERVICE: {
      const { id } = action.payload;
      return { ...state, editing: id };
    }

    case REMOVE_SERVICE: {
      const { id } = action.payload;
      return {
        ...state,
        items: [...state.items.filter((item) => item.id !== id)],
      };
    }

    case RESET_SERVICE_FORM: {
      return { ...state, editing: null };
    }

    default:
      return state;
  }
}
