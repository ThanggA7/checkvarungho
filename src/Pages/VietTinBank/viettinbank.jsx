import React, { useState } from "react";
import { icons } from "../../assets/icons";
import data from "../../data/data.json";

function VietTinBank() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      const filtered = data.filter(
        (item) =>
          item.ct_num.includes(searchTerm) ||
          item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.money.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = [...Array(totalPages).keys()].map((num) => num + 1);
    } else {
      const firstPage = 1;
      const lastPage = totalPages;
      const middlePages = [];

      if (currentPage > 3) {
        middlePages.push(firstPage);
        middlePages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        middlePages.push(i);
      }

      if (currentPage < totalPages - 2) {
        middlePages.push("...");
        middlePages.push(lastPage);
      } else if (currentPage === totalPages) {
        middlePages.push(lastPage);
      }

      pages = middlePages;
    }
    return pages;
  };

  return (
    <div className="container px-4 py-5">
      <div>
        <h1 className="text-white text-2xl font-bold font-Inter mb-2">
          CHECK VAR ỦNG HỘ MTTQ 🕵️‍♂️ (VIETINBANK 10/9/2024 - 12/9/2024)
        </h1>
        <p className="text-white font-Inter text-base mb-2">
          Dữ liệu được cung cấp bởi{" "}
          <a
            className="text-[#72B5F0]"
            href="https://www.facebook.com/t.rekttt"
          >
            Việt Thảo
          </a>
          ,{" "}
          <a
            className="text-[#72B5F0]"
            href="https://www.facebook.com/mttqvietnam"
          >
            Mặt Trận Tổ Quốc
          </a>{" "}
          và File PDF gốc sao kê của{" "}
          <a
            className="text-[#72B5F0]"
            href="https://www.facebook.com/thongtinchinhphu/posts/pfbid0MSnut9b7M4vZ8MqbZZj76Gg8V2YmnG7eh5R8JnGfaxLFUyWbFxzHq4J1dc8cWDv9l"
          >
            VietTinBank
          </a>
          ,{" "}
          <a
            className="text-[#72B5F0]"
            href="https://www.facebook.com/thongtinchinhphu/posts/pfbid027QC8dzUuNEPWSFYdMPfyLkmbDaMMYM5JbNmz3bSBzDoXdnmNnuYFtjruy6txSQcnl"
          >
            VietComBank
          </a>
        </p>
        <p className="text-white text-base">
          Lưu ý: Dữ liệu theo danh sách công bố từ MTTQVN đến ngày 10/09/2024
          (Cập nhật{" "}
          <a
            className="text-[#72B5F0]"
            href="https://www.facebook.com/thongtinchinhphu/posts/pfbid0MSnut9b7M4vZ8MqbZZj76Gg8V2YmnG7eh5R8JnGfaxLFUyWbFxzHq4J1dc8cWDv9l"
          >
            VietTinBank
          </a>{" "}
          (10/9/2024 - 12/9/2024) )
        </p>
      </div>

      <div className="mt-10">
        <div className="w-full border border-[#2A313F] rounded-lg flex items-center">
          <input
            placeholder="Tìm kiếm theo mã, nội dung giao dịch...."
            type="text"
            className="w-full outline-none bg-transparent text-white p-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2" aria-label="Tìm kiếm" onClick={handleSearch}>
            <img src={icons.search} alt="Tìm kiếm" />
          </button>
        </div>

        {filteredData.length > 0 && (
          <div className="mt-12">
            <p className="text-white text-xl font-Inter mb-4">
              Kết quả tìm kiếm:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                      Mã giao dịch
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                      Số tiền
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                      Chi tiết giao dịch
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {currentItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.ct_num}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.money} ₫
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center">
              <nav>
                <ul className="flex">
                  {getPageNumbers().map((pageNumber, index) => (
                    <li key={index} className="mx-1">
                      {pageNumber === "..." ? (
                        <span className="px-3 py-1 text-white">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-1 rounded ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                        >
                          {pageNumber}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VietTinBank;
