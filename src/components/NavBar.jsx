import React from 'react';

function HelpMeOutComponent() {
  return (
    <div>
      <div style={styles.logo}>
        <img src="/public/logo192.png" alt="Company Logo" />
        <span className='comp-name'>HelpMeOut</span>
      </div>
      <div className='ex-info'>
        This extension helps you record <br></br>and share help videos with ease.
      </div>
    </div>
  );
}

const styles = {
  container: {
    color: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '40%',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
};

export default HelpMeOutComponent;
