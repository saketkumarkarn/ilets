'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(2000000); // ₹20 L default
  const [tenureYears, setTenureYears] = useState<number>(7);
  const [interestRate, setInterestRate] = useState<number>(10.5);

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = tenureYears * 12;
    if (P <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalPayable: 0, totalInterest: 0 };
    }
    const emiVal = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiVal * n;
    return {
      emi: Math.round(emiVal),
      totalPayable: Math.round(total),
      totalInterest: Math.round(total - P),
    };
  }, [loanAmount, tenureYears, interestRate]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-6 text-white flex items-center gap-3">
        <Calculator className="w-6 h-6" />
        <h3 className="text-xl font-bold">EMI Calculator</h3>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-7">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Loan Amount</label>
              <span className="text-sm font-bold text-blue-700">{formatINR(loanAmount)}</span>
            </div>
            <input
              type="range"
              min={100000}
              max={15000000}
              step={50000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-blue-700"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹1 L</span>
              <span>₹1.5 Cr</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Loan Tenure</label>
              <span className="text-sm font-bold text-blue-700">{tenureYears} years</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-blue-700"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 yr</span>
              <span>15 yrs</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Interest Rate (per annum)</label>
              <span className="text-sm font-bold text-blue-700">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={7}
              max={16}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-blue-700"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>7%</span>
              <span>16%</span>
            </div>
          </div>

          {/* Manual number input for loan amount */}
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-2">Enter Amount Manually (₹)</label>
            <input
              type="number"
              min={100000}
              max={15000000}
              value={loanAmount}
              onChange={(e) => {
                const val = Math.min(15000000, Math.max(100000, Number(e.target.value)));
                setLoanAmount(val);
              }}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center">
          {/* EMI highlight */}
          <div className="rounded-2xl bg-blue-700 text-white p-8 text-center mb-6">
            <p className="text-sm text-blue-200 mb-1">Monthly EMI</p>
            <p className="text-5xl font-extrabold tracking-tight">{formatINR(emi)}</p>
            <p className="text-blue-200 text-xs mt-2">per month for {tenureYears} years</p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-5 py-3.5">
              <p className="text-sm text-slate-600">Principal Amount</p>
              <p className="text-sm font-bold text-slate-900">{formatINR(loanAmount)}</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-5 py-3.5">
              <p className="text-sm text-slate-600">Total Interest Payable</p>
              <p className="text-sm font-bold text-orange-600">{formatINR(totalInterest)}</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-blue-50 px-5 py-3.5 border border-blue-100">
              <p className="text-sm font-semibold text-blue-800">Total Amount Payable</p>
              <p className="text-sm font-bold text-blue-900">{formatINR(totalPayable)}</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 text-center">
            * Indicative figures only. Actual EMI may vary based on bank terms and processing fees.
          </p>
        </div>
      </div>
    </div>
  );
}
