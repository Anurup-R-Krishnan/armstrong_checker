import React, { useState } from 'react';

function App() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [calculation, setCalculation] = useState(null);
  const [error, setError] = useState('');

  const isArmstrong = (num) => {
    const numStr = num.toString();
    const digits = numStr.split('').map(d => parseInt(d));
    const power = digits.length;
    
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    
    return {
      isArmstrong: sum === num,
      digits: digits,
      power: power,
      sum: sum,
      calculations: digits.map(d => `${d}^${power} = ${Math.pow(d, power)}`)
    };
  };

  const handleCheck = () => {
    setError('');
    setResult(null);
    setCalculation(null);
    
    const num = parseInt(number);
    
    if (isNaN(num) || number.trim() === '') {
      setError('Please enter a valid number');
      return;
    }
    
    if (num < 0) {
      setError('Please enter a non-negative number');
      return;
    }
    
    if (num > 9999999) {
      setError('Please enter a number less than 10,000,000');
      return;
    }
    
    const armstrongResult = isArmstrong(num);
    setResult(armstrongResult.isArmstrong);
    setCalculation(armstrongResult);
  };

  const getExamples = () => {
    return [
      { num: 153, desc: '1³ + 5³ + 3³ = 153' },
      { num: 370, desc: '3³ + 7³ + 0³ = 370' },
      { num: 371, desc: '3³ + 7³ + 1³ = 371' },
      { num: 407, desc: '4³ + 0³ + 7³ = 407' },
      { num: 9474, desc: '9⁴ + 4⁴ + 7⁴ + 4⁴ = 9474' },
      { num: 54748, desc: '5⁵ + 4⁵ + 7⁵ + 4⁵ + 8⁵ = 54748' }
    ];
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '700px',
        width: '100%'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#667eea',
          marginBottom: '10px',
          fontSize: '36px'
        }}>
          Armstrong Number Checker
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          Also known as Narcissistic Number or Pluperfect Number
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#333',
            fontWeight: 'bold'
          }}>
            Enter a number:
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Enter a non-negative integer"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleCheck}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Check Armstrong Number
        </button>

        {error && (
          <div style={{
            padding: '15px',
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {result !== null && calculation && (
          <>
            <div style={{
              padding: '25px',
              background: result 
                ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              borderRadius: '12px',
              textAlign: 'center',
              color: 'white',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
                {number}
              </div>
              <div style={{ fontSize: '22px' }}>
                {result ? '✓ IS AN ARMSTRONG NUMBER' : '✗ IS NOT AN ARMSTRONG NUMBER'}
              </div>
            </div>

            <div style={{
              padding: '25px',
              background: '#f8f9fa',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h3 style={{ marginTop: 0, color: '#333', marginBottom: '15px' }}>
                Calculation Breakdown:
              </h3>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ fontSize: '16px', color: '#555', marginBottom: '15px' }}>
                  <strong>Number of digits:</strong> {calculation.power}
                </div>
                <div style={{ fontSize: '16px', color: '#555', marginBottom: '15px' }}>
                  <strong>Digits:</strong> {calculation.digits.join(', ')}
                </div>
                
                <div style={{ 
                  fontSize: '16px', 
                  color: '#555', 
                  marginBottom: '10px',
                  fontWeight: 'bold' 
                }}>
                  Calculations:
                </div>
                {calculation.calculations.map((calc, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '10px',
                      background: '#f0f4ff',
                      borderRadius: '6px',
                      marginBottom: '8px',
                      fontSize: '16px',
                      color: '#667eea',
                      fontWeight: 'bold'
                    }}
                  >
                    {calc}
                  </div>
                ))}
                
                <div style={{
                  marginTop: '20px',
                  paddingTop: '15px',
                  borderTop: '2px solid #ddd',
                  fontSize: '18px',
                  color: '#333'
                }}>
                  <strong>Sum:</strong> {calculation.calculations.join(' + ').replace(/\s*=\s*\d+/g, '')} = <span style={{ color: '#667eea', fontSize: '20px' }}>{calculation.sum}</span>
                </div>
                
                <div style={{
                  marginTop: '15px',
                  fontSize: '16px',
                  color: result ? '#2f9e44' : '#c92a2a',
                  fontWeight: 'bold'
                }}>
                  {calculation.sum} {result ? '==' : '!='} {number} → {result ? 'Armstrong Number ✓' : 'Not Armstrong ✗'}
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{
          padding: '20px',
          background: '#fff3e0',
          borderRadius: '12px',
          marginBottom: '15px'
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What is an Armstrong Number?</h3>
          <p style={{ margin: '10px 0', color: '#555', lineHeight: '1.6' }}>
            An Armstrong number (also known as a narcissistic number) is a number that is equal to the sum of its own digits each raised to the power of the number of digits.
          </p>
          <p style={{ margin: '10px 0', color: '#555', lineHeight: '1.6' }}>
            <strong>Formula:</strong> If a number has n digits (d₁, d₂, ..., dₙ), then:
          </p>
          <p style={{ 
            margin: '10px 0', 
            color: '#667eea', 
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px',
            background: 'white',
            borderRadius: '6px'
          }}>
            d₁ⁿ + d₂ⁿ + ... + dₙⁿ = Original Number
          </p>
        </div>

        <div style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '12px'
        }}>
          <h3 style={{ marginTop: 0, color: '#333', marginBottom: '15px' }}>
            Examples of Armstrong Numbers:
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px'
          }}>
            {getExamples().map((example, index) => (
              <div
                key={index}
                onClick={() => setNumber(example.num.toString())}
                style={{
                  padding: '12px',
                  background: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#667eea',
                  marginBottom: '5px'
                }}>
                  {example.num}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {example.desc}
                </div>
              </div>
            ))}
          </div>
          <p style={{ 
            marginTop: '15px', 
            marginBottom: 0, 
            fontSize: '13px', 
            color: '#666',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Click any example to try it!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;