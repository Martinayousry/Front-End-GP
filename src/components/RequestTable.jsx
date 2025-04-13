// components/shared/RequestTable.jsx
import React from "react";

const RequestTable = ({
  title,
  data,
  fields,
  showActions = false,
  onAccept,
  onReject,
}) => {
  return (
    <div className="requests mt-10 w-full">
      <h2 className="p-6 text-gray-800 font-semibold text-xl">{title}</h2>
      <table className="text-center w-full border-collapse">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.key}>{field.label}</th>
            ))}
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {fields.map((field) => (
                <td key={field.key}>
                  {field.render ? field.render(item) : item[field.key]}
                </td>
              ))}
              {showActions && (
                <td>
                  <button
                    onClick={() => onAccept(index, item.id)}
                    className="text-green-600"
                  >
                    ✔
                  </button>
                  <button
                    onClick={() => onReject(index, item.id)}
                    className="ml-5 text-red-700"
                  >
                    ✘
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
