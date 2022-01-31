import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/logo.jpg';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.totalExpensesCalculator = this.totalExpensesCalculator.bind(this);
  }

  totalExpensesCalculator() {
    const { expense } = this.props;

    if (expense.length !== 0) {
      const totalField = expense.reduce((total, expenses) => (
        total + expenses.value * expenses.exchangeRates[expenses.currency].ask), 0);
      return totalField.toFixed(2);
    }
    return 0;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <section className='header'>
        <img src={logo} alt="logo-img"></img>
        <h1>TrybeWallet</h1>
        <div>
          <p className='email-total' data-testid="email-field">
          Oi, {userEmail}
         </p>
         <div>
          <span className="total-value" data-testid="total-field">R${this.totalExpensesCalculator()}</span>
          <p data-testid="header-currency-field">BRL</p>
          <p className="total-expenses">Total de Despesas</p>
           <hr></hr>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expense: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expense: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};