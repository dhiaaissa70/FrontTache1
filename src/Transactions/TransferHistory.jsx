import React, { useState, useEffect } from 'react';
import TransferService from '../service/Transfer'; 
import { useAuth } from '../providers/AuthContext';

const TransferHistory = () => {
  const { user } = useAuth(); 
  const [selectedDate, setSelectedDate] = useState('today');
  const [chosenDate, setChosenDate] = useState('');
  const [transferOptions, setTransferOptions] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(''); 
  const [transfers, setTransfers] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(null);

  const transferServ = new TransferService();
  const today = new Date().toISOString().split('T')[0]; 

  const fetchUsers = async () => {
    try {
      const result = await transferServ.getUserInfo(user.username, localStorage.getItem('token'));
      if (result.success) {
        setTransferOptions(result.user); 
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("Failed to load user options.");
    }
  };

  const fetchTransferHistory = async () => {
    try {
      const dateOption = selectedDate === 'custom' ? chosenDate : selectedDate;
      const result = await transferServ.getTransferHistory(selectedUser || user.username, dateOption);
      if (result.success) {
        setTransfers(result.transferHistory);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error fetching transfer history:", error);
      setErrorMessage("An error occurred while fetching transfer history.");
    }
  };

  useEffect(() => {
    fetchUsers(); 
    fetchTransferHistory(); 
  }, [selectedDate, chosenDate]);

  const dateOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: '7days' },
    { label: 'This Month', value: 'month' },
    { label: 'Custom: Choose a date', value: 'custom' }
  ];

  return (
    <div className="flex justify-center items-center h-screen w-full p-6 sm:p-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Transfer History</h1>

        {/* Date Filter Section */}
        <div className="mb-8">
          <label className="block font-medium mb-4 text-gray-800 text-lg">Transaction Date</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dateOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                  selectedDate === option.value
                    ? 'bg-yellow-400 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="transactionDate"
                  value={option.value}
                  checked={selectedDate === option.value}
                  onChange={() => {
                    setSelectedDate(option.value);
                    if (option.value !== 'custom') {
                      setChosenDate('');
                    }
                  }}
                  className="form-radio h-5 w-5 text-yellow-500"
                />
                <span className="font-medium ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Date Picker Section */}
        {selectedDate === 'custom' && (
          <div className="mb-8">
            <label className="block font-medium mb-2 text-gray-800 text-lg">Select a Date</label>
            <input
              type="date"
              value={chosenDate}
              onChange={(e) => setChosenDate(e.target.value)}
              max={today}
              className="p-2 border border-gray-300 rounded bg-white w-full"
            />
          </div>
        )}

        {/* Transfer To / From Selection Section */}
        <div className="mb-8">
          <label className="block font-medium mb-2 text-gray-800 text-lg">Transfer To / From</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded bg-white text-lg"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select option</option>
            {transferOptions.map((userOption) => (
              <option key={userOption._id} value={userOption.username}>
                {userOption.username} ({userOption.role})
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
            type="button"
            onClick={fetchTransferHistory}
          >
            SEARCH
          </button>
          <button
            className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full"
            type="reset"
            onClick={() => {
              setSelectedDate('today');
              setChosenDate('');
              setTransfers([]);
              setErrorMessage(null);
            }}
          >
            RESET
          </button>
        </div>

        {/* Transfer History Display */}
        {errorMessage ? (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        ) : transfers.length > 0 ? (
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">From</th>
                  <th className="border px-4 py-2">To</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{transfer.type}</td>
                    <td className="border px-4 py-2 text-center">{transfer.amount}</td>
                    <td className="border px-4 py-2 text-center">{new Date(transfer.date).toLocaleString()}</td>
                    <td className="border px-4 py-2 text-center">
                      {transfer.senderId
                        ? `${transfer.senderId.username} (${transfer.senderId.role})`
                        : 'Unknown Sender'}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {transfer.receiverId
                        ? `${transfer.receiverId.username} (${transfer.receiverId.role})`
                        : 'Unknown Receiver'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500 text-center">No transfer history found for the selected filters.</div>
        )}
      </div>
    </div>
  );
};

export default TransferHistory;
