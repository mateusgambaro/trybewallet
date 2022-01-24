import React from 'react';
import Header from '../components/Header';
import WalletForms from '../components/WalletForms';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className='wallet-wrapper'>
        <div className='sidebar'>
        <Header />
        <WalletForms />
        </div>
      </div>
    );
  }
}

export default Wallet;
