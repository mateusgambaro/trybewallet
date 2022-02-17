import { REQUEST_API, REQUEST_API_SUCCESS,
  REQUEST_API_ERROR,
  REQUEST_API_EXPENSES, REQUEST_API_EXPENSES_SUCCESS, SAVE_EXPENSE, DELETE_EXPENSE,
EDIT_EXPENSE, SET_EDITED_EXPENSE, FINISH_EDIT } from '../actions';

const INNITIAL_STATE = {
  currencies: [],
  isFetching: false,
  expenses: [],
  total: '',
  editExpense: ''
};

function setEdited(state, action) {
  const newArr = state.expenses.map((expense2) => {
    if (expense2.id === action.expense.id) {
      return action.expense;
    }
    return expense2;
  });

  return {
    ...state,
    expenses: newArr,
    editing: false,
  };
}

function deleteExpense2(state, action) {
  const newArray = state.expenses.filter(
    (expense2) => expense2.id !== action.expense.id,
  );
  const newTotal = Number(
    Number(action.expense.value)
    * Number(action.expense.exchangeRates[action.expense.currency].ask),
  );

  return {
    ...state,
    expenses: newArray,
    total: Number(state.total - newTotal).toFixed(2),
  };
}

const wallet = (state = INNITIAL_STATE, action) => {
  const { expense, rates } = action;
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state, isFetching: true,
    };

  case REQUEST_API_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.payload),
    };

  case REQUEST_API_ERROR:
    return {
      ...state,
      isFetching: false,
      currencies: Error,
    };

  case REQUEST_API_EXPENSES:
    return {
      ...state,
      isFetching: false,
    };

  case REQUEST_API_EXPENSES_SUCCESS:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: action.id,
          ...action.expensesInfo,
          exchangeRates: action.dataAPI,
        },
      ],
    };

    case SAVE_EXPENSE: {
      expense.exchangeRates = rates;
      const valor = expense.value * rates[expense.currency].ask;
      const total = Number(state.total) + Number(valor);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        total: Number(total).toFixed(2),
      };
    }

    case EDIT_EXPENSE: {
      return {
        ...state,
        editExpense: action.expense,
        editing: true,
      };
    }
  
    case FINISH_EDIT: {
      return {
        ...state,
        editExpense: '',
      };
    }
  
    case SET_EDITED_EXPENSE: return setEdited(state, action);

    case DELETE_EXPENSE: return deleteExpense2(state, action);



  default:
    return state;
  }


};

export default wallet;
